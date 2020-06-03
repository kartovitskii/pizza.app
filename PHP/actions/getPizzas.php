<?
include '../config.php'; 

$pizzas = $link->query("SELECT * FROM `pizzas`");

while($pizza = $pizzas->fetch_assoc()) {
    $out['id'][] = $pizza['id'];
    $out['url'][] = $pizza['url'];
    $out['title'][] = $pizza['title'];
    $out['description'][] = $pizza['description'];
    $out['kkal'][] = $pizza['kkal'];
    $out['sprice'][] = $pizza['sprice'];
    $out['lprice'][] = $pizza['lprice'];
} 

header("Content-Type: text/json; charset=utf-8");
echo json_encode($out);
?>