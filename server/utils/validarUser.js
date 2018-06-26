var validarUsuario = (usr, pass) => {
    //var ProfeOSecre = consultarFirebase(usr,pass);
    //return ProfeOsecre;
    //puede ser o 'profesor' o 'secretario' si no encuentra nada devuelve 'nada'
    if( usr == 'p' && pass == 'p')
        return 'profesor';//
    else if( usr == 's' && pass == 's')
        return 'secretario';//
    else
        return 'nada';
};

module.exports = {validarUsuario};