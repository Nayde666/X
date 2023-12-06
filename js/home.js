let loggedUser = {}

const userName = document.getElementById('userName')
const userTag = document.getElementById('userTag')

const btnPostMain = document.getElementById('btnPostMain')
const btnPost = document.getElementById('btnPost')
const btnComment = document.getElementById('btnComment')

const tweetMain = document.getElementById('tweetMain')
const tweetArea = document.getElementById('tweetArea')
const tweetRespArea = document.getElementById('tweetResponseArea')

const postContainer = document.getElementById('usersPosts')
const postCard = document.getElementById('postCard').content
const fragment = document.createDocumentFragment()



const tweetModal = new bootstrap.Modal(document.getElementById('tweetModal'), {
    backdrop: 'static' // Evita cierre de modal al hacer clic por fuera
})

const postModal = new bootstrap.Modal(document.getElementById('postModal'), {
    backdrop: 'static'
})

document.addEventListener('DOMContentLoaded', () => {
    tweetMain.value = ''
    tweetArea.value = ''
    tweetRespArea.value = ''

    loadUser()
    loadPost()
})

tweetMain.addEventListener('input', () => {
    let isEmpty = false

    if(!tweetMain.value.trim()){
        tweetMain.setAttribute('placeholder', '¡¿Qué está pasando?!')
        isEmpty = true 
    }
    else{
        tweetMain.removeAttribute('placeholder')
    }
    
    btnPost.disabled = isEmpty

})

tweetArea.addEventListener('input', () => {
    let isEmpty = false

    if(!tweetArea.value.trim()){
        tweetArea.setAttribute('placeholder', '¡¿Qué está pasando?!')
        isEmpty = true 
    }
    else{
        tweetArea.removeAttribute('placeholder')
    }
    
    btnPost.disabled = isEmpty

})

tweetArea.addEventListener('input', () => {
    tweetArea.style.height = 'auto';
    tweetArea.style.height = (this.scrollHeight) + 'px';
    console.log(tweetArea.style.height)
})

tweetRespArea.addEventListener('input', () => {
    let isEmpty = false

    if(!tweetRespArea.value.trim()){
        tweetRespArea.setAttribute('placeholder', 'Responder post')
        isEmpty = true
    }
    else{
        tweetRespArea.removeAttribute('placeholder')
    }

    btnComment.disabled = isEmpty

})

postContainer.addEventListener('click', async (e) => {
    const btnResponse = e.target.closest('.btn-response')

    if(btnResponse){
        const postId = btnResponse.getAttribute('data-idpost')
        document.getElementById('commentPostId').value = postId
        
        const nombre = btnComment.getAttribute('data-nombreusuario')
        document.getElementById('postUsername').textContent = nombre

        const usuarioPostId = btnComment.getAttribute('data-idUsuario')
        document.getElementById('postUserId').textContent = usuarioPostId

        const mensaje = btnComment.getAttribute('data-mensaje')
        document.getElementById('postContent').textContent = mensaje

	    const usuarioCommentId = document.getElementById('idUsuario-Comment')
	    usuarioCommentId.value = loggedUser.usuario

        const nombreUsuario = document.getElementById('nombreUsuario-Comment')
        nombreUsuario.value = loggedUser.nombre
    }

    const loadComment = e.target.closest('.card-text')
    if (loadComment){
        const idPost = buttonloadComment.getAttribute('data-idpost')
        const urlParams = new URLSearchParams(window.location.search)
        const usuario = urlParams.get('usuario')
        const newURL = `/x/loadcomment.html?usuario=${usuario}&idPost=${idPost}`
        window.location.replace(newURL)
    }
})


const loadPost = async () => {
    const posts = await fetch('./Backend/files/loadPost.php')
    const items = await posts.json()
    //console.log('@@@ posts =>', await posts.json())
    drawPosts(items.MESSAGE)
}

const drawPosts = (posts) => {
    postContainer.innerHTML = ''
    
    posts.forEach((item) => {
		postCard.querySelector('.user-name').textContent = item.nombre
        postCard.querySelector('.user-tag').textContent = item.idUsuario
        postCard.querySelector('.card-text').textContent = item.mensaje
        postCard.querySelector('.post-date').textContent = item.fecha

        const numResponses = postCard.querySelector('.responses-number')
        numResponses.textContent = `${item.totalComentarios}`
        const clone = postCard.cloneNode(true)

        
        const btnResponse = clone.querySelector('.btn-response')
        btnResponse.setAttribute('data-idpost', item.idPost)
        btnResponse.setAttribute('data-nombreusuario', item.nombre)
        btnResponse.setAttribute('data-idUsuario', item.idUsuario)
        btnResponse.setAttribute('data-mensaje', item.mensaje)
        
        const loadComment = clone.querySelector('.card-text')
        
        if(loadComment){
            loadComment.setAttribute('data-idpost', item.idPost)
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

		    const inputName = document.getElementById('nombre')
			inputName.value = loggedUser.nombre

            userName.innerHTML = loggedUser.nombre + ' ' + loggedUser.apaterno
            userTag.innerHTML = loggedUser.usuario
        })
    }
    console.log('@@@ usuario => ', usuario)
}
