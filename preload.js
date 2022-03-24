const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion', {
        registroValido: (datos) => ipcRenderer.send('registroValido', datos),
        inicioCorrecto: (callback) => ipcRenderer.on('inicioCorrecto', callback),
        editar_r: (datos) => ipcRenderer.send('editar_r', datos),
        solicitar_perdido: (datos) => ipcRenderer.send('solicitar_perdido', datos),
        guardar_f: (datos) => ipcRenderer.send('guardar_f', datos)
    }

)