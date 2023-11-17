let loggedUser = {}
const titulo = document.getElementById('userBlog')
const postContainer = document.getElementById('postUsuarios')
const postCard = document.getElementById('cardPost').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    loadUser()
    loadPost()
    loadUser2()
})

const loadPost = async () => {
    const posts = await fetch('./Backend/files/loadPost.php')
    //console.log('@@@ posts =>', await posts.json())
    const items = await posts.json()
    dibujaPosts(items.MESSAGE)
}

const dibujaPosts = posts => {
    postContainer.innerHTML = ''
    posts.forEach((item) => {
        postCard.querySelector('.card-title').textContent = item.titulo
        postCard.querySelector('.card-subtitle').textContent = item.idUsuario
        postCard.querySelector('.card-text').textContent = item.mensaje
        postCard.querySelector('.fecha').textContent = item.fecha
        const clone = postCard.cloneNode(true)
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
            //const inputIdUser2 = document.getElementById('idUsuario2')
            //inputIdUser2.value = loggedUser.usuario
            titulo.innerHTML = loggedUser.nombre + ' ' + loggedUser.apaterno + ' ' +'Blogs'
            //console.log('@@@ response =>', loggedUser)
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
            const user = await response.json()
            loggedUser = user.MESSAGE
            const inputIdUser = document.getElementById('idUsuario2')
            inputIdUser.value = loggedUser.usuario
        })
    }
    console.log('@@@ usuario => ', usuario)
}

