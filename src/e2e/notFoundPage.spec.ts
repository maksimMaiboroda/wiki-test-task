import { test, expect } from '@playwright/test';

test.describe('Not Found Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/some-non-existent-route');
  });

  test('renders 404 Not Found content correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

    await expect(page.getByText('Oops! Page not found.')).toBeVisible();

    const homeLink = page.getByRole('link', { name: 'Go back to the home page' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/');
  });
});
