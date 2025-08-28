import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  rest.get('https://en.wikipedia.org/w/api.php', (req, res, ctx) => {
    return res(
      ctx.json({
        query: {
          pages: {
            123: { pageid: 123, title: 'Test', extract: 'Mocked extract' },
          },
        },
      })
    );
  })
);
