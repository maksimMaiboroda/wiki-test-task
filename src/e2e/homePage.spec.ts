import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('display heading and button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Wikipedia — On This Day' })).toBeVisible();
    await expect(page.getByRole('button', { name: /load events/i })).toBeVisible();
  });

  test('load articles after click on button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /load events/i }).click();

    const articles = page.getByRole('heading', { level: 6 });
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('show modal when it is error', async ({ page }) => {
    await page.route('**/api/rest_v1/feed/onthisday/events/**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    const button = page.getByRole('button', { name: /load events/i });
    await button.click();

    await await expect(page.getByTestId('error-modal-title')).toBeVisible();
  });
});
