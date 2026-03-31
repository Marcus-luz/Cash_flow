from selenium import webdriver
import time
driver = webdriver.Chrome()

# Acessa o Google
driver.get("https://www.google.com")

print("Navegador aberto com sucesso!")

# Espera 5 segundos antes de fechar
time.sleep(5)
driver.quit()