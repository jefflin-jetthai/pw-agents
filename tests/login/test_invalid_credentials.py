from playwright.sync_api import sync_playwright


def test_invalid_credentials():
    """Test login with invalid credentials"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/login")
        page.wait_for_load_state("networkidle")
        
        # Try invalid email
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        email_input.fill("invalid@email.com")
        
        password_input = page.locator("input[type='password']")
        password_input.fill("wrongpassword")
        
        login_button = page.locator("button:has-text('Login'), button:has-text('Sign In')")
        login_button.click()
        
        page.wait_for_timeout(1500)
        
        # Should show error or stay on login page
        error_message = page.locator("[role='alert'], .error:has-text('invalid'), .error:has-text('incorrect')")
        is_on_login_page = "login" in page.url.lower()
        
        assert error_message.count() > 0 or is_on_login_page, \
            "Should reject invalid credentials"
        
        browser.close()


if __name__ == "__main__":
    test_invalid_credentials()
    print("✓ Invalid credentials test passed")
