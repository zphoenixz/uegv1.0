const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const publicPath = path.join(__dirname,'../public');

const {isRealString} = require('./utils/validation');
const {validarUsuario} = require('./utils/validarUser');

const port = process.env.PORT || 3000;
//-----------------------------------N
var app = express();
var http = require('http');
var socketIO = require('socket.io');

                                
var server = http.createServer(app);
var io = socketIO(server);
//var io = require('socket.io').listen(server);
app.use(express.static(publicPath));
//app.set('View engine', 'hbs');//HTML mustache Handlebar
//------------------------------------
var op = 'nada';//nadie esta conectado
var usernameN = 'sin_nombre';//nadie esta conectado


io.on('connection', (socket) => {
   
    socket.on('login', (params, callback) => {
        if(!isRealString(params.user) || !isRealString(params.pass)){
            callback('C.I. y Contraseña son requeridos!');
        }else{
            op = validarUsuario(params.user, params.pass);
            usernameN = params.user;
            if(op == 'profesor'){
                callback('Bienvenido Profesor!','p');
            }else if(op == 'secretario'){
                callback('Bienvenido Administrativo!','s');
            }else{
                callback('C.I. o Contraseña incorrectos!');
            }
        }
    });
    app.set('View engine', 'hbs');
    app.get('/', (req, res) => {
        res.render('dashboard_usuario.hbs', {
            //VariableTitulo: 'Hagan bien!!!',
            //VariableMsjBienvenida: '>:V',
            //AnhoActual: new Date().getFullYear()
        });
    });
    
    app.get('/comunicados', (req, res) => {
        res.render('comunicados.hbs', {
            // VariableTitulo: 'About Page',
            // //AnhoActual: new Date().getFullYear()
        });
    });
    app.get('/entrevistas', (req, res) => {
        res.render('entrevistas.hbs', {
    
        });
    });
    app.get('/user', (req, res) => {
        res.render('user.hbs', {
    
        });
    });
    app.get('/contactos', (req, res) => {
        res.render('contactos.hbs', {
    
        });
    });
    app.get('/log_in', (req, res) => { //INICIAR SESIÓN
        if(op == 'profesor'){
            res.render('dashboard_prof.hbs', {
                
            });
        }else if(op == 'secretario'){
            res.render('dashboard_sec.hbs', {
                
            });
            
        }else if(op == 'nada')
            res.render('inicio_sesion.hbs', {
    
            });
    });
    app.get('/log_in', (req, res) => { //INICIAR SESIÓN
        if(op == 'profesor')
            res.render('dashboard_prof.hbs', {
    
            });
        else if(op == 'secretario')
            res.render('dashboard_sec.hbs', {
    
            });
        else if(op == 'nada')
            res.render('inicio_sesion.hbs', {
    
            });
    });
    app.get('/notas', (req, res) => {
        res.render('notas.hbs', {
    
        });
    });
    //------------------------------------------------MENU DEL PROFESOR
    app.get('/dashboard_prof', (req, res) => {
        var cerrarSesion = usernameN+" Cerrar Sesión"
        res.render('dashboard_prof.hbs', {
            logout: cerrarSesion
        });
    });
    app.get('/comunicados_prof', (req, res) => {
        res.render('comunicados_prof.hbs', {
    
        });
    });
    app.get('/listas_prof', (req, res) => {
        res.render('listas_prof.hbs', {
    
        });
    });
    app.get('/horarios_prof', (req, res) => {
        res.render('horarios_prof.hbs', {
    
        });
    });
    app.get('/entrevistas_prof', (req, res) => {
        res.render('entrevistas_prof.hbs', {
    
        });
    });
    //------------------------------------------------MENU DEL SECRETARIO
    //------------------------------------------------MENU DEL PROFESOR
    app.get('/dashboard_sec', (req, res) => {
        res.render('dashboard_sec.hbs', {
    
        });
    });
    app.get('/personal', (req, res) => {
        res.render('personal.hbs', {
    
        });
    });
    app.get('/entrevistas_sec', (req, res) => {
        res.render('entrevistas_sec.hbs', {
    
        });
    });
    app.get('/comunicados_sec', (req, res) => {
        res.render('comunicados_sec.hbs', {
    
        });
    });
    app.get('/horarios_sec', (req, res) => {
        res.render('horarios_sec.hbs', {
    
        });
    });
    app.get('/notas_sec', (req, res) => {
        res.render('notas_sec.hbs', {
    
        });
    });
    app.get('/listas_sec', (req, res) => {
        res.render('listas_sec.hbs', {
    
        });
    });
    //------------------------------------------------MENU DEL SECRETARIO
    // app.get('/projects', (req, res) => {
    //     res.render('projects.hbs', {
    //         VariableTitulo: 'Proyectos',
    //     });
    // });
    
    // app.get('/bad', (req, res) => {
    //     res.send({//Mando un JSON de mensaje de error
    //         errorMessage: 'Unable to handle request'
    //     });
    // });
    //---------------------------------------------------------------------------------
});


