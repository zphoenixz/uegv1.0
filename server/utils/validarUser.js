var validarUsuario = (usr, pass) => {
    if( usr == 'p' && pass == 'p')
        return 'profesor';//
    else if( usr == 's' && pass == 's')
        return 'secretario';//
};

module.exports = {validarUsuario};