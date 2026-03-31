from selenium.webdriver.common.by import By
from base_page import BasePage
import time

class RegisterPage(BasePage):
    URL = "http://localhost:8080/"

    # --- LOCATORS ATUALIZADOS COM BASE NO SEU HTML ---
    
    # 1. Botão da Aba "Cadastrar" (Procura pelo texto dentro do botão)
    ABA_CADASTRAR = (By.XPATH, "//button[contains(text(), 'Cadastrar')]")

    # 2. Campos (Usando o placeholder pois não há IDs)
    CAMPO_NOME = (By.XPATH, "//input[@placeholder='Digite seu nome']")
    CAMPO_EMAIL = (By.XPATH, "//input[@placeholder='Digite seu email']")
    
    # Nota: O placeholder da senha tem acentos e parênteses, vamos usar type='password' 
    # mas garantindo que é o segundo campo de senha da tela (o do cadastro) ou pelo placeholder exato
    CAMPO_SENHA = (By.XPATH, "//input[@placeholder='Digite sua senha (mín. 6 caracteres)']")

    # 3. Botão de Enviar (Procura pelo texto "Criar Conta")
    BTN_SUBMIT = (By.XPATH, "//button[contains(text(), 'Criar Conta')]")

    # Mensagem de sucesso (mantive genérico, ajuste se necessário)
    MSG_SUCESSO = (By.XPATH, "//*[contains(text(), 'sucesso') or contains(text(), 'Dashboard')]")

    def abrir(self):
        self.driver.get(self.URL)

    def preencher_formulario(self, nome, email, senha):
        # 1. Clica na aba Cadastrar
        self.clicar(self.ABA_CADASTRAR)
        
        # Dica: Pequena pausa para garantir que a animação da aba terminou
        time.sleep(0.5) 

        # 2. Preenche os campos
        self.escrever(self.CAMPO_NOME, nome)
        self.escrever(self.CAMPO_EMAIL, email)
        self.escrever(self.CAMPO_SENHA, senha)

    def submeter_cadastro(self):
        self.clicar(self.BTN_SUBMIT)

    def obter_mensagem_sucesso(self):
        try:
            # Espera um pouco para ver se a URL mudou ou se apareceu mensagem
            time.sleep(2)
            return self.driver.page_source.lower() # Retorna todo o texto da página para validar
        except:
            return ""