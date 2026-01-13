from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any, generate_random_email, ensure_agreement_checked


def test_auto_login_verification():
    """Verify automatic login after successful registration"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Register with random email
        random_email = generate_random_email()
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        if email_input.count() > 0:
            email_input.fill(random_email)
        
        password_input = page.locator("input[type='password']")
        password_input.fill("AutoLoginTest123")
        
        ensure_agreement_checked(page)
        
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        register_button.click()
        
        # Wait for auto-login to complete
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(3000)
        
        # Check if automatically logged in
        # Look for logout button as primary indicator
        logout_button = page.locator("button:has-text('Logout'), button:has-text('Log out')")
        
        assert logout_button.count() > 0, \
            "Should be automatically logged in after registration (logout button should be visible)"
        
        browser.close()


if __name__ == "__main__":
    test_auto_login_verification()
    print("✓ Auto-login verification test passed")
