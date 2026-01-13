import random
import string
from datetime import datetime


def generate_random_email():
    """Generate a random email in format qa_yyyyMMdd_HHmmss@test.com"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"qa_{timestamp}@test.com"


def dismiss_modal_if_any(page):
    """Try to dismiss any modal dialog if it exists"""
    try:
        # Try common modal close buttons
        close_button = page.locator("button[aria-label='Close'], .modal-close, [role='button'][aria-label*='close']").first
        if close_button and close_button.is_visible():
            close_button.click()
            page.wait_for_timeout(500)  # Brief wait for modal to close
    except Exception:
        pass  # Modal might not exist or click failed


def ensure_agreement_checked(page):
    """Ensure the user agreement checkbox is checked"""
    checkbox = page.locator("input[type='checkbox']")
    if checkbox.is_visible() and not checkbox.is_checked():
        checkbox.check()
