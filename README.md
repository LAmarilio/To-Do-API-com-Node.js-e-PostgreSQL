# 🧠 To Do API com Node.js e PostgreSQL

API simples para gerenciar tarefas usando Node.js puro e banco de dados PostgreSQL.

---

## 🚀 Funcionalidades

- Listar tarefas (`GET /tarefas`)
- Criar tarefa (`POST /tarefas`)
- Concluir tarefa (`PUT /tarefas/:id/concluir`)
- Excluir tarefa (`DELETE /tarefas/:id`)

---

## 🧱 Tecnologias

- Node.js
- PostgreSQL
- pg (node-postgres)

---

## 📦 Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco PostgreSQL e crie a tabela:
   ```sql
   CREATE TABLE tarefas (
     id SERIAL PRIMARY KEY,
     titulo TEXT NOT NULL,
     concluida BOOLEAN DEFAULT false
   );
   ```

4. No arquivo database.js, ajuste com seus dados:
   ```js
   const client = new Client({
     user: 'postgres',
     host: 'localhost',
     database: 'tarefas',
     password: 'sua_senha',
     port: 5432,
   });
   ```

5. Inicie o servidor:
   ```bash
   node index.js
   ```

---

## 📮 Exemplo de requisição

POST /tarefas
Content-Type: application/json

{
  "titulo": "Estudar Node.js",
  "concluida": false
}
