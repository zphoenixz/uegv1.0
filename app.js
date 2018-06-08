const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
//---------------------------------------------------------------------------------
//hbs.registerPartials(__dirname + '/views/partials');
//app.set('views', __dirname + '/hbs');
app.use(express.static(__dirname + '/public'));
app.set('View engine', 'hbs');//HTML mustache Handlebar
                                
//**Sitio en mantenimiento */
app.use(express.static(__dirname + '/public'));
//---------------------------------------------------------------------------------
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
app.get('/log_in', (req, res) => {
    res.render('inicio_sesion.hbs', {

    });
});
app.get('/notas', (req, res) => {
    res.render('notas.hbs', {

    });
});
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

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

//==================================================================MANEJAR ERRORES
// catch 404 and forward to error handler

  module.exports = app;
  //------------------------------------------------------------------MANEJAR ERRORES