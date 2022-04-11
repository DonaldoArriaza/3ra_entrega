var formulario = document.getElementById('login')
var usuario = document.getElementById('usuario-login')
var pass = document.getElementById('pass-login')
var nuevo = document.getElementById('registro')

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    window.comunicacion.registroValido([usuario.value, pass.value])

    window.comunicacion.registroIncorrecto(function(event, args) {
        alert(args)
    })
})

nuevo.addEventListener('click', function() {
    window.comunicacion.nuevoRegistro([usuario.value, pass.value])
})