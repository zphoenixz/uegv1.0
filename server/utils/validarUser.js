var validarUsuario = (usuarios, usr, pass) => {
    //var ProfeOSecre = consultarFirebase(usr,pass);
    //return ProfeOsecre;
    //puede ser o 'profesor' o 'secretario' si no encuentra nada devuelve 'nada'
    var todosLosDatos = (Object.values(usuarios)).sort();
    var tipo='nada';
    console.log(todosLosDatos[0].apellidos);
    todosLosDatos.forEach(function(element) {
        var usrN = element.nombre.toUpperCase();
        var passN = element.contra;
        var cargo = element.cargo;
        usr = usr.toUpperCase();
        console.log("usuarioN: "+usrN+":: ContraN: "+passN);
        console.log("usuario: "+usr+":: Contra: "+pass);
        if( usrN == usr && passN == pass && cargo == "Profesor")
            tipo = 'profesor';
        else if( usrN == usr && passN == pass && cargo == "Administrativo")
            tipo = 'secretario';
    });
    return tipo;

};

module.exports = {validarUsuario};