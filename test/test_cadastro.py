import pytest
from register_page import RegisterPage

def test_novo_usuario_deve_conseguir_se_cadastrar(driver, usuario_dinamico):
    # 1. Instancia a página passando o driver configurado no conftest
    pagina_cadastro = RegisterPage(driver)
    
    # 2. Ação
    pagina_cadastro.abrir()
    
    # Aqui usamos os dados gerados pelo Faker na fixture
    print(f"Cadastrando: {usuario_dinamico['email']}") 
    
    pagina_cadastro.preencher_formulario(
        nome=usuario_dinamico['nome'],
        email=usuario_dinamico['email'],
        senha=usuario_dinamico['senha']
    )
    pagina_cadastro.submeter_cadastro()

    # 3. Assert (Validação)
    msg = pagina_cadastro.obter_mensagem_sucesso()
    assert "bem-vindo" in msg.lower() or "sucesso" in msg.lower()

    if __name__ == "__main__":
        test_realizar_cadastro_sucesso()