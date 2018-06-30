var socket = io();

socket.on('connect', function () {

});

socket.on('disconnect', function () {

});

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
    //console.log("entre al log out form");
    socket.emit('logout', {

    }, function (msj,tipo) {
        if(msj){
            alert(msj);
            window.location.href = '/';
        }
    });
});

jQuery('#nave-in-pag').on('click', function(){
    socket.emit('navegar', {
        
    }, function (){

    });
});

jQuery('#nave-in-pag').on('click', function(){
    socket.emit('navegar', {
        
    }, function (){

    });
});


jQuery('#send_data1').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#guardar_est');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Guardando....'); ;

    var ecpp = jQuery('[name=ecpp]');
    var eap = jQuery('[name=eap]');
    var eam = jQuery('[name=eam]');
    var en = jQuery('[name=en]');
    var eci = jQuery('[name=eci]');
    var edep1 = jQuery('[name=edep1]');
    var efn = jQuery('[name=efn]');
    var esex = jQuery('[name=esex]');
    var ep = jQuery('[name=ep]');
    var edep2 = jQuery('[name=edep2]');
    var eprov = jQuery('[name=eprov]');
    var eloc = jQuery('[name=eloc]');
    var ecur = jQuery('[name=ecur]');
    var epar = jQuery('[name=epar]');

    socket.emit('save_est', {
        ecpp: ecpp.val(),
        eap: eap.val(),
        eam: eam.val(),
        en: en.val(),
        eci: eci.val(),
        edep1: edep1.val(),
        efn: efn.val(),
        esex: esex.val(),
        ep: ep.val(),
        edep2: edep2.val(),
        eprov: eprov.val(),
        eloc: eloc.val(),
        ecur: ecur.val(),
        epar: epar.val()

    }, function (msj,tipo) {
        if(msj){
            
            if(tipo == '0'){
                alert(msj);
                window.location.href = '/dashboard_sec';
            }else if(tipo == '1'){
                if(confirm(msj)){
                    socket.emit('update_est', {
                    }, function (msj,tipo) {
                    });
                    alert("Se actualizo al estudiante");
                    window.location.href = '/dashboard_sec';
                }else{
                    alert("No se actualizo al estudiante");
                    window.location.href = '/dashboard_sec';
                }
            }else{
                alert(msj);
                window.location.href = '/dashboard_sec';
            }
        }
    });
});

jQuery('#send_data2').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar= jQuery('#guardar_dad');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Guardando....'); ;

    var pci = jQuery('[name=pci]');
    var pn = jQuery('[name=pn]');
    var pap = jQuery('[name=pap]');
    var pam = jQuery('[name=pam]');
    var pdep1 = jQuery('[name=pdep1]');
    var pdir = jQuery('[name=pdir]');
    var ptel = jQuery('[name=ptel]');
    var pocu = jQuery('[name=pocu]');
    var pgrado = jQuery('[name=pgrado]');
    var ppar = jQuery('[name=ppar]');

    socket.emit('save_dad', {
        pci: pci.val(),
        pn: pn.val(),
        pap: pap.val(),
        pam: pam.val(),
        pdep1: pdep1.val(),
        pdir: pdir.val(),
        ptel: ptel.val(),
        pocu: pocu.val(),
        pgrado: pgrado.val(),
        ppar: ppar.val()
    }, function (msj,tipo) {
        if(msj){
            if(tipo == '0'){
                alert(msj);
                window.location.href = '/dashboard_sec';
            }else if(tipo == '1'){
                if(confirm(msj)){
                    socket.emit('update_dad', {
                    }, function (msj,tipo) { 
                    });
                    alert("Se actualizo al padre");
                    window.location.href = '/dashboard_sec';
                }else{
                    alert("No se actualizo al padre");
                    window.location.href = '/dashboard_sec';
                }
                
            }
        }
    });
});