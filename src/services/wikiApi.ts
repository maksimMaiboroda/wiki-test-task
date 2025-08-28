import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WIKI_API_BASE_URL, WIKI_API_PARAMS, WIKI_ENDPOINTS } from '@/config/wikiApiConfig';
import type { WikiArticle } from '@services/types/wikiApi';

export const prepareWikiHeaders = (headers: Headers) => {
  headers.set('origin', '*');
  return headers;
};

export const transformRecentChanges = (response: any): WikiArticle[] =>
  response.query.recentchanges.map((r: any) => ({
    pageid: r.rcid,
    title: r.title,
  }));

export const transformArticleByTitle = (response: any): WikiArticle =>
  (() => {
    const pages = response.query.pages;
    const pageId = Object.keys(pages)[0];
    return {
      pageid: pages[pageId].pageid,
      title: pages[pageId].title,
      extract: pages[pageId].extract,
    };
  })();

export const wikiApi = createApi({
  reducerPath: 'wikiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: WIKI_API_BASE_URL,
    prepareHeaders: prepareWikiHeaders,
  }),
  endpoints: (build) => ({
    getRecentChanges: build.query<WikiArticle[], number | void>({
      query: (limit: number = 10) => ({
        url: WIKI_ENDPOINTS.recentChanges(limit),
        params: WIKI_API_PARAMS,
      }),
      transformResponse: transformRecentChanges,
    }),
    getArticleByTitle: build.query<WikiArticle, string>({
      query: (title) => ({
        url: WIKI_ENDPOINTS.articleByTitle(title),
        params: WIKI_API_PARAMS,
      }),
      transformResponse: transformArticleByTitle,
    }),
  }),
});

export const { useLazyGetRecentChangesQuery, useGetArticleByTitleQuery } = wikiApi;
