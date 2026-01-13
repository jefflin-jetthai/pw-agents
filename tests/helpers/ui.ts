import { Page } from '@playwright/test';

export async function dismissModalIfAny(page: Page): Promise<void> {
  // Step 1: Immediately remove modal from DOM - most aggressive approach
  await page.evaluate(() => {
    const modalSelectors = [
      '.modal-wrapper',
      '.modal',
      '[role="dialog"]',
      '.overlay',
      '.modal-backdrop',
      '.modal-overlay'
    ];
    
    for (const selector of modalSelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        // Remove completely from DOM
        if (el.parentNode) {
          try {
            el.parentNode.removeChild(el);
          } catch (e) {
            // Fallback: hide if can't remove
            (el as HTMLElement).style.display = 'none !important';
            (el as HTMLElement).style.pointerEvents = 'none !important';
          }
        }
      });
    }
  }).catch(() => {});

  // Step 2: Press Escape to close any programmatic modals
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(50);
  }

  // Step 3: Wait a bit for any re-renders
  await page.waitForTimeout(200);

  // Step 4: Final sweep - hide any remaining modals with CSS
  await page.evaluate(() => {
    const modalSelectors = [
      '.modal-wrapper',
      '.modal',
      '[role="dialog"]',
      '.overlay',
      '.modal-backdrop',
      '.modal-overlay'
    ];
    
    for (const selector of modalSelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        // Disable all pointer events on the element and children
        htmlEl.style.pointerEvents = 'none !important';
        htmlEl.style.display = 'none !important';
        htmlEl.style.visibility = 'hidden !important';
        htmlEl.style.opacity = '0 !important';
        
        // Recursively disable pointer events on all children
        const walkTree = (node: Element) => {
          Array.from(node.children).forEach((child) => {
            const childEl = child as HTMLElement;
            childEl.style.pointerEvents = 'none !important';
            walkTree(child);
          });
        };
        walkTree(htmlEl);
      });
    }
  }).catch(() => {});
}
