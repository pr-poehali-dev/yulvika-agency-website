<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Получаем данные из POST запроса
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON data');
    }
    
    // Валидация обязательных полей
    if (empty($input['name']) || empty($input['phone']) || empty($input['tariffName'])) {
        throw new Exception('Name, phone and tariff name are required fields');
    }
    
    $pdo = getDbConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }
    
    // Подготавливаем SQL запрос
    $sql = "INSERT INTO tariff_applications (name, phone, email, tariff_name, message) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    
    // Выполняем запрос
    $result = $stmt->execute([
        trim($input['name']),
        trim($input['phone']),
        isset($input['email']) ? trim($input['email']) : null,
        trim($input['tariffName']),
        isset($input['message']) ? trim($input['message']) : null
    ]);
    
    if ($result) {
        $applicationId = $pdo->lastInsertId();
        echo json_encode([
            'success' => true,
            'message' => 'Tariff application saved successfully',
            'id' => $applicationId
        ]);
    } else {
        throw new Exception('Failed to save tariff application');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
    error_log("Tariff form error: " . $e->getMessage());
}
?>