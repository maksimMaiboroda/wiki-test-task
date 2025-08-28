import { WIKI_API_BASE_URL, WIKI_API_PARAMS, WIKI_ENDPOINTS } from '../wikiApiConfig';

describe('WIKI_API_BASE_URL', () => {
  it('should be the correct base URL', () => {
    expect(WIKI_API_BASE_URL).toBe('https://en.wikipedia.org/w/api.php');
  });
});

describe('WIKI_API_PARAMS', () => {
  it('should have the correct format and origin', () => {
    expect(WIKI_API_PARAMS).toEqual({
      format: 'json',
      origin: '*',
    });
  });
});

describe('WIKI_ENDPOINTS', () => {
  describe('recentChanges', () => {
    it('should generate the correct endpoint string for a given limit', () => {
      const limit = 10;
      const expected =
        '?action=query&list=recentchanges&rcprop=title|ids|timestamp|user&rclimit=10';
      expect(WIKI_ENDPOINTS.recentChanges(limit)).toBe(expected);
    });

    it('should handle different limit values', () => {
      const limit = 50;
      const expected =
        '?action=query&list=recentchanges&rcprop=title|ids|timestamp|user&rclimit=50';
      expect(WIKI_ENDPOINTS.recentChanges(limit)).toBe(expected);
    });
  });

  describe('articleByTitle', () => {
    it('should generate the correct endpoint string for a simple title', () => {
      const title = 'Wikipedia';
      const expected = '?action=query&prop=extracts&exintro=true&explaintext=true&titles=Wikipedia';
      expect(WIKI_ENDPOINTS.articleByTitle(title)).toBe(expected);
    });

    it('should encode special characters in the title', () => {
      const title = 'C++ Programming';
      const expected =
        '?action=query&prop=extracts&exintro=true&explaintext=true&titles=C%2B%2B%20Programming';
      expect(WIKI_ENDPOINTS.articleByTitle(title)).toBe(expected);
    });
  });
});
