<?
include '../config.php'; 

$phone = trim($_POST['num']);
$uorder = $_POST['textOrder'];

$uorder = json_encode($uorder);

if($phone && $uorder) {
    $link->query("INSERT INTO `orders` VALUES(NULL, '$phone', '$uorder')");
}

?>