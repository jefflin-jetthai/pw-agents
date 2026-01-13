// spec: specs/register_test_plan.md
import { test, expect } from '@playwright/test'
import { generateRandomEmail } from './helpers'

test.describe('並發註冊請求', () => {
  test('同時提交相同電子郵件', async ({ browser }) => {
    const context1 = await browser.newContext()
    const context2 = await browser.newContext()
    const page1 = await context1.newPage()
    const page2 = await context2.newPage()

    const email = generateRandomEmail()

    await Promise.all([
      (async () => {
        await page1.goto('https://testssr.jteam.dev/register')
        await page1.fill('input[type="email"]', email)
        await page1.fill('input[type="password"]', 'TestPass123')
      })(),
      (async () => {
        await page2.goto('https://testssr.jteam.dev/register')
        await page2.fill('input[type="email"]', email)
        await page2.fill('input[type="password"]', 'TestPass123')
      })()
    ])

    await Promise.all([
      page1.click('button:has-text("Register")').catch(() => {}),
      page2.click('button:has-text("Register")').catch(() => {})
    ])

    const res1 = page1.url().includes('/register')
    const res2 = page2.url().includes('/register')
    expect(res1 || res2).toBeTruthy()

    await context1.close()
    await context2.close()
  })
})
