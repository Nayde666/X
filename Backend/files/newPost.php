<?php
   include("../config/conexion.php");
   $conn = conectar();
   $idUsuario = $_POST['idUsuario'];
   $titulo = $_POST['titulo'];
   $mensaje = $_POST['mensaje'];
   $reaccion = 0;
   $fecha = date("Y-m-d");

   $queryInsert = "INSERT INTO posts VALUES(null,'$idUsuario', '$titulo', '$mensaje', '$fecha', '$reaccion' )";
   $result = mysqli_query($conn, $queryInsert);

   if($result){
    echo json_encode(['STATUS' => 'SUCCESS', 'MESSAGE' => 'Post registrado']);
    Header("Location: ../../home.html?usuario=".$idUsuario);
   } else {
    echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'Post no registrado']);
   }
?>
