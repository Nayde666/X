const formInputs = document.querySelectorAll('.form-control')

 

const btnSignin = document.getElementById('btnSignin')
const btnLogin = document.getElementById('btnLogin')

document.addEventListener('DOMContentLoaded', () => {
    formInputs.forEach(item => {
        item.value = ''
    })
})

nameInput.addEventListener('input', () => {
    const currentChars = nameInput.value.length
    const charLimit = nameInput.getAttribute('maxlength')

    console.log(currentChars)
})

btnLogin.addEventListener('click', () => {
    const usuario = document.getElementById('usuario')
    const password = document.getElementById('password')

    if(usuario.value.trim() === '' || password.value.trim() === ''){
        // Se manda alerta
            activeAlert('Los campos no pueden ser vacios')
    } 
    else {
        // Intento de login
        const sendData = {
            usuario: usuario.value,
            password: password.value
        }
        
        fetch('./Backend/files/login.php', {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            
        .then(async (response) => { 
            //console.log(await response.json())
            const respuesta = await response.json()
            //console.log('@@@ respuesta',respuesta)
            if(respuesta.MESSAGE === 'No se encontro usuario'){
                activeAlert('Lo sentimos, no pudimos encontrar tu cuenta')
            } else if (respuesta.MESSAGE === 'Contraseñas no coinciden'){
                activeAlert('Contraseña Incorrecta.')
            } else if (respuesta.MESSAGE === 'Success') {
                 // Reedirigir a 'home'
                const usuario = respuesta.USUARIO['usuario']
                window.location.replace(`/x/home.html?usuario=${usuario}`)
            } else {
                activeAlert('Ups, algo salió mal')
            }
        })
            
        .catch((error) => {
            console.log('@@@ error =>', error)
        })
    }
})

const activeAlert = msg => {
    const alertObj = document.getElementsByClassName('alertLogin')
    // console.log('Alert ', alertObj)
    alertObj[0].textContent = msg
    alertObj[0].classList.remove('hide')
    alertObj[0].classList.add('show')

    setTimeout(() => {
        alertObj[0].classList.remove('show')
        alertObj[0].classList.add('hide')
    }, 3000)
}

const validInputs = () => {
    const signInputs = document.querySelectorAll('#nameInput, #lastnameInput, #emailInput, #userInput, #passwordInput ')
    let areEmpty = false

    signInputs.forEach(input => {
        if(input.value.trim() === '')
            areEmpty = true
    })

    btnSignin.disabled = areEmpty
}