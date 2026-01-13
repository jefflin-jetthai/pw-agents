from playwright.sync_api import sync_playwright


def test_empty_form():
    """Test that empty form submission is blocked"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/login")
        page.wait_for_load_state("networkidle")
        
        # Try to click login button without filling any fields
        login_button = page.locator("button:has-text('Login'), button:has-text('Sign In')")
        login_button.click()
        
        page.wait_for_timeout(1000)
        
        # Should still be on login page or see validation error
        assert "login" in page.url or page.locator("[role='alert'], .error").count() > 0, \
            "Should prevent empty form submission"
        
        browser.close()


if __name__ == "__main__":
    test_empty_form()
    print("✓ Empty form test passed")
