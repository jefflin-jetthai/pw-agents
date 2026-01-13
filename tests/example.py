from playwright.sync_api import sync_playwright, expect


def test_has_title():
    """Test that page has correct title"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('https://playwright.dev/')
        
        # Expect a title "to contain" a substring.
        assert 'Playwright' in page.title()
        
        browser.close()


def test_get_started_link():
    """Test get started link navigation"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('https://playwright.dev/')
        
        # Click the get started link.
        page.get_by_role('link', name='Get started').click()
        
        # Expects page to have a heading with the name of Installation.
        heading = page.get_by_role('heading', name='Installation')
        assert heading.is_visible()
        
        browser.close()


if __name__ == "__main__":
    test_has_title()
    test_get_started_link()
    print("✓ All tests passed")
