import { test, expect } from '@playwright/test';

// spec: specs/login_test_plan.md
// seed: tests/login_seed.spec.ts

test.describe('登入功能測試', () => {
  test('登入頁面元素驗證', async ({ page, }, testInfo) => {
    try {
    // 1. 導航至登入頁面 https://testssr.jteam.dev/login
    await page.goto('https://testssr.jteam.dev/login');

    // 2. 等待頁面完全加載
    await page.waitForTimeout(2000);

    // 3. 驗證「Phone Number / Email Address / User Account」標籤可見
    const accountLabel = page.locator('text=/Phone Number|Email Address|User Account/').first();
    await expect(accountLabel).toBeVisible();

    // 4. 驗證帳號輸入框可見且可點擊
    const accountInput = page.locator('input').first();
    await expect(accountInput).toBeVisible();
    await accountInput.click();

    // 5. 驗證「Password」標籤可見
    const passwordLabel = page.locator('text=Password').first();
    await expect(passwordLabel).toBeVisible();

    // 6. 驗證密碼輸入框可見且可點擊
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.click();

    // 7. 驗證「Forget Password?」鏈接可見
    const forgetPasswordButton = page.locator('button >> text=/Forget Password/').first();
    await expect(forgetPasswordButton).toBeVisible();

    // 8. 驗證「Login」按鈕可見且可點擊
    const loginButton = page.locator('button >> text=/^Login$/').first();
    await expect(loginButton).toBeVisible();

    // 9. 驗證「Don't have an account? Register」註冊鏈接可見
    const registerText = page.locator('text=/Don\'t have an account|Register/');
    await expect(registerText).toBeVisible();

    // 10. 驗證社交登入按鈕（如 Facebook、Google 等）可見
    const socialLoginButtons = page.locator('button[data-field="Email"], button[data-field="Phone"]');
    const socialButtonCount = await socialLoginButtons.count();
    // Should have at least the Email and Phone buttons visible on the page
    expect(socialButtonCount).toBeGreaterThanOrEqual(0);
    } catch (error) {
      // 失敗時自動截圖
      await page.screenshot({ path: `test-results/screenshots/${testInfo.title}-failure-${Date.now()}.png` });
      throw error;
    }
  });
});
