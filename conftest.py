# conftest.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from faker import Faker

# Inicializa o Faker (pode ser global)
fake = Faker('pt_BR')

@pytest.fixture(scope="function")
def driver():
    # Setup: Abre o navegador antes do teste
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    driver.maximize_window()
    driver.implicitly_wait(10) # Espera implícita básica
    
    yield driver # Entrega o driver para o teste
    
    # Teardown: Fecha o navegador depois do teste
    driver.quit()

@pytest.fixture(scope="function")
def usuario_dinamico():
    """Gera um usuário novo para CADA teste executado."""
    return {
        "nome": fake.name(),
        "email": fake.unique.email(), # Garante unicidade
        "senha": fake.password(length=12)
    }