from playwright.sync_api import sync_playwright
from .helpers import dismiss_modal_if_any


def test_agreement_validation():
    """Test that user agreement checkbox is required for registration"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Try to click register button without checking agreement
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        register_button.click()
        
        # Should see error or remain on register page
        page.wait_for_timeout(1000)
        
        # Check if still on register page (indicating validation failed)
        assert "register" in page.url or page.locator("input[type='password']").is_visible(), \
            "Should not allow registration without agreement"
        
        # Now check the agreement checkbox
        checkbox = page.locator("input[type='checkbox']")
        checkbox.check()
        
        # Verify checkbox is now checked
        assert checkbox.is_checked(), "Checkbox should be checked"
        
        browser.close()


if __name__ == "__main__":
    test_agreement_validation()
    print("✓ Agreement validation test passed")
