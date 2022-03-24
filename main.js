const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')

//ventana1

let ventana;

function createWindow() {
    ventana = new BrowserWindow({
        width: 350,
        height: 300,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventana.loadFile('index.html')
}


//ventana 2

let ventana2;

function createWindow2() {
    ventana2 = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventana2.loadFile('productos.html')
}

//ventana 3

let ventana3;

function createWindow3() {
    ventana3 = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventana3.loadFile('editar.html')
}
    //ventana 4

    let ventana4;

    function createWindowP() {
        ventana4 = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                preload: path.join(app.getAppPath(), 'preload.js')
            }
        });
        ventana4.loadFile('pedidos.html')
    }


ipcMain.on('registroValido', function(event, args) {
    console.log(args)
    createWindow2()
    ventana2.webContents.on('did-finish-load', function() {
        ventana2.webContents.send('inicioCorrecto', 'Bienvenido ' + args)
    })
})

ipcMain.on('editar_r', function(event, args) {
    console.log(args)
    createWindow3()
    ventana3.webContents.on('did-finish-load', function() {
        ventana3.webContents.send('inicioCorrecto', 'Bienvenido ' + args)
    })
})

ipcMain.on('solicitar_perdido', function (event, args) {
    console.log(args)
    createWindowP()
    
})

ipcMain.on('guardar_f', function (event, args) {
    console.log(args)
    createWindow2()

})

ipcMain.on('realizar_pedido', function (event, args) {
    console.log(args)
    createWindow2()

})

app.whenReady().then(createWindow)