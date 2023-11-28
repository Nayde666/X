<?php
include("../config/conexion.php");
$conn = conectar();
$idPost = $_GET['idPost'];

$querySelect = "SELECT comentario.*, posts.mensaje AS mensaje_post, 
                                     posts.nombre AS nombreusu_post, 
                                     posts.idUsuario AS idUsuario_post FROM comentario 
                                     JOIN posts ON comentario.idPost = posts.idPost WHERE 
                                     comentario.idPost = $idPost";

$result = mysqli_query($conn, $querySelect);

if ($result) {
    $comments = mysqli_fetch_all($result, MYSQLI_ASSOC);
    header('Content-Type: application/json'); 
    echo json_encode($comments);
} else {
    echo json_encode(['error' => 'Error en la consulta']);
}
?>