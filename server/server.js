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
//var io2 = socketIO(server);
app.use(express.static(publicPath));
app.set('View engine', 'hbs');//HTML mustache Handlebar


//------------------------------------
var op = 'nada';//nadie esta conectado
var usernameN = 'sin_nombre';//nadie esta conectado
var SesionActual = 'Iniciar Sesión';

io.on('connection', (socket) => {
   
    socket.on('login', (params, callback) => {
        if(!isRealString(params.user) || !isRealString(params.pass)){
            callback('C.I. y Contraseña son requeridos!');
        }else{
            op = validarUsuario(params.user, params.pass);
            usernameN = params.user;
            SesionActual = usernameN + " Cerrar Sesión";
            if(op == 'profesor'){
                callback('Bienvenido Profesor!','p');
            }else if(op == 'secretario'){
                callback('Bienvenido Administrativo!','s');
            }else{
                callback('C.I. o Contraseña incorrectos!');
            }
        }
    });
    socket.on('logout', (params, callback) => {
        op='nada';
        SesionActual = 'Iniciar Sesión';

        callback('Sesión Finalizada!');
    });
    //app.set('View engine', 'hbs');
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

    //------------------------------------------------MENU DEL PROFESOR
    // app.get('/dashboard_prof', (req, res) => {
    //     var cerrarSesion = usernameN+" Cerrar Sesión"
    //     res.render('dashboard_prof.hbs', {
    //         logout: cerrarSesion
    //     });
    // });

});


app.get('/', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario')
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('dashboard_usuario.hbs', {
            logout: SesionActual
        });
});

app.get('/comunicados', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario')
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('comunicados.hbs', {
            logout: SesionActual
            // VariableTitulo: 'About Page',
            // //AnhoActual: new Date().getFullYear()
        });
});
app.get('/entrevistas', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario')
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('entrevistas.hbs', {
            logout: SesionActual
        });
});
app.get('/user', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario')
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('user.hbs', {
            logout: SesionActual
        });
});
app.get('/contactos', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario')
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('contactos.hbs', {
            logout: SesionActual
        });
});
app.get('/log_in', (req, res) => { //INICIAR SESIÓN
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario')
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    else if(op == 'nada')
        res.render('inicio_sesion.hbs', {
            logout: SesionActual
        });
});
app.get('/notas', (req, res) => {
    res.render('notas.hbs', {

    });
});
//------------------------------------------------MENU DEL PROFESOR
app.get('/dashboard_prof', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Profesor para acceder a esta pagina :('
        });
});
app.get('/comunicados_prof', (req, res) => {
    if(op == 'profesor')
        res.render('comunicados_prof.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Profesor para acceder a esta pagina :('
        });
});
app.get('/listas_prof', (req, res) => {
    if(op == 'profesor')
        res.render('listas_prof.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Profesor para acceder a esta pagina :('
        });
});
app.get('/horarios_prof', (req, res) => {
    if(op == 'profesor')
        res.render('horarios_prof.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Profesor para acceder a esta pagina :('
        });
});
app.get('/entrevistas_prof', (req, res) => {
    if(op == 'profesor')
        res.render('entrevistas_prof.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Profesor para acceder a esta pagina :('
        });
});
//------------------------------------------------MENU DEL PROFESOR
//------------------------------------------------MENU DEL SECRETARIO
app.get('/dashboard_sec', (req, res) => {
    if(op == 'secretario')
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
        });
});
app.get('/personal', (req, res) => {
    if(op == 'secretario')
        res.render('personal.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
        });
});
app.get('/entrevistas_sec', (req, res) => {
    if(op == 'secretario')
        res.render('entrevistas_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
        });
});
app.get('/comunicados_sec', (req, res) => {
    if(op == 'secretario')
        res.render('comunicados_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
        });
});
app.get('/horarios_sec', (req, res) => {
    if(op == 'secretario')
        res.render('horarios_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
        });
});
app.get('/notas_sec', (req, res) => {
    if(op == 'secretario')
        res.render('notas_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
        });
});
app.get('/listas_sec', (req, res) => {
    if(op == 'secretario')
        res.render('listas_sec.hbs', {
            logout: SesionActual
        });
    else
        res.render('restringido.hbs', {
            mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
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

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

//==================================================================MANEJAR ERRORES
// catch 404 and forward to error handler

 // module.exports = app;
  //------------------------------------------------------------------MANEJAR ERRORES