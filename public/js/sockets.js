var socket = io();
//var socket2 = io2();

socket.on('connect', function () {

});

socket.on('disconnect', function () {

});
// socket.on('restringido', function (err) {
//     alert(err);
// });

jQuery('#log-in-form').on('submit', function(e){
    e.preventDefault();
    var usuario = jQuery('[name=user]');
    var password = jQuery('[name=pass]');

    socket.emit('login', {
        user: usuario.val(),
        pass: password.val()
    }, function (msj,tipo) {
        if(msj){
            alert(msj);
            if(tipo == 'p')
                window.location.href = '/dashboard_prof';
            else if(tipo == 's')
                window.location.href = '/dashboard_sec';
        }
    });
});

jQuery('#log-out-form').on('click', function(e){
    e.preventDefault();
    console.log("entre al log out form");
    socket.emit('logout', {

    }, function (msj,tipo) {
        if(msj){
            alert(msj);
            window.location.href = '/';
        }
    });
});
// socket.on('usuario', function(usernameN){
//     var template = jQuery('#nombre').hbs();
//     var html = Mustache.render(template, {
//         logout: usernameN
//     });
// });
//socket.on('login', params, )