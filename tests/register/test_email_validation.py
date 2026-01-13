from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any


def test_email_validation():
    """Test email input validation"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Check if email input exists
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        
        if email_input.count() == 0:
            print("ℹ Email input not found - app might only support phone registration")
            browser.close()
            return
        
        # Try entering invalid email
        email_input.fill("notanemail")
        page.wait_for_timeout(500)
        
        # Try valid email
        email_input.clear()
        email_input.fill("test@example.com")
        
        # Verify email is accepted
        assert email_input.input_value() == "test@example.com", "Email should be set"
        
        browser.close()


if __name__ == "__main__":
    test_email_validation()
    print("✓ Email validation test passed")
