<?php
   include("../config/conexion.php");
   $conn = conectar();
   $idUsuario = $_POST['idUsuario'];
   $mensaje = $_POST['mensaje'];
   $reaccion = 0;
   $fecha = date("Y-m-d");
   $nombre = $_POST['nombre'];

   $queryInsert = "INSERT INTO posts VALUES(null,'$idUsuario', '$mensaje', '$fecha', '$reaccion', '$nombre')";
   $result = mysqli_query($conn, $queryInsert);

   if($result){
    echo json_encode(['STATUS' => 'SUCCESS', 'MESSAGE' => 'Post registrado']);
    Header("Location: ../../home.html?usuario=".$idUsuario);
   } else {
    echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'Post no registrado']);
   }
?>
