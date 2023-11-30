<?php
  include("../config/conexion.php");
  $conn = conectar();
  $querySelect = "SELECT posts.*, COUNT(comentario.idComentario) 
                  as totalComentarios FROM posts 
                  LEFT JOIN comentario ON posts.idPost = comentario.idPost GROUP BY posts.idPost";
  $posts = mysqli_query($conn, $querySelect);
  $postsArray = [];
  
  if($posts->num_rows >0){
    while($post = mysqli_fetch_array($posts)){
      $postsArray[] = $post;
    }
    echo json_encode(['STATUS' => 'SUCCESS', 'MESSAGE' => $postsArray]);
  } else {
    echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'No existen posts']);
  }
?>
