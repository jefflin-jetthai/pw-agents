from playwright.sync_api import sync_playwright

def diagnose_register_form():
    """Diagnose the actual form structure"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://testssr.jteam.dev/register")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        
        print("=" * 60)
        print("REGISTER PAGE DIAGNOSTICS")
        print("=" * 60)
        
        # Check for all input fields
        all_inputs = page.locator("input")
        print(f"\nTotal input fields: {all_inputs.count()}")
        
        for i in range(all_inputs.count()):
            input_elem = all_inputs.nth(i)
            input_type = input_elem.get_attribute("type")
            placeholder = input_elem.get_attribute("placeholder")
            name = input_elem.get_attribute("name")
            print(f"  [{i}] type={input_type}, placeholder={placeholder}, name={name}")
        
        # Check for all buttons
        all_buttons = page.locator("button")
        print(f"\nTotal buttons: {all_buttons.count()}")
        for i in range(all_buttons.count()):
            button = all_buttons.nth(i)
            text = button.text_content()
            button_type = button.get_attribute("type")
            print(f"  [{i}] text='{text}', type={button_type}")
        
        # Check for all links
        all_links = page.locator("a")
        print(f"\nTotal links: {all_links.count()}")
        for i in range(all_links.count()):
            link = all_links.nth(i)
            text = link.text_content()
            href = link.get_attribute("href")
            print(f"  [{i}] text='{text}', href={href}")
        
        # Look for form
        form = page.locator("form")
        print(f"\nForm elements: {form.count()}")
        
        # Look for modals
        modal = page.locator("[role='dialog'], .modal, .popup")
        print(f"Modal elements: {modal.count()}")
        
        print("\n" + "=" * 60)
        
        browser.close()

if __name__ == "__main__":
    diagnose_register_form()
