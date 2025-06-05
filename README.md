# API de Gerenciamento de Usuários

Uma API RESTful simples para gerenciamento de usuários e autenticação, construída com NestJS.

---

## 🚀 Primeiros Passos

1. **Clone o repositório**
2. **Instale as dependências**

   ```powershell
   npm install
   ```

3. **Configure seu ambiente**

   Crie um arquivo `.env` com as configurações do banco de dados e JWT:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=seu_usuario_db
   DB_PASSWORD=sua_senha_db
   DB_DATABASE=nome_do_banco
   JWT_SECRET=sua_chave_jwt
   ```

4. **Execute a aplicação**

   ```powershell
   npm run start:dev
   ```

   A API estará disponível em: [http://localhost:8000](http://localhost:8000)

   Documentação Swagger: [http://localhost:8000/api](http://localhost:8000/api)

---

## 🛠️ Principais Endpoints & Exemplos

### Autenticação

#### Registrar

```
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

#### Login

```
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

_Resposta:_

```
{
  "access_token": "...",
  "user": { ... }
}
```

---

### Usuários

#### Criar Usuário (público)

```
POST /users
Content-Type: application/json

{
  "name": "Maria Souza",
  "email": "maria@email.com",
  "password": "senha123"
}
```

#### Listar Todos os Usuários (apenas admin)

```
GET /users
Authorization: Bearer <access_token>
```

#### Buscar Perfil do Usuário Atual

```
GET /users/profile
Authorization: Bearer <access_token>
```

#### Atualizar Perfil do Usuário Atual

```
PATCH /users/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Maria Atualizada"
}
```

#### Buscar Usuário por ID (apenas admin)

```
GET /users/{id}
Authorization: Bearer <access_token>
```

#### Atualizar Usuário por ID (apenas admin)

```
PATCH /users/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Novo Nome"
}
```

#### Deletar Usuário por ID (apenas admin)

```
DELETE /users/{id}
Authorization: Bearer <access_token>
```

#### Listar Usuários Inativos (apenas admin)

```
GET /users/inactive
Authorization: Bearer <access_token>
```

---

## 📖 Documentação da API

Acesse a documentação interativa em: [http://localhost:8000/api](http://localhost:8000/api)

---

Sinta-se à vontade para contribuir ou abrir issues!
