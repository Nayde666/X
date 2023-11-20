<?php
  include("../config/conexion.php");
  $conn = conectar();
  //Nombres como los tnemos en el formulario html en name
  $nombre = $_POST['nombre'];
  $apaterno = $_POST['apaterno'];
  $amaterno = $_POST['amaterno'];
  $usuario = $_POST['usuario'];
  $password = $_POST['password']; 
  // Verificar que el ususario exista 
  $queryVerifica = " SELECT * from usuarios WHERE usuario = '$usuario' ";
  $validaCorreo  = mysqli_query($conn, $queryVerifica);
  //echo $validaCorreo;
  //die;
  if ($validaCorreo->num_rows == 0) {
    // Usuario no existe
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);
    $queryInsert = "INSERT INTO usuarios
      VALUES(null, '$nombre', '$apaterno', '$amaterno', '$usuario', '$passwordHash')";
    $result = mysqli_query($conn, $queryInsert);
    if($result) {
      Header("Location: ../../index.html");
    } else {
      Header("Location: ../../registrar.html?error=true");
    }
  } else {
    // Usuario existe
    Header("Location: ../../registrar.html?existe=true");
  }
  
 
?>