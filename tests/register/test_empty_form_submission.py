from playwright.sync_api import sync_playwright
from helpers import dismiss_modal_if_any


def test_empty_form_submission():
    """Test that empty form submission is blocked"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Try to click register button without filling any fields
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        register_button.click()
        
        page.wait_for_timeout(1000)
        
        # Should still be on register page or see validation error
        assert "register" in page.url or page.locator("[role='alert'], .error").count() > 0, \
            "Should prevent empty form submission"
        
        browser.close()


if __name__ == "__main__":
    test_empty_form_submission()
    print("✓ Empty form submission test passed")
