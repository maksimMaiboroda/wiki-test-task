import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  http.get('https://en.wikipedia.org/w/api.php', () => {
    return HttpResponse.json({
      query: {
        pages: {
          123: { pageid: 123, title: 'Test', extract: 'Mocked extract' },
        },
      },
    });
  })
);
