import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
import os, time

class TrendSetEcommerceTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.maximize_window()
        cls.driver.get("http://vishnuat18.github.io/E-commerce_site/")
        cls.screenshot_path = "screenshots"
        os.makedirs(cls.screenshot_path, exist_ok=True)

    def screenshot(self, name):
        path = os.path.join(self.screenshot_path, f"{name}.png")
        self.driver.save_screenshot(path)

    def test_01_homepage_load(self):
        self.assertIn("TrendSet", self.driver.title)
        self.screenshot("homepage")

    def test_02_navigation_links(self):
        links = ["#home", "#sellers", "#cart", "#account", "#contact"]
        for href in links:
            self.driver.find_element(By.CSS_SELECTOR, f"a[href='{href}']").click()
            time.sleep(1)
        self.screenshot("navigation")

    def test_03_search_functionality(self):
        search = self.driver.find_element(By.ID, "search")
        search.clear()
        search.send_keys("shirt")
        time.sleep(1)
        self.screenshot("search")

    def test_04_category_filter(self):
        category = self.driver.find_element(By.ID, "category")
        category.send_keys("Clothing")
        time.sleep(1)
        self.screenshot("category-filter")

    def test_05_add_to_cart(self):
        button = self.driver.find_element(By.CSS_SELECTOR, ".best-p1 .add-cart button")
        button.click()
        time.sleep(1)
        self.screenshot("add-to-cart")

    def test_06_view_cart(self):
        self.driver.find_element(By.LINK_TEXT, "Cart").click()
        time.sleep(1)
        self.assertIn("Cart", self.driver.page_source)
        self.screenshot("cart-page")

    def test_07_change_quantity(self):
        qty_input = self.driver.find_element(By.CSS_SELECTOR, ".cart-item input[type='number']")
        qty_input.clear()
        qty_input.send_keys("2")
        time.sleep(1)
        self.screenshot("quantity-update")

    def test_08_remove_from_cart(self):
        btn = self.driver.find_element(By.CSS_SELECTOR, ".cart-item-details button")
        btn.click()
        time.sleep(1)
        self.screenshot("remove-cart")

    def test_09_login_success(self):
        self.driver.find_element(By.LINK_TEXT, "SIGN IN").click()
        self.driver.find_element(By.ID, "login-username").send_keys("vishnu")
        self.driver.find_element(By.ID, "login-password").send_keys("password123")
        self.driver.find_element(By.CSS_SELECTOR, "#login-form button").click()
        time.sleep(1)
        self.screenshot("login-success")

    def test_10_login_failure(self):
        self.driver.find_element(By.ID, "login-username").clear()
        self.driver.find_element(By.ID, "login-password").clear()
        self.driver.find_element(By.ID, "login-username").send_keys("wrong")
        self.driver.find_element(By.ID, "login-password").send_keys("wrong")
        self.driver.find_element(By.CSS_SELECTOR, "#login-form button").click()
        time.sleep(1)
        self.screenshot("login-failure")

    def test_11_signup_success(self):
        self.driver.find_element(By.ID, "signup-username").send_keys("newuser")
        self.driver.find_element(By.ID, "signup-email").send_keys("newuser@example.com")
        self.driver.find_element(By.ID, "signup-password").send_keys("secure123")
        self.driver.find_element(By.CSS_SELECTOR, "#signup-form button").click()
        time.sleep(1)
        self.screenshot("signup-success")

    def test_12_signup_failure(self):
        self.driver.find_element(By.ID, "signup-username").clear()
        self.driver.find_element(By.ID, "signup-email").clear()
        self.driver.find_element(By.ID, "signup-password").clear()
        self.driver.find_element(By.CSS_SELECTOR, "#signup-form button").click()
        time.sleep(1)
        self.screenshot("signup-failure")

    def test_13_checkout_process(self):
        self.driver.find_element(By.LINK_TEXT, "Cart").click()
        time.sleep(1)
        self.driver.execute_script("document.querySelector('.cart-total button').click()")
        time.sleep(1)
        self.driver.find_element(By.ID, "checkout-name").send_keys("Vishnu Rajan")
        self.driver.find_element(By.ID, "checkout-address").send_keys("123 Street")
        self.driver.find_element(By.ID, "checkout-payment").send_keys("Credit Card")
        self.driver.find_element(By.CSS_SELECTOR, ".checkout-form button").click()
        time.sleep(1)
        self.screenshot("checkout")

    def test_14_contact_form_success(self):
        self.driver.find_element(By.LINK_TEXT, "Contact").click()
        self.driver.find_element(By.ID, "contact-name").send_keys("Vishnu")
        self.driver.find_element(By.ID, "contact-email").send_keys("vishnu@example.com")
        self.driver.find_element(By.ID, "contact-message").send_keys("This is a test message.")
        self.driver.find_element(By.CSS_SELECTOR, ".contact-form button").click()
        time.sleep(1)
        self.screenshot("contact-success")

    def test_15_modal_view_product(self):
        self.driver.find_element(By.CSS_SELECTOR, ".best-p1 img").click()
        time.sleep(1)
        self.screenshot("modal-view")
        self.driver.find_element(By.CLASS_NAME, "modal").click()

    def test_16_logout_button(self):
        try:
            logout = self.driver.find_element(By.ID, "logout")
            logout.click()
            time.sleep(1)
            self.screenshot("logout")
        except:
            self.screenshot("logout-not-visible")

    def test_17_scroll_behavior(self):
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        self.screenshot("scroll")

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()
