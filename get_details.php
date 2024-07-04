<?php
// db.phpをインクルード
require 'db.php';

// リクエストが正しいかチェック
if (!isset($_GET['name'])) {
    echo json_encode(["error" => "Invalid request"]);
    exit();
}

// 名前を取得
$name = $_GET['name'];

// デバッグメッセージ
error_log("Received name: " . $name);

// SQLクエリを実行して、指定された名前を持つ最新のレコードを取得
$sql = "SELECT * FROM characters WHERE name = :name ORDER BY id DESC LIMIT 1";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':name', $name, PDO::PARAM_STR);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// レコードが存在するかチェック
if ($result) {
    echo json_encode($result);
} else {
    echo json_encode(["error" => "Character not found"]);
}
?>