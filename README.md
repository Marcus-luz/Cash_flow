# 💸 Cash Flow

Sistema de gestão financeira desenvolvido para controle de fluxo de caixa, permitindo o gerenciamento centralizado de receitas, despesas, fornecedores e áreas organizacionais.

## 📖 Sobre o Projeto

O **Cash Flow** foi criado para auxiliar no acompanhamento financeiro de uma organização, fornecendo ferramentas para registro, monitoramento e análise de movimentações financeiras. O sistema oferece uma visão consolidada da saúde financeira através de dashboards, relatórios e controles administrativos.

---

## 🚀 Tecnologias Utilizadas

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **PostCSS**
* **shadcn/ui**

### Backend e Banco de Dados

* **Supabase**

  * Autenticação de usuários
  * Banco de dados PostgreSQL
  * API e integração de dados
  * Controle de migrações SQL

### Testes Automatizados

* **Python**
* **Pytest**
* **Page Object Model (POM)**

---

## ✨ Funcionalidades

### 📊 Dashboard

* Visualização consolidada do fluxo de caixa.
* Indicadores financeiros e métricas de desempenho.

### 💰 Gestão Financeira

* Cadastro de receitas.
* Cadastro de despesas.
* Controle e acompanhamento de movimentações financeiras.

### 🏢 Gestão Organizacional

* Cadastro de fornecedores.
* Gerenciamento de propriedades.
* Controle de áreas estruturais.

### 📑 Relatórios e Administração

* Relatórios financeiros.
* Centro gerencial para acompanhamento administrativo.
* Monitoramento de dados estratégicos.

### 🔐 Controle de Acesso

* Autenticação de usuários.
* Rotas protegidas.
* Gerenciamento de sessões.

---

## 🧪 Testes Automatizados

O projeto possui uma suíte de testes automatizados desenvolvida com **Pytest**, seguindo o padrão **Page Object Model (POM)**.

### Cenários Cobertos

* Login de usuários.
* Cadastro de usuários.
* Fluxos de autenticação.
* Validação de elementos da interface.

Estrutura principal:

```text
test/
├── conftest.py
├── base_page.py
├── login_page.py
├── register_page.py
├── test_login.py
└── test_cadastro.py
```

---

## 📁 Estrutura do Projeto

```text
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
├── context/         # Contextos globais da aplicação
├── hooks/           # Custom Hooks
├── integrations/    # Integrações externas
├── pages/           # Páginas da aplicação
└── main.tsx

supabase/
├── migrations/      # Migrações do banco de dados

test/
├── Testes automatizados em Python
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos

* Node.js 18+
* npm ou Bun
* Python 3.10+

### Clone o repositório

```bash
git clone <url-do-repositorio>
cd cash-flow
```

### Instale as dependências

```bash
npm install
```

ou

```bash
bun install
```

### Execute a aplicação

```bash
npm run dev
```

ou

```bash
bun dev
```

### Executar os testes

```bash
pytest
```

---

## 📌 Principais Diferenciais

* Interface moderna e responsiva.
* Autenticação segura com Supabase.
* Dashboard financeiro com métricas em tempo real.
* Arquitetura modular baseada em componentes.
* Testes automatizados utilizando Page Object Model.
* Banco de dados versionado através de migrações SQL.

---

