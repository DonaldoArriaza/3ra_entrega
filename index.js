var formulario = document.getElementById('login')
var usuario = document.getElementById('usuario-login')

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    window.comunicacion.registroValido([usuario.value])
    window.close()
})