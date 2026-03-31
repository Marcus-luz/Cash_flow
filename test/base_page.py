from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10) # Espera robusta de até 10s

    def encontrar(self, locator):
        """Espera o elemento aparecer antes de retornar"""
        return self.wait.until(EC.visibility_of_element_located(locator))

    def escrever(self, locator, texto):
        elemento = self.encontrar(locator)
        elemento.clear()
        elemento.send_keys(texto)

    def clicar(self, locator):
        elemento = self.wait.until(EC.element_to_be_clickable(locator))
        elemento.click()