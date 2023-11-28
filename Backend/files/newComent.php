<?php
   include("../config/conexion.php");
   $conn = conectar();
   $idPost = $_POST['idPost'];
   $idUsuario = $_POST['idUsuario-Comment'];
   $comentario = $_POST['comentario'];
   $fecha = date("Y-m-d");
   $nombre = $_POST['nombre'];

   $queryInsert = "INSERT INTO comentario VALUES(null,'$idPost', '$idUsuario', '$comentario', '$fecha', '$nombre')";
   $result = mysqli_query($conn, $queryInsert);

   if($result){
    echo json_encode(['STATUS' => 'SUCCESS', 'MESSAGE' => 'Comentario registrado']);
    Header("Location: ../../home.html?usuario=".$idUsuario);
   } else {
    echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'Comentario no registrado']);
   }
?>
