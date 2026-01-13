from playwright.sync_api import sync_playwright
from helpers import dismiss_modal_if_any, generate_random_email, ensure_agreement_checked


def test_random_email_registration():
    """Test multiple random email registrations"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        
        for i in range(3):
            page = browser.new_page()
            page.goto("https://testssr.jteam.dev/register")
            page.wait_for_load_state("networkidle")
            
            dismiss_modal_if_any(page)
            
            random_email = generate_random_email()
            
            email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
            if email_input.count() > 0:
                email_input.fill(random_email)
            
            password_input = page.locator("input[type='password']")
            password_input.fill(f"RandomRegTest{i}123")
            
            ensure_agreement_checked(page)
            
            register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
            register_button.click()
            
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(1500)
            
            # Verify registration succeeded
            assert "register" not in page.url.lower(), \
                f"Registration {i+1} failed - still on register page"
            
            page.close()
        
        browser.close()


if __name__ == "__main__":
    test_random_email_registration()
    print("✓ Random email registration test passed")
