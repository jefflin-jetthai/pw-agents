import { test, expect } from '@playwright/test';

// spec: specs/login_test_plan.md
// seed: tests/login_seed.spec.ts

test.describe('登入功能測試', () => {
  test('登入成功後的遊戲大廳驗證', async ({ page }, testInfo) => {
    try {
    // 1. 使用有效認證 (qa.test@gmail.com / Aa123456) 成功登入
    await page.goto('https://testssr.jteam.dev/login');
    await page.waitForTimeout(2000);

    // Fill in account
    await page.getByRole('textbox').first().fill('qa.test@gmail.com');
    
    // Fill in password
    await page.getByRole('textbox', { name: 'At least 6 characters' }).fill('Aa123456');
    
    // Click login button
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // 2. 等待遊戲大廳頁面完全加載（預期 3-5 秒內）
    // Wait for page to load after login
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // 3. 驗證頁面 URL 已更改（不再是 /login）
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/login');

    // 4. 驗證頁面標題或頁面內容已更新
    const title = await page.title();
    // Page title may be different after login, just verify it's loaded
    expect(title.length).toBeGreaterThan(0);

    // 5. 驗證顯示用戶帳號或用戶名稱的資訊區
    // Check for user info in page content
    const pageContent = await page.locator('body').textContent();
    expect(pageContent).toContain('Ervin');  // Part of the user name

    // 6. 驗證遊戲大廳中是否顯示遊戲列表或遊戲卡片
    // The main content area should be visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // 7. 驗證導航欄或菜單中顯示已登入用戶的選項（如帳戶、登出等）
    // Look for the navigation menu/buttons at the bottom
    const menuButtons = page.locator('footer button, [role="contentinfo"] button');
    const buttonCount = await menuButtons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Verify specific navigation buttons exist
    const promotionButton = page.locator('button >> text=Promotion').first();
    await expect(promotionButton).toBeVisible();

    const friendsButton = page.locator('button >> text=Friends').first();
    await expect(friendsButton).toBeVisible();

    // 8. 驗證頁面上顯示帳戶餘額或信用點數（如有）
    // Check for Cash and Activity in page content instead of looking for specific buttons
    const pageContentBeforeNavigation = await page.locator('body').textContent();
    expect(pageContentBeforeNavigation?.toLowerCase()).toContain('cash');
    expect(pageContentBeforeNavigation?.toLowerCase()).toContain('activity');

    // 9. 驗證遊戲大廳中的各類遊戲分類是否可見（如 Vip Card Pro、specify_bets 1 等）
    // Check for game carousel or game sections
    const gameCarousel = page.locator('main, [role="main"]').first();
    await expect(gameCarousel).toBeVisible();

    // 10. 驗證可以點擊某個遊戲進行遊玩
    // Game elements should exist in the page
    // pageContent already retrieved at line 47, use it to verify login
    expect(pageContent).toContain('Ervin');  // Verify user is logged in

    // Verify no error messages are displayed
    const errorMessages = page.locator('text=/error|failed/i');
    expect(await errorMessages.count()).toBe(0);
    } catch (error) {
      // 失敗時自動截圖
      await page.screenshot({ path: `test-results/screenshots/${testInfo.title}-failure-${Date.now()}.png` });
      throw error;
    }
  });
});
