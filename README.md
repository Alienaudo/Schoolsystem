
🚀 **Em andamento:** estou desenvolvendo um **Sistema de Gerenciamento Escolar** open-source.

---

 💡 **O que é?**
 Um painel web para controlar as principais operações de uma escola, com foco em três entidades centrais:

 * **Aluno**: cadastro, listagem e atualização de dados acadêmicos
 * **Professor**: gerenciamento de informações e turmas atribuídas
 * **Matéria**: criação de disciplinas, atribuição a professores e acompanhamento do plano de estudos

 🛠️ **Tecnologias**

 * **TypeScript** no back-end e front-end
 * **Node.js** com query builder (Kysely) para acesso a banco de dados relacional
 * **Docker & Docker Compose** para orquestração de containers
 * **Vitest** para testes automatizados
 * **ESLint** e **Prettier** para garantir qualidade de código

 🔄 **Status atual**
 • Implementação das operações CRUD das três entidades principais
 • Configuração de ambiente local com Docker
 • Estrutura de testes unitários iniciada

 📌 **Próximos passos:**

 1. Adicionar autenticação e controle de acesso
 2. Criar dashboard de relatórios de desempenho
 3. Refinar UX/UI e incluir documentação completa

 💬 Estou aceitando sugestões, ideias de funcionalidades e feedback para tornar o projeto ainda mais robusto.

 👉 Confira o código e me acompanhe o desenvolvimento em:
 [https://github.com/Alienaudo/Schoolsystem](https://github.com/Alienaudo/Schoolsystem)

Sinta-se à vontade para ajustar emojis, ênfases ou a ordem dos tópicos para que fique com a sua cara!

## 🧪 Como testar a aplicação

Siga os passos abaixo para executar e testar a aplicação localmente:

### 1. Suba os containers com Docker

Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.

```bash
docker-compose up -d
```

### 2. Execute as migrações no banco de dados

Após os containers estarem em execução, rode as migrações para preparar o banco de dados:

```bash
pnpm migrate:prod latest
```

### 3. Inicie a aplicação

Inicie o servidor em ambiente de produção:

```bash
pnpm start
```

A aplicação deverá estar disponível em `http://localhost:3000` (ou conforme definido na configuração do projeto).

---

## ✅ Rodando os testes

Para executar a suíte de testes da aplicação, use o comando abaixo:

```bash
pnpm test
```

Isso irá rodar os testes utilizando o framework **Vitest**.

---
