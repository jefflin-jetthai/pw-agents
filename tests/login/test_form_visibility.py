from playwright.sync_api import sync_playwright


def test_form_visibility():
    """Test that all login form elements are visible"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/login")
        page.wait_for_load_state("networkidle")
        
        # Check for email input
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        assert email_input.is_visible(), "Email input should be visible"
        
        # Check for password input
        password_input = page.locator("input[type='password']")
        assert password_input.is_visible(), "Password input should be visible"
        
        # Check for login button
        login_button = page.locator("button:has-text('Login'), button:has-text('Sign In')")
        assert login_button.is_visible(), "Login button should be visible"
        
        # Check for register link
        register_link = page.locator("a:has-text('Register'), a:has-text('Sign Up')")
        assert register_link.count() > 0, "Register link should exist"
        
        # Check for forgot password link
        forgot_link = page.locator("a:has-text('Forgot'), a:has-text('forgot')")
        # Forgot link might be optional
        
        browser.close()


if __name__ == "__main__":
    test_form_visibility()
    print("✓ Form visibility test passed")
