var u_actual = document.getElementById('usuario_actual')
var editar = document.getElementById('editar')
var s_pedido = document.getElementById('s_pedido')
let consultar = document.getElementById('consultar')
let productos = document.getElementById('tabla_productos')


window.comunicacion.inicioCorrecto(function(event, args) {
    u_actual.innerHTML = args
    console.log(args)
})

consultar.addEventListener('click', function(event) {
    window.comunicacion.consultarDatos()
})

window.comunicacion.respuestaDatos(function(event, args) {

    console.log(args)

    for (let i = 0; i < args.length; i++) {
        let boton = document.createElement('button')
        let boton2 = document.createElement('button')
        boton.setAttribute('type', 'button')
        boton2.setAttribute('type', 'button')

        boton.setAttribute('id', `ProdE${args[i].idProducto}`)
        boton2.setAttribute('id', `ProdP${args[i].idProducto}`)
        boton.innerHTML = "Editar"
        boton2.innerHTML = "Solicitar Pedido"
        boton.addEventListener('click', editarProducto)
        boton2.addEventListener('click', window.comunicacion.solicitar_perdido)

        let celdaBoton = document.createElement('td')
        celdaBoton.appendChild(boton)
        celdaBoton.appendChild(boton2)

        let fila = document.createElement('tr')

        fila.innerHTML += `<tr>
            <td>${args[i].idProducto}</td>
            <td>${args[i].nombre}</td>
            <td>${args[i].descripcion}</td>
            <td>${args[i].tipoCategoria}</td>
            <td>${args[i].existencia}</td>
            </tr>`

        fila.appendChild(celdaBoton)
        productos.appendChild(fila)
    }

})

function editarProducto(event) {
    let fila = event.target.parentElement.parentElement

    let id = fila.children[0].innerHTML
    let nombre = fila.children[1].innerHTML
    let descripcion = fila.children[2].innerHTML
    let tipoCategoria = fila.children[3].innerHTML
    let existencia = fila.children[4].innerHTML
    let seleccion = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        tipoCategoria: tipoCategoria,
        existencia: existencia
    }
    console.log(seleccion)
    window.comunicacion.editarProducto(seleccion)
    window.close()
}