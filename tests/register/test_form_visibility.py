from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any


def test_form_visibility():
    """Test that all registration form elements are visible"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Check for email input (might not exist if app only supports phone)
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        if email_input.count() > 0:
            assert email_input.is_visible(), "Email input should be visible"
        
        # Check password input
        password_input = page.locator("input[type='password']")
        assert password_input.count() > 0, "Password input should exist"
        
        # Check agreement checkbox
        checkbox = page.locator("input[type='checkbox']")
        assert checkbox.count() > 0, "Agreement checkbox should exist"
        
        # Check register button
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        assert register_button.count() > 0, "Register button should exist"
        
        # Check login link
        login_link = page.locator("a:has-text('Log in'), a:has-text('Login')")
        assert login_link.count() > 0, "Login link should exist"
        
        browser.close()


if __name__ == "__main__":
    test_form_visibility()
    print("✓ Form visibility test passed")
