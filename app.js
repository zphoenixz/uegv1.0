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
    // res.send('<h1>hello express!</h1>');//Mandar HTML como respuesta
  /*   res.send({//Mandar JSON como respuesta
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]
    }); */
    res.render('dashboard_usuario.hbs', {
        //VariableTitulo: 'Hagan bien!!!',
        //VariableMsjBienvenida: '>:V',
        //AnhoActual: new Date().getFullYear()
    });
});

// app.get('/about', (req, res) => {//Usando HBS, about.hbs
//     //res.send('About Page');
//     res.render('about.hbs', {
//         VariableTitulo: 'About Page',
//         //AnhoActual: new Date().getFullYear()
//     });
// });

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