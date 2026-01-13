from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any, generate_random_email, ensure_agreement_checked


def test_successful_registration_email():
    """Test successful registration with random email"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Generate random email
        random_email = generate_random_email()
        
        # Check if email input exists
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        if email_input.count() > 0:
            email_input.fill(random_email)
        
        # Fill password
        password_input = page.locator("input[type='password']")
        password_input.fill("TestPassword123")
        
        # Check agreement
        ensure_agreement_checked(page)
        
        # Click register button
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        register_button.click()
        
        # Wait for response
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        # Check if registration was successful
        # Either redirected away from register page or see success message
        assert "register" not in page.url.lower(), \
            "Should redirect away from register page after successful registration"
        
        browser.close()


if __name__ == "__main__":
    test_successful_registration_email()
    print("✓ Successful registration test passed")
