import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('renders the About page with correct title and content', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

    await expect(
      page.getByText(
        'This application was developed as a test assignment for a Front-End Developer position.'
      )
    ).toBeVisible();

    await expect(page.getByText('Created by: Maksym Maiboroda')).toBeVisible();

    const emailLink = page.getByRole('link', { name: 'maksym.majboroda@gmail.com' });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:maksym.majboroda@gmail.com');
  });
});
