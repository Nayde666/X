let usuario
const btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', () => {
    const usuario = document.getElementById('usuario')
    const password = document.getElementById('password')
    
    if(usuario.value.trim() === '' || password.value.trim() === ''){
    // mandamos alerta
        activaAlerta('Los campos no pueden ser vacios')
    } else {
    // Intentamos logearnos
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
                activaAlerta('Lo sentimos, no pudimos encontrar tu cuenta')
            } else if (respuesta.MESSAGE === 'Contraseñas no coinciden'){
                activaAlerta('Contraseña Incorrecta.')
            } else if (respuesta.MESSAGE === 'Success') {
                //reedirigir a home
                const usuario = respuesta.USUARIO['usuario']
                window.location.replace(`/x/home.html?usuario=${usuario}`)
            } else {
                activaAlerta('Algo salio mal')
            }
        })
        .catch((error) => {
            console.log('@@@ error =>', error)
        })
    }
}) //

const activaAlerta = mensaje => {
    const alerta = document.getElementsByClassName('alertaLogin')
    //console.log('alerta', alerta)
    alerta[0].textContent = mensaje
    alerta[0].classList.remove('hide')
    alerta[0].classList.add('show')
    setTimeout(() => {
        alerta[0].classList.remove('show')
        alerta[0].classList.add('hide')
    }, 3000)
}

function validInputs() {
    var inputTexto = document.getElementById('nameInput');
    var inputTexto2 = document.getElementById('lastname1');
    var inputTexto3 = document.getElementById('lastname2');
    var inputTexto4 = document.getElementById('emailInput');
    var inputTexto5 = document.getElementById('passwordInput');
    var boton = document.getElementById('btnSignin');

    if (inputTexto.value.trim() !== '' & inputTexto2.value.trim() !== '' & inputTexto3.value.trim() !== '' & inputTexto4.value.trim() !== '' & inputTexto5.value.trim() !== '') {
      // Si el input tiene texto, habilitar el botón
      boton.disabled = false;
    } else {
      // Si el input no tiene texto, deshabilitar el botón
      boton.disabled = true;
    }
  }
