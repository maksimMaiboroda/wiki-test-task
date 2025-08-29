import { wikiApi, transformOnThisDay } from '../wikiApi';
import { WIKI_REST_BASE_URL, WIKI_REST_ENDPOINTS } from '../../config/wikiApiConfig';

jest.mock('../../config/wikiApiConfig', () => ({
  WIKI_REST_BASE_URL: 'https://en.wikipedia.org/api/rest_v1',
  WIKI_REST_ENDPOINTS: {
    onThisDayEvents: (month: number, day: number) => `/feed/onthisday/events/${month}/${day}`,
  },
}));

describe('wikiApi', () => {
  it('should have the correct reducerPath', () => {
    expect(wikiApi.reducerPath).toBe('wikiApi');
  });

  it('should export the correct hook', () => {
    expect(wikiApi.useLazyGetOnThisDayEventsQuery).toBeDefined();
  });

  it('should transform response for getOnThisDayEvents correctly', () => {
    const mockResponse = {
      events: [
        {
          year: 2000,
          text: 'Event A happened.',
          pages: [
            {
              pageid: 123,
              titles: { normalized: 'Event A Page' },
              extract: 'Details about Event A.',
              content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Event_A' } },
              thumbnail: { source: 'thumb.jpg', width: 100, height: 100 },
            },
          ],
        },
        {
          year: 1900,
          text: 'Event B happened.',
          pages: [
            {
              pageid: 456,
              titles: { display: 'Event B Page' },
              extract: 'Details about Event B.',
            },
          ],
        },
      ],
    };

    const transformed = transformOnThisDay(mockResponse);

    // повинно бути відсортовано за роком
    expect(transformed).toEqual([
      {
        year: 1900,
        text: 'Event B happened.',
        title: 'Event B Page',
        extract: 'Details about Event B.',
        pageId: 456,
        contentUrl: undefined,
        thumbnail: undefined,
      },
      {
        year: 2000,
        text: 'Event A happened.',
        title: 'Event A Page',
        extract: 'Details about Event A.',
        pageId: 123,
        contentUrl: 'https://en.wikipedia.org/wiki/Event_A',
        thumbnail: { source: 'thumb.jpg', width: 100, height: 100 },
      },
    ]);
  });

  it('should generate correct endpoint URLs', () => {
    const url = WIKI_REST_ENDPOINTS.onThisDayEvents(12, 25);
    expect(url).toBe('/feed/onthisday/events/12/25');
  });

  it('should have correct base URL', () => {
    expect(WIKI_REST_BASE_URL).toBe('https://en.wikipedia.org/api/rest_v1');
  });
});
