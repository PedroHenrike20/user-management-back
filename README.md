# 🛠️ NestJS Backend com Docker

Este é um projeto backend desenvolvido com [NestJS](https://nestjs.com/) e banco de dados PostgreSQL. Ele utiliza Docker para facilitar o setup de desenvolvimento e execução.

---

## 📦 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Como rodar o projeto

### 🔗 Opção 1: Usando o Docker Compose geral (frontend + backend + banco)

Se você estiver utilizando a estrutura integrada com `frontend` e `backend`, a estrutura da pasta raiz do projeto deve ser assim:

```text
/nome-da-sua-pasta
├── backend
└── frontend
```

E na raiz da pasta, você deve ter um arquivo docker-compose.yml como este:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    restart: always
    container_name: postgres_db
    environment:
      POSTGRES_USER: name_user_db
      POSTGRES_PASSWORD: password_db
      POSTGRES_DB: name_db
    ports:
      - '5432:5432'
    volumes:
      - db_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
    container_name: backend_service
    ports:
      - '3000:3000'
    depends_on:
      - db
    environment:
      DATABASE_HOST: host_db
      DATABASE_PORT: 5432
      DATABASE_USER: user_db
      DATABASE_PASSWORD: password_db
      DATABASE_NAME: name_db
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run start:dev

  frontend:
    build:
      context: ./frontend
    container_name: frontend_app
    ports:
      - '3001:80'
    depends_on:
      - backend

volumes:
  db_data:
```

Na raiz do projeto, rode:

```bash
docker-compose up --build
```

- Backend estará acessível em: http://localhost:3000

- Documentação Swagger: http://localhost:3000

### 🔗 Opção 2: Rodando apenas o backend isoladamente

### 1. Clone o repositório

```bash
git clone https://github.com/PedroHenrike20/user-manegement-back
cd local-projeto
```

### 2. Configure as variáveis de ambiente

```text
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app_db
PORT=3000
```

### 3. Suba os containers com Docker

```bash
docker-compose up --build
```

A aplicação será exposta em:

http://localhost:3000

### 4. Acesse o Swagger

http://localhost:3000/

## 📝 Observações

- Certifique-se de que o banco de dados esteja acessível (via container ou localmente).

- A porta padrão do backend é 3000, configurável via .env.

- A aplicação utiliza hot-reload em ambiente de desenvolvimento (`npm run start:dev`).
