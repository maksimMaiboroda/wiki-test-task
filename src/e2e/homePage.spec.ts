import { test, expect } from '@playwright/test';

test('homepage has title and links to articles', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Today's Wikipedia/);

  const heading = page.locator('h1');
  await expect(heading).toContainText('Recent Wikipedia Changes');
});
