const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { create } = require('domain');
const saltRounds = 10;


// Crear Conixion

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fopavi1234',
    database: 'inventario'
})

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
        width: 500,
        height: 400,
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
        height: 500,
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
    conexion.promise().execute('SELECT * FROM Usuarios WHERE nombre = ?', [args[0]])
        .then(([results, fields]) => {
            console.log(results)
            if (results.length > 0) {
                return bcrypt.compare(args[1], results[0]['pass'])
            }
        })
        .then((result) => {
            if (result) {
                createWindow2()
                    /* ventana2.webContents.on('did-finish-load', function() {
                    ventana2.webContents.send('inicioCorrecto', 'Bienvenido ')
                })  */
            }

        })
})

ipcMain.on('nuevoRegistro', function(event, args) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(args[1], salt, function(err, hash) {
            conexion.promise().execute('INSERT INTO Usuarios(nombre,pass) VALUES(?,?)', [args[0], hash])
                .then(([results, fields]) => {
                    console.log(results)
                    if (results.affectedRows > 0) {
                        console.log('Usuario Agregado')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    if (err.code == 'ER_DUP_ENTRY') {
                        ventana.webContents.send('registroIncorrecto', 'Nombre de usuario ya utilizado ')
                    }
                })
        });
    });
})

ipcMain.on('consultarDatos', function(event, args) {
    conexion.promise().query('Select p.idProducto, c.tipoCategoria, p.Marca, p.nombre, p.descripcion, p.existencia from categoria c join producto p on p.categoria_idCategoria = c.idCategoria')
        .then(
            ([result, fields]) => {
                console.log(result)
                ventana2.webContents.send('respuestaDatos', result)
            }
        )
        .catch((err) => {
            console.log(err)
        })
})


ipcMain.on('editarProducto', function(event, args) {
    console.log(args)
    createWindow3()
    ventana3.webContents.on('did-finish-load', function() {
        ventana3.webContents.send('productoAEditar', args)
    })
})

ipcMain.on('consultarCat', function(event, args) {
    conexion.promise().query('select * from categoria')
        .then(
            ([result, fields]) => {
                ventana3.webContents.send('respuestaCat', result)
            })
        .catch((err) => {
            console.log(err)
        })
})


ipcMain.on('guardarProducto', function(event, args) {
    console.log(args)
    conexion.promise().execute('UPDATE producto SET nombre = ?, categoria_idCategoria = ?, existencia = ? WHERE (idProducto = ?)', [args.nombre, args.categoriaId, args.existencia, args.id])
    createWindow2()
    ventana.webContents.send('recibirDatosNuevos', args)

})

ipcMain.on('solicitar_perdido', function(event, args) {
    console.log(args)
    createWindowP()

})

ipcMain.on('guardar_f', function(event, args) {
    console.log(args)
    createWindow2()

})

ipcMain.on('realizar_pedido', function(event, args) {
    console.log(args)
    createWindow2()

})



app.whenReady().then(createWindow)


/* conexion.query(
    'SELECT * FROM Usuarios',
    function(err, result, fields) {
        if (err) {
            //manejamos el error
            console.log(err)
        }
        console.log(result)
            //console.log(fields)
    }) */

/* conexion.promise().query('SELECT * FROM Usuarios')
    .then(
        ([result, fields]) => {
            console.log('Ejecutado con promesa')
            console.log(result)
        }
    ) */