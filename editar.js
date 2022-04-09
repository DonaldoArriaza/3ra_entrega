var guardar = document.getElementById('guardar')
let codigo = document.getElementById('codigo')
let nombre = document.getElementById('nombre')
let descripcion = document.getElementById('descripcion')
let categoria = document.getElementById('categoria')
let existencia = document.getElementById('existencia')
let id_prod

window.comunicacion.productoAEditar(function(event, args) {
    console.log(args)
    nombre.value = args.nombre
    descripcion.value = args.descripcion
    categoria.value = args.categoria
    existencia.value = args.existencia
    id_prod = args.id
    let id_print = document.getElementById('codigo')
    id_print.value = args.id
})

guardar.addEventListener('submit', function(evento) {
    evento.preventDefault()
    window.comunicacion.guardar_f();
    window.close()
})