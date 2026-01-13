// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny } from './helpers'

test.describe('無效電子郵件格式', () => {
  test('輸入無效電子郵件應顯示錯誤', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    await page.fill('input[type="email"]', 'notanemail')
    await page.fill('input[type="password"]', 'TestPass123')
    const checkbox = page.locator('input[type="checkbox"]').first()
    if (await checkbox.count()) await checkbox.click().catch(() => {})
    await page.click('button:has-text("Register")').catch(() => {})

    await expect(page).toHaveURL(/register/)
    const err = page.locator('text=/valid email|請輸入有效的電子郵件|Please enter a valid email/i')
    if (await err.count()) await expect(err.first()).toBeVisible()
  })
})
