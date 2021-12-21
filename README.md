## Description
прототип API каталога товаров.

Основные компоненты:
* NestJS
* TypeOrm
* NestJS Crud example
* Swagger (документация методов API)

## Installation
1. установить зависимости
```bash
$ npm install
```

2. запусть mysql
```bash
$  sudo docker-compose up -d
```

3.  выполнить миграции
```bash
$ npm run migration:run
```
4.  Тестовый пользователь для получения jwt token (`/auth/login`)
``` 
  "email": "admin@example.com",
  "password": "0000"
```

## ABOUT

Этот проект служит для демонстрации работы с фреймворком NestJS  в node. 

swagger ui здесь
```
/api/docs
```

работа с NestJS Crud
```
/product:
product.crud.controller 
product.crud.service 
```

пользовательские обработчики для сущностей в NestJS
```
/product:
product.custom.controller 
product.custom.service 
```

## SETTINGS

Конфиг приложения в `.env`

```
# Порт приложения
API_PORT=3000

# Время кеша для некоторых запросов 
CACHE=60000

# настройки JWT токена
JWT_SECRET=THIS_IS_SUPER_SECRET_JWT_KEY
JWT_EXPIRES=36000

# настройки коннекта к БД
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 127.0.0.1
TYPEORM_USERNAME = user
TYPEORM_PASSWORD = password
TYPEORM_DATABASE = product_db
TYPEORM_PORT = 3306
TYPEORM_SYNCHRONIZE = false
TYPEORM_LOGGING = true
TYPEORM_ENTITIES=dist/**/entities/*.entity.js
TYPEORM_ENTITIES_DIR=src/**/**/entities/*.entity.ts
TYPEORM_MIGRATIONS=dist/database/migrations/*.js
TYPEORM_MIGRATIONS_DIR=src/database/migrations

```
