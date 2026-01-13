from playwright.sync_api import sync_playwright
import sys
from pathlib import Path

# Add register directory to path for helpers import
sys.path.insert(0, str(Path(__file__).parent.parent / "register"))
from helpers import dismiss_modal_if_any


def test_successful_login():
    """Test successful login with valid credentials"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/login")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Fill login form
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        email_input.fill("qa.test@gmail.com")
        
        password_input = page.locator("input[type='password']")
        password_input.fill("Aa123456")
        
        # Click login button
        login_button = page.locator("button:has-text('Login'), button:has-text('Sign In')")
        login_button.click()
        
        # Wait for navigation
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        # Verify redirect away from login page
        assert "login" not in page.url.lower(), \
            f"Should redirect away from login page, got: {page.url}"
        
        # Verify we're authenticated (can be on lobby, dashboard, home, etc)
        assert page.url, "Should have a valid URL after login"
        
        browser.close()


if __name__ == "__main__":
    test_successful_login()
    print("✓ Successful login test passed")
