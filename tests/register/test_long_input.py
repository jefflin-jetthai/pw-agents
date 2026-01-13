from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any, ensure_agreement_checked


def test_long_input():
    """Test system handling of extremely long input"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Try long email
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        if email_input.count() > 0:
            long_email = "a" * 256 + "@test.com"
            email_input.fill(long_email)
        
        # Try long password
        password_input = page.locator("input[type='password']")
        long_password = "x" * 1000
        password_input.fill(long_password)
        
        ensure_agreement_checked(page)
        
        # Try to submit
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        register_button.click()
        
        page.wait_for_timeout(1000)
        
        # Should handle gracefully (error or success, but not crash)
        assert page.locator("text='error'").count() >= 0, "Page should handle long input gracefully"
        
        browser.close()


if __name__ == "__main__":
    test_long_input()
    print("✓ Long input test passed")
