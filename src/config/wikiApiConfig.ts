export const WIKI_API_BASE_URL = 'https://en.wikipedia.org/w/api.php';

export const WIKI_API_PARAMS = {
  format: 'json',
  origin: '*',
};

export const WIKI_ENDPOINTS = {
  recentChanges: (limit: number) =>
    `?action=query&list=recentchanges&rcprop=title|ids|timestamp|user&rclimit=${limit}`,
  articleByTitle: (title: string) =>
    `?action=query&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(title)}`,
};
