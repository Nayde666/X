const tweetArea = document.getElementById('tweetArea')
const tweetRespArea = document.getElementById('tweetResponseArea')

const tweetModal = new bootstrap.Modal(document.getElementById('tweetModal'), {
    backdrop: 'static' // Evita cierre de modal al hacer clic por fuera
})

const postModal = new bootstrap.Modal(document.getElementById('postModal'), {
    backdrop: 'static'
})

document.addEventListener('DOMContentLoaded', () => {
    tweetArea.value = ''
    tweetRespArea.value = ''
})

tweetArea.addEventListener('input', () => {
    if(!tweetArea.value.trim())
        tweetArea.setAttribute('placeholder', '¡¿Qué está pasando?!')
    else
        tweetArea.removeAttribute('placeholder')

})

tweetArea.addEventListener('input', () => {
    tweetArea.style.height = 'auto';
    tweetArea.style.height = (this.scrollHeight) + 'px';
    console.log(tweetArea.style.height)
})

tweetRespArea.addEventListener('input', () => {
    if(!tweetRespArea.value.trim())
        tweetRespArea.setAttribute('placeholder', 'Responder post')
    else
        tweetRespArea.removeAttribute('placeholder')

})
