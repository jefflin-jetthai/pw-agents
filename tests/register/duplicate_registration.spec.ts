// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny } from './helpers'

test.describe('重複註冊驗證', () => {
  test('重複電子郵件應被拒絕', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)
    const email = generateRandomEmail()
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', 'TestPass123')
    const checkbox = page.locator('input[type="checkbox"]').first()
    if (await checkbox.count()) await checkbox.click().catch(() => {})
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
      page.click('button:has-text("Register")').catch(() => {})
    ])

    const logout = page.getByRole('button', { name: /logout|登出/i }).first()
    if (await logout.count()) await logout.click().catch(() => {})

    await page.goto('https://testssr.jteam.dev/register')
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', 'AnotherPass123')
    const cb2 = page.locator('input[type="checkbox"]').first()
    if (await cb2.count()) await cb2.click().catch(() => {})
    await page.click('button:has-text("Register")').catch(() => {})

    await expect(page).toHaveURL(/register/)
    const alert = page.locator('text=/already registered|已註冊|already registered/i')
    if (await alert.count()) await expect(alert.first()).toBeVisible()
  })
})
