import { test } from '@playwright/test';

// Seed test to load login page for other tests
test('Setup login page', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://testssr.jteam.dev/login');
  
  // Wait for login form to be loaded
  await page.waitForTimeout(2000);
});
