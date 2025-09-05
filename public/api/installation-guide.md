# Инструкция по установке API для MySQL

## Что создано для вас:

1. **config.php** - конфигурация подключения к базе данных
2. **create_tables.sql** - SQL команды для создания таблиц
3. **save-contact.php** - API для сохранения контактных заявок
4. **save-tariff.php** - API для сохранения заявок на тарифы

## Пошаговая настройка:

### Шаг 1: Настройте базу данных
Откройте файл `config.php` и замените настройки:
```php
define('DB_HOST', 'localhost'); // ваш MySQL хост
define('DB_NAME', 'your_database_name'); // название вашей БД
define('DB_USER', 'your_username'); // имя пользователя MySQL
define('DB_PASS', 'your_password'); // пароль MySQL
```

### Шаг 2: Создайте таблицы
Выполните SQL команды из файла `create_tables.sql` в вашей MySQL базе данных.

### Шаг 3: Загрузите файлы на хостинг
Все файлы из папки `public/api/` должны быть доступны по URL:
- yoursite.com/api/config.php
- yoursite.com/api/save-contact.php  
- yoursite.com/api/save-tariff.php

### Шаг 4: Проверьте работу
Теперь формы на сайте будут отправлять данные в вашу MySQL базу данных!