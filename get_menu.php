<?php

// Database connection parameters
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "menudb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$preference = $_GET['preference'];
$spicy = $_GET['spicy'];
$diet = isset($_GET['diet']) ? $_GET['diet'] : '';
$budget = $_GET['budget'];
$occasion = isset($_GET['occasion']) ? $_GET['occasion'] : '';

// Prepare SQL statement
$sql = "SELECT option_name FROM menu_options WHERE preference_id = ? AND spicy = ?";

// Append additional conditions based on user input
if ($diet !== '') {
    $sql .= " AND diet = '$diet'";
}
if ($budget !== '') {
    $sql .= " AND budget = '$budget'";
}
if ($occasion !== '') {
    $sql .= " AND occasion = '$occasion'";
}

$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $preference, $spicy);
$stmt->execute();
$result = $stmt->get_result();

// Fetch menu options from database
$menuOptions = array();
while ($row = $result->fetch_assoc()) {
    $menuOptions[] = $row['option_name'];
}

// Return menu options as JSON
echo json_encode($menuOptions);

// Close connection
$stmt->close();
$conn->close();

?>
