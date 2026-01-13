import { Page } from '@playwright/test'

export function generateRandomEmail(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const yyyy = d.getFullYear()
  const MM = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  const ss = pad(d.getSeconds())
  return `qa_${yyyy}${MM}${dd}_${hh}${mm}${ss}@test.com`
}

export async function dismissModalIfAny(page: Page) {
  // Try a few common modal selectors to avoid blocking interactions
  const selectors = ['[role="dialog"] button[aria-label="close"]', '.modal button.close', '.cookie-consent button']
  for (const sel of selectors) {
    const el = page.locator(sel).first()
    if (await el.count()) {
      try { await el.click({ timeout: 2000 }) } catch {}
    }
  }
}

export async function ensureAgreementChecked(page: Page) {
  const checkbox = page.locator('input[type="checkbox"]').first()
  if (await checkbox.count()) {
    try {
      await checkbox.click({ timeout: 2000 }).catch(() => {})
      if (await checkbox.isChecked()) return
    } catch {}
  }

  // Try clicking label or agreement text
  const agreementText = page.locator('text=/I agree to the|User Agreement|用戶協議/i').first()
  if (await agreementText.count()) {
    try { await agreementText.click({ timeout: 1000 }).catch(() => {}) } catch {}
    const cb = page.locator('input[type="checkbox"]').first()
    if (await cb.count()) {
      try { await cb.check({ timeout: 1000 }) } catch {}
      if (await cb.isChecked()) return
    }
  }

  // Last resort: set checked via JS
  try {
    await page.evaluate(() => {
      const el = document.querySelector('input[type="checkbox"]') as HTMLInputElement | null
      if (el) el.checked = true
    })
  } catch {}
}
