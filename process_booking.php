<?php
header('Content-Type: application/json');

// Simulasikan database
$bookings = [];
$file = 'bookings.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validasi
    if (empty($input['staff_id']) || empty($input['service_id'])) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
        exit;
    }
    
    // Simpan ke "database"
    if (file_exists($file)) {
        $bookings = json_decode(file_get_contents($file), true);
    }
    
    $booking = [
        'id' => uniqid(),
        'client_id' => 'client_123', // Ini nanti diganti dengan session login
        'staff_id' => $input['staff_id'],
        'service_id' => $input['service_id'],
        'start_date' => $input['start_date'],
        'end_date' => $input['end_date'],
        'notes' => $input['notes'],
        'total_price' => $input['total_price'],
        'status' => 'pending',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    $bookings[] = $booking;
    file_put_contents($file, json_encode($bookings));
    
    echo json_encode(['success' => true, 'message' => 'Booking berhasil']);
} else {
    echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan']);
}
?>
