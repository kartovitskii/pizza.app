<?php
$link = mysqli_connect("localhost", "root", "root", "pizza");

if ($link == false){
    print("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());
}
?>