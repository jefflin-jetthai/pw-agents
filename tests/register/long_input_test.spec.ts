// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny } from './helpers'

test.describe('超長輸入測試', () => {
  test('超長電子郵件與密碼應被處理', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    const longEmail = 'a'.repeat(260) + '@example.com'
    const longPass = 'p'.repeat(1000)
    await page.fill('input[type="email"]', longEmail)
    await page.fill('input[type="password"]', longPass)
    await page.click('button:has-text("Register")').catch(() => {})

    await expect(page).toHaveURL(/register/)
  })
})
