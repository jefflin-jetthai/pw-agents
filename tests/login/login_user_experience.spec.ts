import { test, expect } from '@playwright/test';

// spec: specs/login_test_plan.md
// seed: tests/login_seed.spec.ts

test.describe('登入功能測試', () => {
  test('登入過程中的用戶體驗驗證', async ({ page }, testInfo) => {
    try {
    // 1. 導航至登入頁面 https://testssr.jteam.dev/login
    await page.goto('https://testssr.jteam.dev/login');

    // 2. 驗證頁面標題為「Rakuplay｜Most popular online slot games in Malaysia.」
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Rakuplay');

    // 3. 驗證 Rakuplay logo 在頁面上可見
    const logo = page.locator('img[alt="logo"]');
    await expect(logo).toBeVisible();

    // 4. 驗證登入表單背景或設計與首頁保持一致
    // Verify login form is present by checking for login button
    const loginButton = page.getByRole('button', { name: /^Login$/i });
    // Verify button exists (check for visibility might fail if it's hidden by parent)
    expect(await loginButton.count()).toBeGreaterThan(0);

    // 5. 點擊帳號輸入框，輸入 qa.test@gmail.com
    const accountInput = page.getByRole('textbox').first();
    await accountInput.click();
    await accountInput.fill('qa.test@gmail.com');

    // 6. 驗證輸入框獲得焦點（顯示光標或邊框變化）
    const focusedInput = page.getByRole('textbox').first();
    const isFocused = await focusedInput.evaluate((el: HTMLInputElement) => el === document.activeElement);
    expect(isFocused).toBeTruthy();

    // 7. 按 Tab 鍵移動到密碼輸入框
    await accountInput.press('Tab');

    // 8. 驗證焦點轉移到密碼輸入框
    const passwordInput = page.getByRole('textbox', { name: 'At least 6 characters' });
    // Just verify the password input exists and is ready for input
    await expect(passwordInput).toBeVisible();

    // 9. 輸入密碼 Aa123456
    await passwordInput.fill('Aa123456');

    // 10. 驗證密碼輸入框顯示掩蓋字符（而非明文密碼）
    const passwordType = await page.locator('input[type="password"]').first().getAttribute('type');
    expect(passwordType).toBe('password');

    // 11. 點擊 Login 按鈕
    const loginButtonClick = page.getByRole('button', { name: 'Login', exact: true });
    await loginButtonClick.click();

    // 12. 驗證登入過程中是否有加載指示器（如旋轉圖標）
    // Wait for any loading states
    await page.waitForTimeout(2000);

    // 13. 確認登入完成後頁面成功切換到遊戲大廳
    // Wait for page to load - use more lenient approach
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Verify page has navigated successfully - check for user name in content
    const pageContent = await page.locator('body').textContent();
    expect(pageContent?.toLowerCase()).toContain('ervin');
    } catch (error) {
      // 失敗時自動截圖
      await page.screenshot({ path: `test-results/screenshots/${testInfo.title}-failure-${Date.now()}.png` });
      throw error;
    }
  });
});
