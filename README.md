# Storefront Backend Project

## Ports

### backend --> `3000`

### database --> `5432`

## install

```bash
npm i
```

## run database on docker

```bash
npm run db
```

### or

### set up database through PSQL terminal

### 1. create user

```bash
  CREATE USER dev_user WITH PASSWORD 'pass321pass';
```

### 2. create databases

```bash
  CREATE DATABASE dev_db;
```

### 3. grant privileges

```bash
  GRANT ALL PRIVILEGES ON DATABASE dev_db TO dev_user;
```

## run migrations

```bash
npm run migration
```

## build

```bash
npm run build
```

## run server

```bash
node ./dist/server
```

## Running Tests

### for windows

```bash
  npm run test
```

### for unix/linux

```bash
  npm run test_li
```

## environment variables

POSTGRES_HOST=localhost

POSTGRES_DB=dev_db

POSTGRES_USER=dev_user

POSTGRES_PASSWORD=pass321pass

POSTGRES_PORT=5432

BCRYPT_PASSWORD=bnmjkdshj

SALT_ROUNDS=9

TOKEN_SECRET=nmbmahshvdv

ENV=dev

POSTGRES_TEST_DB=test_db
