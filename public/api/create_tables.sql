-- SQL для создания таблиц в MySQL
-- Выполните эти команды в вашей базе данных

-- Таблица для контактных заявок
CREATE TABLE IF NOT EXISTS contact_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для заявок на тарифы
CREATE TABLE IF NOT EXISTS tariff_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    tariff_name VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_contact_created_at ON contact_applications(created_at);
CREATE INDEX idx_tariff_created_at ON tariff_applications(created_at);
CREATE INDEX idx_tariff_name ON tariff_applications(tariff_name);