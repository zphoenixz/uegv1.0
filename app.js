const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
//---------------------------------------------------------------------------------
//hbs.registerPartials(__dirname + '/views/partials');
//app.set('views', __dirname + '/hbs');
app.set('View engine', 'hbs');//HTML mustache Handlebar
                                
// app.use((req, res, next) => {//next existe para que puedas decirle a express    
//     var now = new Date().toString();        //cuando tu middleware esta hecha
//     var log = `${now}: ${req.method} ${req.url}`;
//     //"Sat Jun 02 2018 14:01:13 GMT-0400 (-04)": "GET" "2/about"
//     //Si la pagina esta cargada, esto pasa cuando le doyrefrescar
//     console.log(log);
//     fs.appendFile('server.log', log + '\n', (err) => {
//         if(err){
//             console.log('Unable to append to server.log');
//         }
//     });
//     next();                
// });

//**Sitio en mantenimiento */
app.use(express.static(__dirname + '/public'));
//---------------------------------------------------------------------------------
                                    
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