let loggedUser = {}

const titulo = document.getElementById('userBlog')
const nombre = document.getElementById('userName')
const postContainer = document.getElementById('postUsuarios')

const postCard = document.getElementById('cardPost').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    loadUser()
    loadPost()
})

postContainer.addEventListener('click', async (e) => {
    const btnComment = e.target.closest('.btn-comment')
    
    if (btnComment) {
      const idPost = btnComment.getAttribute('data-idpost')
      document.getElementById('commentPostId').value = idPost
    
	  const idUsuarioComment = document.getElementById('idUsuario-Comment')
	  idUsuarioComment.value = loggedUser.usuario

      const inputnombre = document.getElementById('nombreUsuario-Comment')
      inputnombre.value = loggedUser.nombre

    }

    const buttonloadComment = e.target.closest('.buttonloadComment')
    if (buttonloadComment){
        const idPost = buttonloadComment.getAttribute('data-idpost')
        const urlParams = new URLSearchParams(window.location.search);
        const usuario = urlParams.get('usuario');
        const nuevaURL = `/x/loadcomment.html?usuario=${usuario}&idPost=${idPost}`;
        window.location.replace(nuevaURL);
    }
})

const loadPost = async () => {
    const posts = await fetch('./Backend/files/loadPost.php')
    //console.log('@@@ posts =>', await posts.json())
    const items = await posts.json()
    dibujaPosts(items.MESSAGE)
}

const dibujaPosts = (posts)=> {
    postContainer.innerHTML = ''
    
    posts.forEach((item) => {
		postCard.querySelector('.userNamePost').textContent = item.nombre
        postCard.querySelector('.card-subtitle').textContent = item.idUsuario
        postCard.querySelector('.card-text').textContent = item.mensaje
        postCard.querySelector('.fecha').textContent = item.fecha

        const posttexto= postCard.querySelector('.contenidodelpost')
        posttexto.textContent = item.mensaje

        const postnombre= postCard.querySelector('.nombreusuariopost')
        postnombre.textContent = item.nombre

        const postidusuario= postCard.querySelector('.idusuariopost')
        postidusuario.textContent = item.idUsuario

        const comentariosParrafo = postCard.querySelector('.comentarios-parrafo')
        comentariosParrafo.textContent = `Comentarios: ${item.totalComentarios}`
        const clone = postCard.cloneNode(true)

        const btnComment = clone.querySelector('.btn-comment')
        btnComment.setAttribute('data-idpost', item.idPost)
        btnComment.setAttribute('data-mensaje', item.mensaje)
        
        const buttonloadComment = clone.querySelector('.buttonloadComment')
        if(buttonloadComment){
            buttonloadComment.setAttribute('data-idpost', item.idPost)
        }
        
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

		    const inputnombre = document.getElementById('nombre')
			inputnombre.value = loggedUser.nombre

            titulo.innerHTML = loggedUser.nombre + ' ' + loggedUser.apaterno
            nombre.innerHTML = loggedUser.usuario
        })
    }
    console.log('@@@ usuario => ', usuario)
}



