import { WIKI_REST_BASE_URL, WIKI_REST_ENDPOINTS } from '../wikiApiConfig';

describe('WIKI_REST_BASE_URL', () => {
  it('should be the correct REST base URL', () => {
    expect(WIKI_REST_BASE_URL).toBe('https://en.wikipedia.org/api/rest_v1');
  });
});

describe('WIKI_REST_ENDPOINTS', () => {
  describe('onThisDayEvents', () => {
    it('should generate the correct endpoint string for given month and day', () => {
      const month = 8;
      const day = 29;
      const expected = `/feed/onthisday/events/8/29`;
      expect(WIKI_REST_ENDPOINTS.onThisDayEvents(month, day)).toBe(expected);
    });

    it('should handle different values', () => {
      const month = 1;
      const day = 1;
      const expected = `/feed/onthisday/events/1/1`;
      expect(WIKI_REST_ENDPOINTS.onThisDayEvents(month, day)).toBe(expected);
    });
  });
});
