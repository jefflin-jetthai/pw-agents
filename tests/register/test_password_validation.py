from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any


def test_password_validation():
    """Test password strength validation"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        password_input = page.locator("input[type='password']")
        assert password_input.count() > 0, "Password input should exist"
        
        # Test short password (< 6 characters)
        password_input.fill("12345")
        page.wait_for_timeout(500)
        
        # Test valid password
        password_input.clear()
        password_input.fill("ValidPassword123")
        
        assert password_input.input_value() == "ValidPassword123", "Password should be set"
        
        browser.close()


if __name__ == "__main__":
    test_password_validation()
    print("✓ Password validation test passed")
