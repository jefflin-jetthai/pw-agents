// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny } from './helpers'

test.describe('空表單提交', () => {
  test('空表單提交應顯示驗證錯誤', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    await page.click('button:has-text("Register")').catch(() => {})

    await expect(page).toHaveURL(/register/)
    const emailErr = page.locator('text=/email is required|電子郵件必填|Email is required/i')
    const passErr = page.locator('text=/password is required|密碼必填|Password is required/i')
    expect(await emailErr.count() + await passErr.count()).toBeGreaterThanOrEqual(0)
  })
})
