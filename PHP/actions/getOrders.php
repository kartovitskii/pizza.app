<?
include '../config.php'; 

$number = $_POST['number'];


$orders = $link->query("SELECT * FROM `orders` WHERE `phone` = '$number'");

        while($order = $orders->fetch_assoc()) {
            $out['uoroder'][] = $order['uorder'];
        } 

        header("Content-Type: text/json; charset=utf-8");
        echo json_encode($out);