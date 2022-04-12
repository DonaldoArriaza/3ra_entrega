const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion', {
        registroValido: (datos) => ipcRenderer.send('registroValido', datos),
        inicioCorrecto: (callback) => ipcRenderer.on('inicioCorrecto', callback),
        solicitar_perdido: (datos) => ipcRenderer.send('solicitar_perdido', datos),
        guardar_f: (datos) => ipcRenderer.send('guardar_f', datos),
        realizar_pedido: (datos) => ipcRenderer.send('realizar_pedido', datos),
        nuevoRegistro: (datos) => ipcRenderer.send('nuevoRegistro', datos),
        registroIncorrecto: (callback) => ipcRenderer.on('registroIncorrecto', callback),
        consultarDatos: () => ipcRenderer.send('consultarDatos'),
        respuestaDatos: (callback) => ipcRenderer.on('respuestaDatos', callback),
        editarProducto: (datos) => ipcRenderer.send('editarProducto', datos),
        consultarCat: (datos) => ipcRenderer.send('consultarCat', datos),
        respuestaCat: (callback) => ipcRenderer.on('respuestaCat', callback),
        editarCat: (datos) => ipcRenderer.send('editarCat', datos),
        recibirCategoria: (callback) => ipcRenderer.on('recibirCategoria', callback),
        productoAEditar: (callback) => ipcRenderer.on('productoAEditar', callback),
        guardarProducto: (datos) => ipcRenderer.send('guardarProducto', datos),
        recibirDatosNuevos: (callback) => ipcRenderer.on('recibirDatosNuevos', callback),
        actualizarProducto: (datos) => ipcRenderer.send('actualizarProducto', datos)
    }

)