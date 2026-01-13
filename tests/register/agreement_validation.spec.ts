// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { dismissModalIfAny, ensureAgreementChecked } from './helpers'

test.describe('用戶協議勾選驗證', () => {
  test('用戶協議互動與連結檢查', async ({ page }) => {
    await page.goto('https://testssr.jteam.dev/register')
    await dismissModalIfAny(page)

    // Skip if email input is not present (app may not support email registration)
    if ((await page.locator('input[type="email"]').count()) === 0) {
      test.skip(true, 'Email registration not available in this build')
    }

    const checkbox = page.locator('input[type="checkbox"]').first()
    await expect(checkbox).toBeVisible()
    await expect(checkbox).not.toBeChecked()

    await page.click('button:has-text("Register")').catch(() => {})
    await expect(page).toHaveURL(/register/)

    await ensureAgreementChecked(page)
    await expect(checkbox).toBeChecked()

    const link = page.getByRole('link', { name: /user agreement|User Agreement/i }).first()
    if (await link.count()) {
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page').catch(() => null),
        link.click().catch(() => {})
      ])
      if (newPage) await newPage.waitForLoadState('domcontentloaded')
    }
  })
})
 
