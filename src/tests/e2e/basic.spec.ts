import { test, expect } from '@playwright/test';

test.describe('LineIt3 Basic Flow', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('LineIt3');
  });

  test('should show upload area', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Click to upload')).toBeVisible();
  });

  test('should show controls panel', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Algorithm')).toBeVisible();
  });
});
