var guardar = document.getElementById('guardar')


guardar.addEventListener('submit', function (evento) {
    evento.preventDefault()
    window.comunicacion.guardar_f();
    window.close()
})

