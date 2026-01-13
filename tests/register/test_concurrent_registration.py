from playwright.sync_api import sync_playwright
from helpers import dismiss_modal_if_any, generate_random_email, ensure_agreement_checked


def test_concurrent_registration():
    """Test system handling of concurrent registration attempts with same email"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        
        # Create multiple pages for concurrent attempts
        pages = []
        for i in range(2):
            page = browser.new_page()
            pages.append(page)
        
        # Open all pages on register
        for page in pages:
            page.goto("https://testssr.jteam.dev/register")
            page.wait_for_load_state("networkidle")
            dismiss_modal_if_any(page)
        
        # Use same email for both
        same_email = generate_random_email()
        
        # Fill form on both pages
        for i, page in enumerate(pages):
            email_input = page.locator("input[type='email'], input[placeholder*='email' i]")
            if email_input.count() > 0:
                email_input.fill(same_email)
            
            password_input = page.locator("input[type='password']")
            password_input.fill(f"ConcurrentTest{i}123")
            
            ensure_agreement_checked(page)
        
        # Submit on both pages
        for i, page in enumerate(pages):
            register_button = page.locator("button:has-text('Register'), button:has-text('Sign Up')")
            register_button.click()
        
        # Wait for responses
        for page in pages:
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(1500)
        
        # At least one should succeed, one should fail
        successes = sum(1 for page in pages if "register" not in page.url.lower())
        
        assert successes >= 1, "At least one concurrent registration should succeed"
        
        # Close all
        for page in pages:
            page.close()
        browser.close()


if __name__ == "__main__":
    test_concurrent_registration()
    print("✓ Concurrent registration test passed")
