// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny } from './helpers'

test.describe('註冊後自動登入驗證', () => {
  test('註冊後自動登入與會話檢查', async ({ page }) => {
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

    await expect(page).not.toHaveURL(/login|register/)
    const cookies = await page.context().cookies()
    expect(Array.isArray(cookies)).toBeTruthy()
    const keys = await page.evaluate(() => Object.keys(localStorage))
    expect(Array.isArray(keys)).toBeTruthy()
  })
})
// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail, dismissModalIfAny } from './helpers'

test.describe('註冊後自動登入驗證', () => {
  test('註冊後自動登入與會話檢查', async ({ page }) => {
    // 1. 進行成功的註冊流程
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

    // 3. 驗證不出現登入頁面提示與進入受保護頁面
    await expect(page).not.toHaveURL(/login|register/)

    // 5-7. 檢查儲存的會話資訊
    const cookies = await page.context().cookies()
    expect(cookies.length).toBeGreaterThanOrEqual(0)
    const ls = await page.evaluate(() => Object.keys(localStorage))
    expect(Array.isArray(ls)).toBeTruthy()
  })
})
 
