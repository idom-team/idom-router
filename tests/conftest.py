import pytest
from playwright.async_api import async_playwright
from idom.testing import DisplayFixture, BackendFixture


def pytest_addoption(parser) -> None:
    parser.addoption(
        "--headed",
        dest="headed",
        action="store_true",
        help="Open a browser window when runnging web-based tests",
    )


@pytest.fixture
async def display(server, browser):
    async with DisplayFixture(server, browser) as display:
        display.page.set_default_timeout(10000)
        yield display


@pytest.fixture
async def server():
    async with BackendFixture() as server:
        yield server


@pytest.fixture
async def browser(pytestconfig):
    async with async_playwright() as pw:
        yield await pw.chromium.launch(headless=not bool(pytestconfig.option.headed))
