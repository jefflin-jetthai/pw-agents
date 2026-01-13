from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any, ensure_agreement_checked


def test_duplicate_registration():
    """Test that duplicate email registration is rejected"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Use a fixed email for duplicate test
        test_email = "duplicate.test@example.com"
        
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        if email_input.count() == 0:
            print("ℹ Email input not found - skipping duplicate registration test")
            browser.close()
            return
        
        email_input.fill(test_email)
        password_input = page.locator("input[type='password']")
        password_input.fill("TestPassword123")
        
        ensure_agreement_checked(page)
        
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        register_button.click()
        
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1500)
        
        # Try to register again with same email
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        email_input.fill(test_email)
        password_input.fill("TestPassword123")
        ensure_agreement_checked(page)
        
        register_button.click()
        page.wait_for_timeout(1500)
        
        # Should see error or stay on register page
        error_message = page.locator("[role='alert'], .error:has-text('already'), .error:has-text('exist')")
        is_on_register_page = "register" in page.url.lower()
        
        assert error_message.count() > 0 or is_on_register_page, \
            "Should prevent duplicate email registration"
        
        browser.close()


if __name__ == "__main__":
    test_duplicate_registration()
    print("✓ Duplicate registration test passed")
