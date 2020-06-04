<?
include '../config.php'; 

$additives = $link->query("SELECT * FROM `additives`");

while($add = $additives->fetch_assoc()) {
    $out['id'][] = $add['id'];
    $out['url'][] = $add['url'];
    $out['title'][] = $add['title'];
    $out['price'][] = $add['price'];
} 

header("Content-Type: text/json; charset=utf-8");
echo json_encode($out);
?>