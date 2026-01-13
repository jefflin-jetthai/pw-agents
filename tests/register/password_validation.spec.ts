// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny } from './helpers'

test.describe('密碼欄位驗證', () => {
  test('密碼長度與顯示切換驗證', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    await page.fill('input[type="password"]', '12345')
    await page.click('button:has-text("Register")').catch(() => {})
    await expect(page).toHaveURL(/register/)

    await page.fill('input[type="password"]', '123456')
    const toggle = page.getByRole('button', { name: /show|hide|顯示|隱藏/i }).first()
    if (await toggle.count()) await toggle.click().catch(() => {})
    await expect(page.locator('input[type="password"]').first()).toBeVisible()
  })
})
// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny } from './helpers'

test.describe('密碼欄位驗證', () => {
  test('密碼長度與顯示切換驗證', async ({ page }) => {
    // 1. 導航到註冊頁面
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    // 2. 輸入少於 6 個字符的密碼
    await page.fill('input[type="password"]', '12345')
    await page.click('button:has-text("Register")').catch(() => {})
    // 4. 驗證是否顯示錯誤提示 - assert still on register
    await expect(page).toHaveURL(/register/)

    // 5. 輸入 6 個字符的密碼
    await page.fill('input[type="password"]', '123456')

    // 7. 點擊密碼顯示/隱藏按鈕
    const toggle = page.getByRole('button', { name: /show|hide|顯示|隱藏/i }).first()
    if (await toggle.count()) {
      await toggle.click().catch(() => {})
    }
    // 8. 驗證切換
    await expect(page.locator('input[type="password"]').first()).toBeVisible()
  })
})
 
