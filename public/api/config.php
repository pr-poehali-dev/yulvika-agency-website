<?php
// Конфигурация базы данных
// ВНИМАНИЕ: Замените эти данные на ваши реальные настройки MySQL

define('DB_HOST', 'localhost'); // или IP вашего сервера MySQL
define('DB_NAME', 'your_database_name'); // название вашей базы данных
define('DB_USER', 'your_username'); // имя пользователя MySQL
define('DB_PASS', 'your_password'); // пароль MySQL

// Подключение к базе данных
function getDbConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}
?>