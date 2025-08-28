// src/services/__tests__/wikiApi.test.ts

import {
  wikiApi,
  transformRecentChanges,
  transformArticleByTitle,
  prepareWikiHeaders,
} from '../wikiApi';
import { WIKI_API_BASE_URL, WIKI_API_PARAMS, WIKI_ENDPOINTS } from '../../config/wikiApiConfig';

jest.mock('../../config/wikiApiConfig', () => ({
  WIKI_API_BASE_URL: 'https://en.wikipedia.org/w/api.php',
  WIKI_API_PARAMS: { format: 'json', origin: '*' },
  WIKI_ENDPOINTS: {
    recentChanges: (limit: number) =>
      `?action=query&list=recentchanges&rcprop=title|ids|timestamp|user&rclimit=${limit}`,
    articleByTitle: (title: string) =>
      `?action=query&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(title)}`,
  },
}));

describe('wikiApi', () => {
  it('should have the correct reducerPath', () => {
    expect(wikiApi.reducerPath).toBe('wikiApi');
  });

  it('should export the correct hooks', () => {
    expect(wikiApi.useLazyGetRecentChangesQuery).toBeDefined();
    expect(wikiApi.useGetArticleByTitleQuery).toBeDefined();
  });

  it('should transform response for getRecentChanges correctly', () => {
    const mockResponse = {
      query: {
        recentchanges: [
          {
            rcid: 123,
            title: 'Test Title 1',
            pageid: 1001,
            revid: 1002,
            timestamp: '2023-01-01T00:00:00Z',
            user: 'TestUser',
          },
          {
            rcid: 456,
            title: 'Test Title 2',
            pageid: 1003,
            revid: 1004,
            timestamp: '2023-01-02T00:00:00Z',
            user: 'TestUser2',
          },
        ],
      },
    };

    const transformed = transformRecentChanges(mockResponse);
    expect(transformed).toEqual([
      { pageid: 123, title: 'Test Title 1' },
      { pageid: 456, title: 'Test Title 2' },
    ]);
  });

  it('should transform response for getArticleByTitle correctly', () => {
    const mockResponse = {
      query: {
        pages: {
          '789': {
            pageid: 789,
            title: 'Test Title',
            extract: 'This is a test extract.',
          },
        },
      },
    };

    const transformed = transformArticleByTitle(mockResponse);
    expect(transformed).toEqual({
      pageid: 789,
      title: 'Test Title',
      extract: 'This is a test extract.',
    });
  });

  it('should set origin header in requests', () => {
    const headers = new Headers();
    const updatedHeaders = prepareWikiHeaders(headers);

    expect(updatedHeaders.get('origin')).toBe('*');
  });

  it('should generate correct query URLs', () => {
    const limit = 5;
    const title = 'Test Title';

    const recentChangesUrl = WIKI_ENDPOINTS.recentChanges(limit);
    expect(recentChangesUrl).toBe(
      '?action=query&list=recentchanges&rcprop=title|ids|timestamp|user&rclimit=5'
    );

    const articleUrl = WIKI_ENDPOINTS.articleByTitle(title);
    expect(articleUrl).toBe(
      '?action=query&prop=extracts&exintro=true&explaintext=true&titles=Test%20Title'
    );
  });

  it('should use correct default params', () => {
    expect(WIKI_API_PARAMS).toEqual({ format: 'json', origin: '*' });
  });

  it('should have correct base URL', () => {
    expect(WIKI_API_BASE_URL).toBe('https://en.wikipedia.org/w/api.php');
  });
});
