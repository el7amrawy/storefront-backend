# Storefront Backend Project

## Ports

### backend --> `3000`

### database --> `7501`

#

## install

```bash
npm i
```

#

## run database on docker

```bash
npm run db
```

## or

## set up database through PSQL terminal

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

#

## run migrations

```bash
npm run migrations
```

#

## build

```bash
npm run build
```

#

## run server

```bash
node ./dist/server
```

## Running Tests

#

### for windows

```bash
  npm run test
```

### for unix/linux

```bash
  npm run test_li
```
