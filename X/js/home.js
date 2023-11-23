let loggedUser = {}

const titulo = document.getElementById('userBlog')
const nombre = document.getElementById('userName')
const postContainer = document.getElementById('postUsuarios')
const postCard = document.getElementById('cardPost').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    loadUser()
    loadPost()
    loadUser2()
})

postContainer.addEventListener('click', async (e) => {
    const btnComment = e.target.closest('.btn-comment')
    if (btnComment) {
      const idPost = btnComment.getAttribute('data-idpost')
      document.getElementById('commentPostId').value = idPost

      //const usuario = btnComment.getAttribute('data-usuario')
      //document.getElementById('idUsuario2').value = usuario
      
      const mensaje = btnComment.getAttribute('data-mensaje')
      document.getElementById('commentText').value = mensaje

      const commentModal = new bootstrap.Modal(document.getElementById('commentModal'))
      commentModal.show();
    }
});

const loadPost = async () => {
    const posts = await fetch('./Backend/files/loadPost.php')
    //console.log('@@@ posts =>', await posts.json())
    const items = await posts.json()
    dibujaPosts(items.MESSAGE)
}

const dibujaPosts = (posts)=> {
    postContainer.innerHTML = ''
    
    posts.forEach((item) => {
        postCard.querySelector('.card-title').textContent = item.titulo
        postCard.querySelector('.card-subtitle').textContent = item.idUsuario
        postCard.querySelector('.card-text').textContent = item.mensaje
        //postCard.querySelector('.commentText').textContent = item.mensaje
        postCard.querySelector('.fecha').textContent = item.fecha

        const clone = postCard.cloneNode(true)
        const btnComment = clone.querySelector('.btn-comment');
        btnComment.setAttribute('data-idpost', item.idPost);
        btnComment.setAttribute('data-mensaje', item.mensaje);
        //btnComment.setAttribute('data-idusuario', item.idUsuario);

        fragment.appendChild(clone)
    })
    postContainer.appendChild(fragment)
}

const loadUser  = () => {
    const url = window.location.search
    const params = new URLSearchParams(url)
    const usuario = params.get('usuario')
    if(usuario){
        const sendData = {
            usuario
        }
        fetch('./Backend/files/home.php',{
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( async (response) => {
            const user = await response.json()
            loggedUser = user.MESSAGE
            const inputIdUser = document.getElementById('idUsuario')
            inputIdUser.value = loggedUser.usuario
            titulo.innerHTML = loggedUser.nombre + ' ' + loggedUser.apaterno
            nombre.innerHTML = loggedUser.usuario
        })
    }
    console.log('@@@ usuario => ', usuario)
}

const loadUser2  = () => {
    const url = window.location.search
    const params = new URLSearchParams(url)
    const usuario = params.get('usuario')
    if(usuario){
        const sendData = {
            usuario
        }
        fetch('./Backend/files/home.php',{
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( async (response) => {
            console.log('Respuesta de fetch:', response);
            const user =    await response.json()
            loggedUser2 = user.MESSAGE
            console.log('Valor de loggedUser2.usuario:', loggedUser2.usuario);
            // Obtener todos los elementos con el id 'idUsuario2'
            const inputIdUsuarios = document.querySelectorAll('#idUsuario2');
            if (inputIdUsuarios.length > 0){
                // asignación del valores
                console.log('Numero de elementos encontrados:', inputIdUsuarios.length);
                inputIdUsuarios.forEach((inputIdUser) => {
                inputIdUser.value = loggedUser2.usuario;
            });
            } else {
                console.error('No se encontraron elementos con el id "idUsuario2"');
            }  
            const inputIdUser = document.getElementById('idUsuario2')
            inputIdUser.value = loggedUser2.usuario
        })
    }
    console.log('@@@ usuario => ', usuario)
}



