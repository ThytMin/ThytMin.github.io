<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();
$token = $headers['Authorization'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Verify token
        $stmt = $pdo->prepare("SELECT id FROM users WHERE token = ? AND token_expires > NOW()");
        $stmt->execute([$token]);
        $user = $stmt->fetch();
        
        if (!$user) {
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            exit;
        }
        
        $stmt = $pdo->prepare("INSERT INTO bookings 
            (user_id, staff_id, service_id, start_date, end_date, notes, total_price, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')");
        
        $stmt->execute([
            $user['id'],
            $data['staffId'],
            $data['serviceId'],
            $data['startDate'],
            $data['endDate'],
            $data['notes'],
            $data['totalPrice']
        ]);
        
        echo json_encode(['success' => true, 'bookingId' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
