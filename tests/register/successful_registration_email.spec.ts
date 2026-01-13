// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny, ensureAgreementChecked } from './helpers'

test.describe('註冊完整流程', () => {
  test('使用電子郵件成功註冊', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    const email = generateRandomEmail()
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', 'TestPass123')

    if ((await page.locator('input[type="email"]').count()) === 0) {
      test.skip(true, 'Email registration not available in this build')
    }

    const checkbox = page.locator('input[type="checkbox"]').first()
    if (await checkbox.count()) await ensureAgreementChecked(page)

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
      page.click('button:has-text("Register")').catch(() => {})
    ])

    await expect(page).not.toHaveURL(/register/)
    await expect(page.getByRole('button', { name: /logout|登出/i }).first()).toBeVisible()
  })
})
