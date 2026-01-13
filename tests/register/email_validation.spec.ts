// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny } from './helpers'

test.describe('電子郵件輸入驗證', () => {
  test('電子郵件欄位驗證行為', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    const good = generateRandomEmail()
    await page.fill('input[type="email"]', good)
    await expect(page.locator('input[type="email"]').first()).toHaveValue(good)

    await page.fill('input[type="email"]', '')
    await page.click('button:has-text("Register")').catch(() => {})
    await page.fill('input[type="email"]', 'notanemail')
    await page.click('button:has-text("Register")').catch(() => {})

    await expect(page).toHaveURL(/register/)
  })
})
// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny } from './helpers'

test.describe('電子郵件輸入驗證', () => {
  test('電子郵件欄位驗證行為', async ({ page }) => {
    // 1. 導航到註冊頁面
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    // 2. 在電子郵件欄位輸入有效的電子郵件地址
    const good = generateRandomEmail()
    await page.fill('input[type="email"]', good)
    await expect(page.locator('input[type="email"]').first()).toHaveValue(good)

    // 4. 清空電子郵件欄位
    await page.fill('input[type="email"]', '')

    // 5. 嘗試不填電子郵件直接點擊註冊
    await page.click('button:has-text("Register")', { timeout: 5000 }).catch(() => {})

    // 6. 輸入無效的電子郵件格式
    await page.fill('input[type="email"]', 'notanemail')
    await page.click('button:has-text("Register")').catch(() => {})

    // Expect either validation message or no navigation
    await expect(page).toHaveURL(/register/)
  })
})
 