// app.get('/', (req, res) => {
//     res.render('dashboard_usuario.hbs', {
//         //VariableTitulo: 'Hagan bien!!!',
//         //VariableMsjBienvenida: '>:V',
//         //AnhoActual: new Date().getFullYear()
//     });
// });

// app.get('/comunicados', (req, res) => {
//     res.render('comunicados.hbs', {
//         // VariableTitulo: 'About Page',
//         // //AnhoActual: new Date().getFullYear()
//     });
// });
// app.get('/entrevistas', (req, res) => {
//     res.render('entrevistas.hbs', {

//     });
// });
// app.get('/user', (req, res) => {
//     res.render('user.hbs', {

//     });
// });
// app.get('/contactos', (req, res) => {
//     res.render('contactos.hbs', {

//     });
// });
// app.get('/log_in', (req, res) => { //INICIAR SESIÓN
//     if(op == 'profesor')
//         res.render('dashboard_prof.hbs', {

//         });
//     else if(op == 'secretario')
//         res.render('dashboard_sec.hbs', {

//         });
//     else if(op == 'nada')
//         res.render('inicio_sesion.hbs', {

//         });
// });
// app.get('/notas', (req, res) => {
//     res.render('notas.hbs', {

//     });
// });
// //------------------------------------------------MENU DEL PROFESOR
// app.get('/dashboard_prof', (req, res) => {
//     res.render('dashboard_prof.hbs', {

//     });
// });
// app.get('/comunicados_prof', (req, res) => {
//     res.render('comunicados_prof.hbs', {

//     });
// });
// app.get('/listas_prof', (req, res) => {
//     res.render('listas_prof.hbs', {

//     });
// });
// app.get('/horarios_prof', (req, res) => {
//     res.render('horarios_prof.hbs', {

//     });
// });
// app.get('/entrevistas_prof', (req, res) => {
//     res.render('entrevistas_prof.hbs', {

//     });
// });
// //------------------------------------------------MENU DEL SECRETARIO
// //------------------------------------------------MENU DEL PROFESOR
// app.get('/dashboard_sec', (req, res) => {
//     res.render('dashboard_sec.hbs', {

//     });
// });
// app.get('/personal', (req, res) => {
//     res.render('personal.hbs', {

//     });
// });
// app.get('/entrevistas_sec', (req, res) => {
//     res.render('entrevistas_sec.hbs', {

//     });
// });
// app.get('/comunicados_sec', (req, res) => {
//     res.render('comunicados_sec.hbs', {

//     });
// });
// app.get('/horarios_sec', (req, res) => {
//     res.render('horarios_sec.hbs', {

//     });
// });
// app.get('/notas_sec', (req, res) => {
//     res.render('notas_sec.hbs', {

//     });
// });
// app.get('/listas_sec', (req, res) => {
//     res.render('listas_sec.hbs', {

//     });
// });
//------------------------------------------------MENU DEL SECRETARIO
// app.get('/projects', (req, res) => {
//     res.render('projects.hbs', {
//         VariableTitulo: 'Proyectos',
//     });
// });

// app.get('/bad', (req, res) => {
//     res.send({//Mando un JSON de mensaje de error
//         errorMessage: 'Unable to handle request'
//     });
// });
//---------------------------------------------------------------------------------

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

//==================================================================MANEJAR ERRORES
// catch 404 and forward to error handler

 // module.exports = app;
  //------------------------------------------------------------------MANEJAR ERRORES