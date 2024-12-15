<?php

$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'myself';

$connect = mysqli_connect($hostname, $username, $password, $database);

if (!$connect) {
    die("Error: " . mysqli_connect_error());
}
else {
    mysqli_set_charset($connect, 'utf8');
    echo "Connected successfully!";
}

?>