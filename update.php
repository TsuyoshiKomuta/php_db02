<?php
require 'db.php';

// // 送信されたデータを確認
// var_dump($_POST);
// exit;

$id = $_POST['id'];
$name = $_POST['name'];
$address = $_POST['address'];
$birth_date = $_POST['birth_date'];
$death_date = $_POST['death_date'];
$land = $_POST['land'];
$building = $_POST['building'];
$money = $_POST['money'];

// デバッグ用にログ出力
error_log("ID: $id");
error_log("Name: $name");
error_log("Address: $address");
error_log("Birth Date: $birth_date");
error_log("Death Date: $death_date");
error_log("Land: $land");
error_log("Building: $building");
error_log("Money: $money");

$sql = "UPDATE characters SET name = ?, address = ?, birth_date = ?, death_date = ?, land = ?, building = ?, money = ? WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $address, $birth_date, $death_date, $land, $building, $money, $id]);

// 更新された行数を取得
$affectedRows = $stmt->rowCount();

echo json_encode([
    'message' => 'データが更新されました。',
    'affectedRows' => $affectedRows,
    'id' => $id
]);
?>