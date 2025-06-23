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

### 1. Clone o repositório

```bash
git clone https://github.com/PedroHenrike20/user-manegement-back
cd local-projeto
```

### 2. Configure as variáveis de ambiente

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app_db

PORT=3000

### 3. Suba os containers com Docker

```bash
docker-compose up --build
```

A aplicação será exposta em:

http://localhost:3000

### 4. Acesse o Swagger

http://localhost:3000/api
