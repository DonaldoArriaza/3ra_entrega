var guardar = document.getElementById('guardar')
let codigo = document.getElementById('codigo')
let nombre = document.getElementById('nombre')
let descripcion = document.getElementById('descripcion')
let categoria = document.getElementById('categoriaO')
let categoriaBD = document.getElementById('categoria')
let existencia = document.getElementById('existencia')
let id_prod


window.comunicacion.productoAEditar(function(event, args) {
    console.log(args)
    nombre.value = args.nombre
    descripcion.value = args.descripcion
    categoria.innerHTML = args.tipoCategoria
    existencia.value = args.existencia
    id_prod = args.id
    let id_print = document.getElementById('codigo')
    id_print.value = args.id
})


document.addEventListener("DOMContentLoaded", function() {
    window.comunicacion.consultarCat()
})


window.comunicacion.respuestaCat(function(event, args) {
    console.log(args)
    args.forEach(item => {
        let op = document.createElement('option')
        op.value = item.idCategoria
        op.innerHTML = item.tipoCategoria
        categoriaBD.appendChild(op)
    })
})


guardar.addEventListener('submit', function(event) {
    let actualizacion = {
        id: codigo.value,
        nombre: nombre.value,
        existencia: existencia.value,
        categoriaId: parseInt(categoriaBD.value, 10),
        cateogria: categoriaBD.options[categoriaBD.selectedIndex].text
    }
    window.comunicacion.guardarProducto(actualizacion)
    window.close()



})