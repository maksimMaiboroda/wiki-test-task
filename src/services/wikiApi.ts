import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WIKI_REST_BASE_URL, WIKI_REST_ENDPOINTS } from '@/config/wikiApiConfig';
import type { OnThisDayEvent } from '@services/types/wikiApi';

const getTodayMD = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return { month, day };
};

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
  }),
  endpoints: (build) => ({
    getOnThisDayEvents: build.query<OnThisDayEvent[], { month: number; day: number } | void>({
      query: (arg) => {
        const { month, day } = arg ?? getTodayMD();
        return {
          url: WIKI_REST_ENDPOINTS.onThisDayEvents(month, day),
        };
      },
      transformResponse: transformOnThisDay,
    }),
  }),
});

export const { useLazyGetOnThisDayEventsQuery } = wikiApi;
