from playwright.sync_api import sync_playwright
from helpers import dismiss_modal_if_any, generate_random_email, ensure_agreement_checked


def test_lobby_access_verification():
    """Verify access to lobby after successful registration"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        
        dismiss_modal_if_any(page)
        
        # Register
        random_email = generate_random_email()
        email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
        if email_input.count() > 0:
            email_input.fill(random_email)
        
        password_input = page.locator("input[type='password']")
        password_input.fill("LobbyAccessTest123")
        
        ensure_agreement_checked(page)
        
        register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
        register_button.click()
        
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(3000)
        
        # Check if in lobby
        current_url = page.url.lower()
        assert "lobby" in current_url or "home" in current_url or "dashboard" in current_url, \
            f"Should be redirected to lobby, got: {current_url}"
        
        # Check for game content
        game_content = page.locator("[class*='game'], [class*='lobby'], [data-testid*='game']")
        assert game_content.count() > 0, "Lobby should display game content"
        
        # Check for logout button
        logout_button = page.locator("button:has-text('Logout'), button:has-text('Log out')")
        assert logout_button.is_visible(), "Logout button should be visible in lobby"
        
        browser.close()


if __name__ == "__main__":
    test_lobby_access_verification()
    print("✓ Lobby access verification test passed")
