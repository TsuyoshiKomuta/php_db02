<?php
require 'db.php';

// // 送信されたデータを確認
// var_dump($_POST);
// exit();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $address = $_POST['address'];
    $birth_date = $_POST['birth_date'];
    $death_date = $_POST['death_date'] ? $_POST['death_date'] : NULL;
    $land = $_POST['land'] ? $_POST['land'] : NULL;
    $building = $_POST['building'] ? $_POST['building'] : NULL;
    $money = $_POST['money'] ? $_POST['money'] : NULL;

    // 受け取ったデータをログに出力
    error_log("Name: $name, Address: $address, Birth Date: $birth_date, Death Date: $death_date, Land: $land, Building: $building, Money: $money");


    $stmt = $pdo->prepare("INSERT INTO characters (name, address, birth_date, death_date, land, building, money) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $address, $birth_date, $death_date, $land, $building, $money]);

    echo 'データが保存されました。';
}
