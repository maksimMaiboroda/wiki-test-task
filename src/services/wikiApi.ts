import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WIKI_REST_BASE_URL, WIKI_REST_ENDPOINTS } from '@/config/wikiApiConfig';
import type { OnThisDayEvent } from '@services/types/wikiApi';

export const transformOnThisDay = (response: any): OnThisDayEvent[] => {
  const events: OnThisDayEvent[] = (response?.events ?? []).map((e: any) => {
    const page = e?.pages?.[0];
    return {
      year: e?.year,
      text: e?.text,
      title: page?.titles?.normalized ?? page?.titles?.display,
      extract: page?.extract,
      pageId: page?.pageid,
      contentUrl: page?.content_urls?.desktop?.page,
      thumbnail: page?.thumbnail
        ? {
            source: page.thumbnail.source,
            width: page.thumbnail.width,
            height: page.thumbnail.height,
          }
        : undefined,
    };
  });

  events.sort((a, b) => a.year - b.year);
  return events;
};

export const wikiApi = createApi({
  reducerPath: 'wikiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: WIKI_REST_BASE_URL,
    fetchFn: async (...args) => {
      const response = await fetch(...args);

      if (!response.ok && response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetch(...args);
      }

      return response;
    },
  }),
  endpoints: (build) => ({
    getOnThisDayEvents: build.query<OnThisDayEvent[], { month: number; day: number }>({
      query: (arg) => {
        const { month, day } = arg;

        return {
          url: WIKI_REST_ENDPOINTS.onThisDayEvents(month, day),
        };
      },
      transformResponse: transformOnThisDay,
      keepUnusedDataFor: 300,
      extraOptions: { maxRetries: 3 },
    }),
  }),
});

export const { useLazyGetOnThisDayEventsQuery } = wikiApi;
