let loggedUser = {}

const titulo = document.getElementById('userBlog')
const nombre = document.getElementById('userName')
const regresar = document.getElementById('buttonregresar')

//contenedor
const commentContainer = document.getElementById('commentsContainer')
const commentCard = document.getElementById('cardComment').content
const fragment = document.createDocumentFragment()

regresar.addEventListener('click', async (e) => {
    const btnRegresar = e.target.closest('.buttonregresar')
    if(btnRegresar) {
        const urlParams = new URLSearchParams(window.location.search);
        const usuario = urlParams.get('usuario');
        const nuevaURL = `/x/home.html?usuario=${usuario}`
        window.location.replace(nuevaURL);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    loadUser()
    loadComments()
})


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

            titulo.innerHTML = loggedUser.nombre + ' ' + loggedUser.apaterno
            nombre.innerHTML = loggedUser.usuario
        })
    }
    console.log('@@@ usuario => ', usuario)
}

const loadComments = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idPost = urlParams.get('idPost');
    console.log('idPost: ', idPost)
    if (idPost) {
        const comments = await fetch(`./Backend/files/loadComment.php?idPost=${idPost}`);
        try {
            const items = await comments.json();
            console.log('items:', items);
            dibujaComments(items);
        } catch (error) {
            console.error('Error al analizar el JSON de la respuesta:', error);
        }
    } else {
        console.error("idPost no está definido en la URL.");
    }
}

const dibujaComments = (comments)=> {
    commentContainer.innerHTML = ''
    
    comments.forEach((item) => {
        commentCard.querySelector('.nombreusupost').textContent = item.nombreusu_post
        commentCard.querySelector('.idusupost').textContent = item.idUsuario_post
        commentCard.querySelector('.post').textContent = item.mensaje_post
		commentCard.querySelector('.nombreusucomment').textContent = item.nombre
        commentCard.querySelector('.idusucomment').textContent = item.idUsuario
        commentCard.querySelector('.contenidocomentario').textContent = item.comentario
        commentCard.querySelector('.fechacomentario').textContent = item.fecha
        
        const clone = commentCard.cloneNode(true)
        
        fragment.appendChild(clone)
    })
    commentContainer.appendChild(fragment)
}

