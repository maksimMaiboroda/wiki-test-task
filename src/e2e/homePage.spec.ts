import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('display heading and button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Wikipedia Changes' })).toBeVisible();
    await expect(page.getByRole('button', { name: /get articles/i })).toBeVisible();
  });

  test('load articles after click on button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /get articles/i }).click();

    const articles = page.getByRole('heading', { level: 6 });
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('show modal when it is error', async ({ page }) => {
    await page.route('**/w/api.php**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    const button = page.getByRole('button', { name: /get articles/i });
    await button.click();

    await expect(page.getByText(/failed to load articles/i)).toBeVisible();
  });
});
