var u_actual = document.getElementById('usuario_actual')
var editar = document.getElementById('editar')
var s_pedido = document.getElementById('s_pedido')


window.comunicacion.inicioCorrecto(function(event, args) {
    u_actual.innerHTML = args
})

editar.addEventListener('submit', function(evento) {
    evento.preventDefault()
    window.comunicacion.editar_r();
    window.close()
})

s_pedido.addEventListener("submit", function (evento) {
    evento.preventDefault()
    window.comunicacion.solicitar_perdido();
    window.close()
})

