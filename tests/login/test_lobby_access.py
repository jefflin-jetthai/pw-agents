from playwright.sync_api import sync_playwright
import sys
from pathlib import Path

# Add register directory to path for helpers import
sys.path.insert(0, str(Path(__file__).parent.parent / "register"))
from helpers import dismiss_modal_if_any


def test_lobby_access():
    """Test access to lobby after successful login"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/login")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Login with valid credentials
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        email_input.fill("qa.test@gmail.com")
        
        password_input = page.locator("input[type='password']")
        password_input.fill("Aa123456")
        
        login_button = page.locator("button:has-text('Login'), button:has-text('Sign In')")
        login_button.click()
        
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        # Verify lobby page
        current_url = page.url.lower()
        assert "lobby" in current_url or "home" in current_url or "dashboard" in current_url, \
            f"Should be redirected to lobby, got: {page.url}"
        
        # Check for game content
        game_content = page.locator("[class*='game'], [class*='lobby'], [data-testid*='game']")
        assert game_content.count() > 0, "Lobby should display game content"
        
        # Verify we're not sent back to login page
        assert "login" not in current_url, "Should not be redirected back to login page"
        
        browser.close()


if __name__ == "__main__":
    test_lobby_access()
    print("✓ Lobby access test passed")
