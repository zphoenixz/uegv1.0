const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const publicPath = path.join(__dirname,'../public');

const {isRealString} = require('./utils/validation');
const {validarUsuario} = require('./utils/validarUser');
const pushData = require('./Firebase/fb_session.js');
const exists = require('./Firebase/fb_session.js');
const updateData = require('./Firebase/fb_session.js');
const getData = require('./Firebase/fb_session.js');

const port = process.env.PORT || 3000;
//-----------------------------------N
var app = express();
var http = require('http');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');

var server = http.createServer(app);
var io = socketIO(server);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.set('View engine', 'hbs');//HTML mustache Handlebar
//------------------------------------
var op = 'nada';//nadie esta conectado
var usernameN = 'sin_nombre';//nadie esta conectado
var SesionActual = 'Iniciar Sesión';
var newStudent, newDad ;
var e_ci, p_ci;

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
                callback('C.I. y/o Contraseña incorrectos!');
            }
        }
    });
    socket.on('logout', (params, callback) => {
        op='nada';
        SesionActual = 'Iniciar Sesión';
        
        callback('Sesión Finalizada!');
    });

    socket.on('navegar', (params, callback) => {
        console.log("Cambie de pagina, cambie de pagina");
        callback();
    });
    //-----------------------------------------------------------------------UPDATES
    socket.on('update_est', (params, callback) => {
        console.log("----------------- Empezando updates sobre el estudiante");
        getData.getData("Estudiantes", e_ci, resultados => {
            console.log("consulte curso anterior");
        });

        pushData.updateData('Estudiantes', e_ci, newStudent, resultados => {
            console.log("Se actualizo estudiante");
        });
        
        var obj = `{"${e_ci}" : "${e_ci}"}`;
        obj = JSON.parse(obj);
        pushData.pushData("Cursos/"+newStudent.curso, newStudent.paralelo, obj, resultados => {
            console.log("Se guardo Curso");
        });
        callback();
    });
    socket.on('update_dad', (params, callback) => {
        pushData.updateData('Padres', p_ci, newDad, resultados => {
            console.log("Se actualizo padre");
        });
        callback();
    });
    //------------------------------------------------------------------------------
    //------------------------------------------------------------GUARDAR ESTUDIANTE
    socket.on('save_est', (params, callback) => {
        e_ci = params.eci;
        p_ci = params.ecpp;
        newStudent = { // Clase estudiante----------------------------------------
            ci_padre: params.ecpp,
            nombre: params.en,
            paterno: params.eap,
            materno: params.eam,
            ci_ext: params.edep1,
            fech_nac: params.efn,
            pais_nac: params.ep,
            dpto_nac: params.edep2,
            prov_nac: params.eprov,
            loca_nac: params.eloc,
            curso: params.ecur,
            paralelo: params.epar,
            nombre: params.en,
            sexo: params.esex
        };
        //----
        exists.exists("Padres",p_ci, results1 => {

            if(results1 == "1"){
                exists.exists("Estudiantes",e_ci, results2 => {
                    if(results2 == "0"){
                        pushData.pushData("Estudiantes",e_ci, newStudent, resultados => {
                            console.log("Se guardo estudiante");
                        });
                        var obj = `{"${e_ci}" : "${e_ci}"}`;
                        obj = JSON.parse(obj);
                        pushData.pushData("Cursos/"+params.ecur, params.epar, obj, resultados => {
                            console.log("Se guardo Curso");
                        });
                        callback('Estudiante Añadido!','0');
                    }else{
                        console.log("Ese estudiante ya existe");
                        callback('Este estudiante ya existe, ¿desea modificar sus atributos?','1');
                    }
                });
            }else{
                callback('El Carnet de Tutor no existe, deberia crearlo primero','2');
            }

        });
    });
    //------------------------------------------------------------------------------
    //-------------------------------------------------------------GUARDAR APODERADO
    socket.on('save_dad', (params, callback) => {
        p_ci = params.pci;
        newDad = { //Clase Apoderado--------------------------------------------
            nombre: params.pn,
            paterno: params.pap,
            materno: params.pam,
            ci_ext: params.pdep1,
            direccion: params.pdir,
            telefono: params.ptel,
            ocupacion: params.pocu,
            grado_academico: params.pgrado,
            parentesco: params.ppar
        };
        //----
        exists.exists("Padres", p_ci, results => {
            if(results == "0"){
                pushData.pushData("Padres",p_ci, newDad, resultados => {
                    console.log("Se guardo Padre");
                });
                callback('Tutor Añadido!','0');
            }else{
                console.log("Ese padre ya existe");
                callback('Este tutor ya existe, ¿desea modificar sus atributos?','1');
            }
        });
    });
    
});
//------------------------------------------------------------------------------

