var u_actual = document.getElementById('usuario_actual')
var r_pedido = document.getElementById('r_pedido')

window.comunicacion.inicioCorrecto(function (event, args) {
    u_actual.innerHTML = args
})



r_pedido.addEventListener("submit", function (evento) {
    evento.preventDefault()
    window.comunicacion.realizar_pedido();
    window.close()
})

