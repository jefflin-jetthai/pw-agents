// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny } from './helpers'

test.describe('多重隨機電子郵件註冊', () => {
  test('連續兩次不同隨機電子郵件註冊', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    const email1 = generateRandomEmail()
    await page.fill('input[type="email"]', email1)
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
    const email2 = generateRandomEmail()
    await page.fill('input[type="email"]', email2)
    await page.fill('input[type="password"]', 'TestPass123')
    const checkbox2 = page.locator('input[type="checkbox"]').first()
    if (await checkbox2.count()) await checkbox2.click().catch(() => {})
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
      page.click('button:has-text("Register")').catch(() => {})
    ])

    await expect(page).not.toHaveURL(/register/)
  })
})
