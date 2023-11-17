<?php
  include("../config/conexion.php");
  $conn = conectar();
  $dataPost = file_get_contents('php://input');
  $body = json_decode($dataPost, true);
  if($body !== null) {
    

    $usuario = $body['usuario'];
    $password = $body['password'];

    $queryUsuario = "SELECT * FROM usuarios WHERE usuario='$usuario'";
    $validaUsuario = mysqli_query($conn, $queryUsuario);

    if($validaUsuario->num_rows > 0){
        $usuario = $validaUsuario->fetch_assoc();
        if (password_verify($password, $usuario['password'])) {
          echo json_encode(['STATUS' => 'SUCCESS', 'MESSAGE' => 'Success','USUARIO' => $usuario]);
        }else{
          echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'Contraseñas no coinciden']);
        }
        //echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => $usuario]);
    }else {
      echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'No se encontro usuario']);
    }
  } else {
    http_response_code(400);
    echo 'Invalid Data';
  }
?>