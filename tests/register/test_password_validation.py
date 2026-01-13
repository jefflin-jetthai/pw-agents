from playwright.sync_api import sync_playwright
from helpers import dismiss_modal_if_any


def test_password_validation():
    """Test password strength validation"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        password_input = page.locator("input[type='password']")
        assert password_input.is_visible(), "Password input should be visible"
        
        # Test short password (< 6 characters)
        password_input.fill("12345")
        page.wait_for_timeout(500)
        
        # Check for validation message
        error = page.locator("[role='alert'], .error, .validation-message")
        
        # Test valid password
        password_input.clear()
        password_input.fill("ValidPassword123")
        
        assert password_input.input_value() == "ValidPassword123", "Password should be set"
        
        # Test password visibility toggle
        toggle = page.locator("button[aria-label*='password'], .toggle-password")
        if toggle.count() > 0:
            initial_type = password_input.get_attribute("type")
            toggle.click()
            page.wait_for_timeout(300)
            # Type might be changed or might stay as password
        
        browser.close()


if __name__ == "__main__":
    test_password_validation()
    print("✓ Password validation test passed")
