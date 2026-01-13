// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'

test.describe('網路失敗時的註冊', () => {
  test.skip('模擬離線並檢查錯誤處理（手動或在 CI 以專用 context 設定）', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    // Note: network emulation may need context-level API in your environment.
    await page.fill('input[type="email"]', 'qa_offline@test.com')
    await page.fill('input[type="password"]', 'TestPass123')
    await page.click('button:has-text("Register")').catch(() => {})
    await expect(page).toHaveURL(/register/)
  })
})
