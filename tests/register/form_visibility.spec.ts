// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny } from './helpers'

test.describe('註冊表單驗證', () => {
  test('註冊表單元素可見性驗證', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    await expect(page.locator('input[type="email"]').first()).toBeVisible()
    await expect(page.locator('input[type="password"]').first()).toBeVisible()
    const toggle = page.getByRole('button', { name: /show|hide|顯示|隱藏/i }).first()
    if (await toggle.count()) await expect(toggle).toBeVisible()
    await expect(page.locator('input[type="checkbox"]').first()).toBeVisible()
    await expect(page.getByRole('button', { name: /register|註冊/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /already have an account|login|登入/i }).first()).toBeVisible()
  })
})
// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny } from './helpers'

test.describe('註冊表單驗證', () => {
  test('註冊表單元素可見性驗證', async ({ page }) => {
    // 1. 導航到註冊頁面 https://testssr.jteam.dev/register
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    // 2. 驗證電子郵件輸入欄位存在
    await expect(page.locator('input[type="email"]').first()).toBeVisible()

    // 3. 驗證密碼輸入欄位存在
    await expect(page.locator('input[type="password"]').first()).toBeVisible()

    // 4. 驗證密碼顯示/隱藏切換按鈕存在
    await expect(page.getByRole('button', { name: /show|hide|顯示|隱藏/i }).first()).toBeTruthy()

    // 5. 驗證用戶協議勾選框存在
    await expect(page.locator('input[type="checkbox"]').first()).toBeVisible()

    // 6. 驗證註冊按鈕存在
    await expect(page.getByRole('button', { name: /register|註冊/i }).first()).toBeVisible()

    // 7. 驗證登入連結存在
    await expect(page.getByRole('link', { name: /already have an account|login|登入/i }).first()).toBeVisible()
  })
})
 
