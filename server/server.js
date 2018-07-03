const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const publicPath = path.join(__dirname,'../public');

const {isRealString} = require('./utils/validation');
const {validarUsuario} = require('./utils/validarUser');
const FBQueries = require('./Firebase/fb_session.js');

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
var materiaP = 'nomateria';
var SesionActual = 'Iniciar Sesión';
var newStudent, newDad, newPer, newEnt, newHor ;
var e_ci, p_ci, per_ci, newCom;

io.on('connection', (socket) => {
      //----------------------------------------------------------------------------------LOGON
    socket.on('login', (params, callback) => {
        if(!isRealString(params.user) || !isRealString(params.pass)){
            callback('C.I. y Contraseña son requeridos!');
        }else{

            FBQueries.existsPersonalData("Personal", results1 => {
                if(results1 == "0"){
                    callback('nada','nada');//Supuestamente nunca va devolver esta opcion
                }else{ 
                    //callback(results1,'lista');
                    // console.log(results1);
                    op = validarUsuario(results1, params.user, params.pass);
                    usernameN = params.user;
                    console.log("La opcion == "+op);
                    if(op != 'Ninguna' && op!='nada'){
                        materiaP=op;
                        op='profesor';
                        SesionActual = materiaP+": "+usernameN + " Cerrar Sesión";
                        callback('Bienvenido Profesor!','p');
                    }else if(op == 'Ninguna'){//ninguna materia osea administrativo
                        SesionActual = usernameN + " Cerrar Sesión";
                        op = 'secretario';
                        callback('Bienvenido Administrativo!','s');
                    }else{
                        callback('C.I. y/o Contraseña incorrectos!');
                    }

                }
            });


        }
    });
      //----------------------------------------------------------------------------------LOGOUT
    socket.on('logout', (params, callback) => {
        op='nada';
        SesionActual = 'Iniciar Sesión';
        
        callback('Sesión Finalizada!');
    });
    //----------------------------------------------------------------------------------LOAD LIST CRUSO
    socket.on('load_list', (params, callback) => {
        var curso = params.curso;
        var paralelo = params.paralelo

        FBQueries.existsData("Cursos/"+curso, paralelo, results1 => {
            if(results1 == "0"){
                callback('nada','nada');
            }else{ 
                callback(results1,'lista');
            }
        });
    });
        //----------------------------------------------------------------------------------LOAD LIST PROFESORES
        socket.on('load_plist', (params, callback) => {
            FBQueries.existsPersonalData("Personal", results1 => {
                if(results1 == "0"){
                    callback('nada','nada');
                }else{ 
                    callback(results1,'lista');
                }
            });
        });
    //----------------------------------------------------------------------------------LOAD LIST ENTREVISTAS
    socket.on('load_elist', (params, callback) => {
        FBQueries.existsPersonalData("Entrevistas", results1 => {
            if(results1 == "0"){
                callback('nada','nada');
            }else{ 
                callback(results1,'lista');
            }
        });
    });
       //----------------------------------------------------------------------------------LOAD LIST COMUNICADOS
       socket.on('load_clist', (params, callback) => {
        FBQueries.existsPersonalData("Comunicados", results1 => {
            if(results1 == "0"){
                callback('nada','nada');
            }else{ 
                callback(results1,'lista');
            }
        });
    });
    //----------------------------------------------------------------------------------LOAD LIST HORARIOS
        socket.on('load_holist', (params, callback) => {
            var curso = params.curso;
            var paralelo = params.paralelo
    
            FBQueries.existsData("Horarios/"+curso, paralelo, results1 => {
                if(results1 == "0"){
                    callback('nada','nada');
                }else{ 
                    callback(results1,'lista');
                }
            });
        });
    //----------------------------------------------------------------------------------SEARCH USER
    socket.on('buscar_usuario', (params, callback) => {
        FBQueries.existsData("Padres", params.ci, results1 => {
            if(results1 == "0"){
                FBQueries.existsData("Estudiantes", params.ci, results2 => {
                    if(results2 === "0"){
                        callback('nada','nada');
                    }else{
                        callback(results2,'estudiante');
                    }
                });
            }else{
                callback(results1,'padre');
            }
        });
    });
       //----------------------------------------------------------------------------------SEARCH PERSONAL
       socket.on('buscar_personal', (params, callback) => {
        FBQueries.existsData("Personal", params.ci, results1 => {
            if(results1 == "0"){
                callback('nada','nada');
            }else{
                callback(results1,'personal');
            }
        });
    });
        //----------------------------------------------------------------------------------UPDATE PERSONAL
        socket.on('update_per', (params, callback) => {
            console.log("----------------- Empezando updates sobre el Personal");
            FBQueries.deleteMateria("Personal", per_ci, resultados => {//borrar materia anterior
                console.log("borre materia anterior");
            });

            var obj = `{"${per_ci}" : "${newPer.nombre + " " + newPer.apellidos}"}`;
            obj = JSON.parse(obj);
            FBQueries.pushData("Materias", newPer.materia, obj, resultados => {
                console.log("Se guardo Curso");
            });
            
            FBQueries.updateData('Personal', per_ci, newPer, resultados => {
                console.log("Se actualizo Personal");
            });
            
            callback();
        });
    //----------------------------------------------------------------------------------UPDATE ESTUDIANTE
    socket.on('update_est', (params, callback) => {
        console.log("----------------- Empezando updates sobre el estudiante");
        FBQueries.deleteCurso("Estudiantes", e_ci, resultados => {
            console.log("consulte curso anterior");
        });

        FBQueries.updateData('Estudiantes', e_ci, newStudent, resultados => {
            console.log("Se actualizo estudiante");
        });
        
        var obj = `{"${e_ci}" : "${newStudent.paterno +" "+ newStudent.materno +" "+newStudent.nombre}"}`;
        obj = JSON.parse(obj);
        FBQueries.pushData("Cursos/"+newStudent.curso, newStudent.paralelo, obj, resultados => {
            console.log("Se guardo Curso");
        });
        callback();
    });
     //----------------------------------------------------------------------------------UPDATE APODERADO
    socket.on('update_dad', (params, callback) => {
        FBQueries.updateData('Padres', p_ci, newDad, resultados => {
            console.log("Se actualizo padre");
        });
        callback();
    });
    //----------------------------------------------------------------------------------- BORRAR PERSONAL
      socket.on('delete_per', (params, callback) => {
        // console.log("----------------- Empezando deletes sobre el estudiante");
        FBQueries.deleteMateria("Personal", params.ci, resultados => {
            console.log("consulte materia anterior");
        });

        FBQueries.deleteData('Personal', params.ci, resultados => {
            console.log("Se borro personal");
        });
        callback();
    });
    //----------------------------------------------------------------------------------- BORRAR ESTUDIANTE
    socket.on('delete_est', (params, callback) => {
        // console.log("----------------- Empezando deletes sobre el estudiante");
        FBQueries.deleteCurso("Estudiantes", params.ci, resultados => {
            console.log("consulte curso anterior");
        });

        FBQueries.deleteData('Estudiantes', params.ci, resultados => {
            console.log("Se borro estudiante");
        });
        callback();
    });
    //----------------------------------------------------------------------------------- BORRAR PADRE
    socket.on('delete_dad', (params, callback) => {
        // console.log("----------------- Empezando deletes sobre el padre");
        FBQueries.deleteData('Padres', params.ci, resultados => {
            console.log("Se borro tutor");
        });
        callback();
    });
    
    //-------------------------------------------------------------------------------------GUARDAR ESTUDIANTE
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
        FBQueries.exists("Padres",p_ci, results1 => {
            if(results1 == "1"){
                FBQueries.exists("Estudiantes",e_ci, results2 => {
                    if(results2 == "0"){
                        FBQueries.pushData("Estudiantes",e_ci, newStudent, resultados => {
                            console.log("Se guardo estudiante");
                        });
                        var obj = `{"${e_ci}" : "${newStudent.paterno +" "+ newStudent.materno +" "+newStudent.nombre}"}`;
                        obj = JSON.parse(obj);
                        FBQueries.pushData("Cursos/"+params.ecur, params.epar, obj, resultados => {
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
    //------------------------------------------------------------------------------------ GUARDAR APODERADO
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
        FBQueries.exists("Padres", p_ci, results => {
            if(results == "0"){
                FBQueries.pushData("Padres",p_ci, newDad, resultados => {
                    console.log("Se guardo Padre");
                });
                callback('Tutor Añadido!','0');
            }else{
                console.log("Ese padre ya existe");
                callback('Este tutor ya existe, ¿desea modificar sus atributos?','1');
            }
        });
    });
        //------------------------------------------------------------------------------------ GUARDAR PERSONAL
        socket.on('save_per', (params, callback) => {
            per_ci = params.ppci;
            newPer= { //Clase Apoderado--------------------------------------------
                nombre: params.ppn,
                apellidos: params.ppap,
                ci_ext: params.ppdep1,
                fech_nac: params.ppfn,
                direccion: params.ppdir,
                cargo: params.ppcar,
                materia: params.ppmat,
                contra: params.pcont
            };
            //----
            FBQueries.exists("Personal", per_ci, results => {
                if(results == "0"){
                    FBQueries.pushData("Personal",per_ci, newPer, resultados => {
                        console.log("Se guardo Tutor");
                    });
                    
                    var obj = `{"${per_ci}" : "${newPer.nombre + " " + newPer.apellidos}"}`;
                    obj = JSON.parse(obj);
                    FBQueries.pushData("Materias", newPer.materia, obj, resultados => {
                        console.log("Se guardo Curso");
                    });
                        
                    callback('Personal Añadido!','0');
                }else{
                    console.log("Ese personal ya existe");
                    callback('Este personal ya existe, ¿desea modificar sus atributos?','1');
                }
            });
        });
    //------------------------------------------------------------------------------------ GUARDAR ENTREVISTA
    socket.on('save_ent', (params, callback) => {
        newEnt = { //Clase Apoderado--------------------------------------------
            profesor: params.prof,
            materia: params.mate,
            fecha: params.fech,
            hor: params.hor
        };
        //----
        FBQueries.pushData_Real("Entrevistas", newEnt, resultados => {
            console.log("Se guardo Entrevista");
        });
        callback("Se guardo entrevista");
    });
    //------------------------------------------------------------------------------------ GUARDAR COMUNICADO
    socket.on('save_com', (params, callback) => {
        newCom = { //Clase Comunicado--------------------------------------------
            ctipo: params.ctipo,
            cfecha: params.cfecha,
            ctexto: params.ctexto,
            ctitulo: params.ctitulo
        };
        //----
        FBQueries.pushData_Real("Comunicados", newCom, resultados => {
            console.log("Se guardo Comunicados");
        });
        callback("Se guardo comunicados");
    });
    //------------------------------------------------------------------------------------ GUARDAR HORARIOS
    socket.on('save_sche', (params, callback) => {
        newHor = {
            lunes: params.lunes,
            martes: params.martes,
            miercoles: params.miercoles,
            jueves: params.jueves,
            viernes: params.viernes,
        };
        //----
        // var obj = `{"${e_ci}" : "${newStudent.paterno +" "+ newStudent.materno +" "+newStudent.nombre}"}`;
        // obj = JSON.parse(obj);
        FBQueries.pushData("Horarios/"+params.cur, params.par, newHor, resultados => {
            console.log("Se guardo Horario");
        });
        callback("Se guardo Horario");
    });
});



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
// app.get('/notas_sec', (req, res) => {
//     if(op == 'secretario')
//         res.render('notas_sec.hbs', {
//             logout: SesionActual
//         });
//     else
//         res.render('restringido.hbs', {
//             mensaje_restringido: 'Necesitas una clave de Administrativo para acceder a esta pagina :('
//         });
// });
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