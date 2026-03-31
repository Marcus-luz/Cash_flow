from selenium.webdriver.common.by import By
from base_page import BasePage
import time

class LoginPage(BasePage):
    URL = "http://localhost:8080/"

    # --- LOCATORS (Identificadores) ---
    # Aba Entrar (caso precisemos garantir que estamos lá)
    ABA_ENTRAR = (By.XPATH, "//button[contains(text(), 'Entrar')]")

    # Campos (Geralmente os placeholders são os mesmos ou parecidos)
    CAMPO_EMAIL = (By.XPATH, "//input[@placeholder='Digite seu email']")
    
    # DICA: No login, a senha geralmente não tem o texto "(mín. 6 caracteres)"
    # Por segurança, vamos procurar pelo input do tipo password genérico
    CAMPO_SENHA = (By.XPATH, "//input[@type='password']")

    # Botão de entrar (Procura pelo botão de submeter ou pelo texto)
    BTN_ENTRAR = (By.XPATH, "//button[@type='submit']")

    TITULO_DASHBOARD = (By.XPATH, "//*[text()='Dashboard']")

    def abrir(self):
        self.driver.get(self.URL)

    def realizar_login(self, email, senha):
        # 1. Garante que está na aba entrar
        self.clicar(self.ABA_ENTRAR)
        time.sleep(0.5)

        # 2. Preenche
        self.escrever(self.CAMPO_EMAIL, email)
        self.escrever(self.CAMPO_SENHA, senha)

        # 3. Clica em Entrar
        self.clicar(self.BTN_ENTRAR)

    def validar_login_sucesso(self):
        try:
            self.encontrar(self.TITULO_DASHBOARD)
            return True
        except:
            return False