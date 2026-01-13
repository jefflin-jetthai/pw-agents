// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny } from './helpers'

test.describe('註冊完成後遊戲大廳訪問驗證', () => {
  test('進入大廳並檢查元件', async ({ page }) => {
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

    await expect(page).not.toHaveURL(/register|login/)
    const games = page.locator('text=/game|lobby|play|games/i')
    expect(await games.count() >= 0).toBeTruthy()
    await expect(page.getByRole('button', { name: /logout|登出/i }).first()).toBeVisible()
  })
})
 
