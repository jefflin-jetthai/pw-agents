"""
Playwright Python Configuration

This is the configuration file for Playwright tests.
See https://playwright.dev/python/docs/test-configuration for details.
"""

import os
from pathlib import Path

# Read environment variables (optional dotenv support)
# from dotenv import load_dotenv
# load_dotenv(Path(__file__).parent / '.env')

# Base configuration
BASE_URL = "https://testssr.jteam.dev"
TEST_DIR = Path(__file__).parent / "tests"

# CI environment detection
IS_CI = os.getenv("CI", "").lower() in ("true", "1", "yes")

# Test execution configuration
PLAYWRIGHT_CONFIG = {
    "test_dir": str(TEST_DIR),
    # Run tests in parallel
    "fully_parallel": True,
    # Fail on CI if test.only exists (checked via pytest markers)
    "forbid_only": IS_CI,
    # Retry configuration
    "retries": 2 if IS_CI else 0,
    # Worker configuration
    "workers": 1 if IS_CI else None,
    # Reporter configuration
    "reporter": "html",
    # Timeout settings (in milliseconds)
    "timeout": 30000,  # 30 seconds per test
    "expect_timeout": 5000,  # 5 seconds per assertion
}

# Browser launch options
BROWSER_LAUNCH_OPTIONS = {
    "headless": True,
    "slow_mo": 0,  # Slow down actions (in milliseconds)
}

# Page context options
CONTEXT_OPTIONS = {
    "viewport": {"width": 1280, "height": 720},
    "ignore_https_errors": False,
    "base_url": BASE_URL,
}

# Trace configuration
TRACE_CONFIG = {
    "screenshot_on_failure": True,
    "trace_on_failure": "on-first-retry",
}

# Available device profiles
DEVICES = {
    "chromium": {
        "browser_name": "chromium",
        "args": ["--disable-blink-features=AutomationControlled"],
    },
    "firefox": {
        "browser_name": "firefox",
    },
    "webkit": {
        "browser_name": "webkit",
    },
}

# Test project configurations
PROJECTS = [
    {
        "name": "chromium",
        "use": DEVICES["chromium"],
    },
    {
        "name": "firefox",
        "use": DEVICES["firefox"],
    },
    {
        "name": "webkit",
        "use": DEVICES["webkit"],
    },
    # Mobile device configurations (commented out)
    # {
    #     "name": "Mobile Chrome",
    #     "device": "Pixel 5",
    # },
    # {
    #     "name": "Mobile Safari",
    #     "device": "iPhone 12",
    # },
]

# Pytest configuration for conftest.py usage
PYTEST_INI_OPTIONS = {
    "testpaths": ["tests"],
    "python_files": "test_*.py",
    "python_classes": "Test*",
    "python_functions": "test_*",
    "asyncio_mode": "auto",
    "markers": [
        "skip_ci: skip test in CI environment",
        "slow: mark test as slow running",
        "integration: mark test as integration test",
    ],
}

# Test environment variables
TEST_ENV = {
    "APP_BASE_URL": BASE_URL,
    "LOGIN_EMAIL": "qa.test@gmail.com",
    "LOGIN_PASSWORD": "Aa123456",
    "HEADLESS": "true",
    "SLOWMO": "0",
}

if __name__ == "__main__":
    print("Playwright Python Configuration")
    print(f"Test Directory: {TEST_DIR}")
    print(f"Base URL: {BASE_URL}")
    print(f"CI Environment: {IS_CI}")
    print(f"Workers: {PLAYWRIGHT_CONFIG['workers'] or 'auto'}")
    print(f"Retries: {PLAYWRIGHT_CONFIG['retries']}")