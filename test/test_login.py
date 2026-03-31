import pytest
from login_page import LoginPage

def test_login_com_sucesso(driver):
    # 1. Preparação
    pagina_login = LoginPage(driver)
    pagina_login.abrir()

    # 2. Ação
    print("Tentando logar...")
    pagina_login.realizar_login("admin@seac.com", "senha123")

    # 3. Validação (Sem screenshot)
    # A função validar_login_sucesso retorna True se achou o Dashboard
    assert pagina_login.validar_login_sucesso() == True, "Erro: O dashboard não apareceu."