// app.post('/nuevo_estudiante', function(req, res){
//     console.log("Quiero guardar: ", req.body);

//     var newStudent = { // Clase estudiante--------------------------------------------
//         ci_padre: req.body.ecpp,
//         nombre: req.body.en,
//         paterno: req.body.eap,
//         materno: req.body.eam,
//         ci_ext: req.body.edep1,
//         fech_nac: req.body.efn,
//         pais_nac: req.body.ep,
//         dpto_nac: req.body.edep2,
//         prov_nac: req.body.eprov,
//         loca_nac: req.body.eloc,
//         curso: req.body.ecur,
//         paralelo: req.body.epar,
//         nombre: req.body.en
//     };

//     exists.exists("Estudiantes/"+req.body.eci, results => {
//         f='1';
//         if(results == "0"){
//             pushData.pushData("Estudiantes",req.body.eci, newStudent, resultados => {
//                 console.log("Se guardo estudiante");
//             });
//             pushData.pushData("Cursos", req.body.ecur + "/" + req.body.epar, req.body.eci, resultados => {
//                console.log("Se guardo Curso");
//             });
//             m = 'Estudiante añadido';
//         }else{
//             console.log("Ese estudiante ya existe");
//             m = 'Estudiante no se añadio por que ya existe.';  
//         }
//         res.redirect('/dashboard_sec');
//     });
// });

// app.post('/nuevo_padre', function(req, res){
//     console.log("Quiero guardar: ", req.body);

//     res.render('dashboard_sec.hbs', {///<---- Aca debo redirigira una posicion de se ha guardado o eliminado
//         logout: SesionActual,
//         flag_e: f,
//         msj_e: m
//     });
// });


//------------------------------------------------------------------------------
//---------------------------------------------------------ROUTERS ENTRE PAGINAS
app.get('/', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario'){
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    }else
        res.render('dashboard_usuario.hbs', {
            logout: SesionActual
        });
});

app.get('/comunicados', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario'){
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    }else
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
    else if(op == 'secretario'){
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    }else
        res.render('entrevistas.hbs', {
            logout: SesionActual
        });
});
app.get('/user', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario'){
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    }else
        res.render('user.hbs', {
            logout: SesionActual
        });
});
app.get('/contactos', (req, res) => {
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario'){
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    }else
        res.render('contactos.hbs', {
            logout: SesionActual
        });
});
app.get('/log_in', (req, res) => { //INICIAR SESIÓN
    if(op == 'profesor')
        res.render('dashboard_prof.hbs', {
            logout: SesionActual
        });
    else if(op == 'secretario'){
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
    } else if(op == 'nada')
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
    if(op == 'secretario'){
        res.render('dashboard_sec.hbs', {
            logout: SesionActual
        });
        
    } else
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
app.get('*', (req, res) => {
    res.render('not_found.hbs', {
        mensaje_restringido: 'No pudimos encontrar el sitio que buscabas :('
    });
});
//---------------------------------------------------------------------------------

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

//==================================================================MANEJAR ERRORES
// catch 404 and forward to error handler

 // module.exports = app;
//------------------------------------------------------------------MANEJAR ERRORES