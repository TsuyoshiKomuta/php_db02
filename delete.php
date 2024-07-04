<?php
require 'db.php';

$id = $_POST['id'];

$sql = "DELETE FROM characters WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

echo "データが削除されました。";
