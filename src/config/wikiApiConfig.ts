export const WIKI_REST_BASE_URL = 'https://en.wikipedia.org/api/rest_v1';

export const WIKI_REST_ENDPOINTS = {
  onThisDayEvents: (month: number, day: number) => `/feed/onthisday/events/${month}/${day}`,
};
