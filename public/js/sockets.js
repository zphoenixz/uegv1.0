var socket = io();

//-------------------------------------------------- CONEXION Y DESCONEXION
socket.on('connect', function () {

});

socket.on('disconnect', function () {

});
//============================================================================================== HORARIOS
jQuery('#send_schedule').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#guardar_sche');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Guardando....'); 

    var curso = jQuery('[name=hcur]').val();
    var para = jQuery('[name=hpar]').val();

    var lu1 = jQuery('[name=lu_0800]').val();
    var lu2 = jQuery('[name=lu_0845]').val();
    var lu3 = jQuery('[name=lu_0930]').val();
    var lu4 = jQuery('[name=lu_1015]').val();
    var lu5 = jQuery('[name=lu_1130]').val();
    var lu6 = jQuery('[name=lu_1215]').val();
    var lu7 = jQuery('[name=lu_1300]').val();
    var lu8 = jQuery('[name=lu_1335]').val();
    var lunes = "a/"+lu1+"/"+lu2+"/"+lu3+"/"+lu4+"/"+lu5+"/"+lu6+"/"+lu7+"/"+lu8;

    var ma1 = jQuery('[name=ma_0800]').val();
    var ma2 = jQuery('[name=ma_0845]').val();
    var ma3 = jQuery('[name=ma_0930]').val();
    var ma4 = jQuery('[name=ma_1015]').val();
    var ma5 = jQuery('[name=ma_1130]').val();
    var ma6 = jQuery('[name=ma_1215]').val();
    var ma7 = jQuery('[name=ma_1300]').val();
    var ma8 = jQuery('[name=ma_1335]').val();
    var martes = "b/"+ma1+"/"+ma2+"/"+ma3+"/"+ma4+"/"+ma5+"/"+ma6+"/"+ma7+"/"+ma8;

    var mi1 = jQuery('[name=mi_0800]').val();
    var mi2 = jQuery('[name=mi_0845]').val();
    var mi3 = jQuery('[name=mi_0930]').val();
    var mi4 = jQuery('[name=mi_1015]').val();
    var mi5 = jQuery('[name=mi_1130]').val();
    var mi6 = jQuery('[name=mi_1215]').val();
    var mi7 = jQuery('[name=mi_1300]').val();
    var mi8 = jQuery('[name=mi_1335]').val();
    var miercoles = "c/"+mi1+"/"+mi2+"/"+mi3+"/"+mi4+"/"+mi5+"/"+mi6+"/"+mi7+"/"+mi8;

    var ju1 = jQuery('[name=ju_0800]').val();
    var ju2 = jQuery('[name=ju_0845]').val();
    var ju3 = jQuery('[name=ju_0930]').val();
    var ju4 = jQuery('[name=ju_1015]').val();
    var ju5 = jQuery('[name=ju_1130]').val();
    var ju6 = jQuery('[name=ju_1215]').val();
    var ju7 = jQuery('[name=ju_1300]').val();
    var ju8 = jQuery('[name=ju_1335]').val();
    var jueves = "d/"+ju1+"/"+ju2+"/"+ju3+"/"+ju4+"/"+ju5+"/"+ju6+"/"+ju7+"/"+ju8;

    var vi1 = jQuery('[name=vi_0800]').val();
    var vi2 = jQuery('[name=vi_0845]').val();
    var vi3 = jQuery('[name=vi_0930]').val();
    var vi4 = jQuery('[name=vi_1015]').val();
    var vi5 = jQuery('[name=vi_1130]').val();
    var vi6 = jQuery('[name=vi_1215]').val();
    var vi7 = jQuery('[name=vi_1300]').val();
    var vi8 = jQuery('[name=vi_1335]').val();
    var viernes = "e/"+vi1+"/"+vi2+"/"+vi3+"/"+vi4+"/"+vi5+"/"+vi6+"/"+vi7+"/"+vi8;

    console.log("curso: "+curso,"paralelo: "+para);
    socket.emit('save_sche', {
        cur: curso,
        par: para,
        lunes: lunes,
        martes: martes,
        miercoles: miercoles,
        jueves: jueves,
        viernes: viernes
    }, function (msj,tipo) {
        if(msj){
            alert(msj);
            window.location.href = '/horarios_sec';
        }
    });
});
//============================================================================================== ENTREVISTAS
function myFunction() {

    socket.emit('load_plist', {

    }, function (msj,tipo) {
        var list = jQuery('#lista_profesor');
        if(tipo == "lista"){
            var todosLosDatos = (Object.values(msj)).sort();
            var tipo;
            
            todosLosDatos.forEach(function(element) {
                var nombre = element.nombre;
                var apellidos = element.apellidos;
                var cargo = element.cargo;
                if( cargo == "Profesor"){
                    list.append(`<option value="${nombre+" "+apellidos}">${nombre+" "+apellidos}</option>`);
                }
            });

        }else{
            alert("No existe profesores registrados");
        }
    });
}

function myFunction2() {

    socket.emit('load_elist', {

    }, function (msj,tipo) {
        var list = jQuery('#lista_entrevistas');
        if(tipo == "lista"){
            var todosLosDatos = (Object.values(msj)).sort();
            var tipo;
            console.log("------------------------------------");
            console.log("los datos son----- ", todosLosDatos[0].materia);
            todosLosDatos.forEach(function(element) {
                var nom = element.profesor;
                var mat = element.materia;
                var fech = element.fecha;
                var hor = element.hor;
                list.append(`<tr><td>${nom}</td><td>${mat}</td><td>${fech}</td><td class="text-right">${hor}</td></tr>`);
            });

        }else{
            alert("No existe entrevistas registrados");
        }
    });
}
function myFunction3() {
    
        socket.emit('load_clist', {
    
        }, function (msj,tipo) {
            var list1 = jQuery('#lista_noticias');
            var list2 = jQuery('#lista_actividades');

            if(tipo == "lista"){
                var todosLosDatos = (Object.values(msj)).sort();
                var tipo;
                console.log("------------------------------------");
                todosLosDatos.forEach(function(element) {
                    var tit = element.ctitulo;
                    var fech = element.cfecha;
                    var tip = element.ctipo;
                    var text = element.ctexto;
                    if(tip=="noticia"){
                        list1.append(`<div class=" alert-primary alert-with-icon" data-notify="container"><span data-notify="icon" class="now-ui-icons ui-1_bell-53"></span><h3>${tit}</h3><p><b>${fech}</b>${": "+text} </p></div>`);
                    }else{
                        list2.append(`<div class=" alert-primary alert-with-icon" data-notify="container"><span data-notify="icon" class="now-ui-icons ui-1_bell-53"></span><h3>${tit}</h3><p><b>${fech}</b>${": "+text} </p></div>`);
                    }
                });
    
            }else{
                alert("No existe comunicados registrados");
            }
        });
    }

    function myFunction4() {
        var curs = jQuery('[name=hhcur]').val();
        var par = jQuery('[name=hhpar]').val();
        jQuery('#lista_1').empty();
        jQuery('#lista_2').empty();
        jQuery('#lista_3').empty();
        jQuery('#lista_4').empty();
        jQuery('#lista_5').empty();
        jQuery('#lista_6').empty();
        jQuery('#lista_7').empty();
        jQuery('#lista_8').empty();
        socket.emit('load_holist', {
            curso: curs,
            paralelo: par
        }, function (msj,tipo) {
            var l1= jQuery('#lista_1');
            var l2= jQuery('#lista_2');
            var l3= jQuery('#lista_3');
            var l4= jQuery('#lista_4');
            var l5= jQuery('#lista_5');
            var l6= jQuery('#lista_6');
            var l7= jQuery('#lista_7');
            var l8= jQuery('#lista_8');
            if(tipo == "lista"){
                var todosLosDatos = (Object.values(msj)).sort();
                
                console.log(todosLosDatos);
                l1.append(`<th><b>08:00 - 08:45</b></th>`);
                l2.append(`<th><b>08:45 - 09:30</b></th>`);
                l3.append(`<th><b>09:30 - 10:15</b></th>`);
                l4.append(`<th><b>10:15 - 11:00</b></th>`);
                l5.append(`<th><b>11:30 - 12:15</b></th>`);
                l6.append(`<th><b>12:15 - 13:00</b></th>`);
                l7.append(`<th><b>13:00 - 13:35</b></th>`);
                l8.append(`<th><b>13:35 - 14:10</b></th>`);
                todosLosDatos.forEach(function(element) {
                    var DiaEntero = element.split("/");
                    if(DiaEntero[0] == 'a'){
                        l1.append(`<td class="text-left"><b>${DiaEntero[1]}</b></td>`);
                        l2.append(`<td class="text-left"><b>${DiaEntero[2]}</b></td>`);
                        l3.append(`<td class="text-left"><b>${DiaEntero[3]}</b></td>`);
                        l4.append(`<td class="text-left"><b>${DiaEntero[4]}</b></td>`);
                        l5.append(`<td class="text-left"><b>${DiaEntero[5]}</b></td>`);
                        l6.append(`<td class="text-left"><b>${DiaEntero[6]}</b></td>`);
                        l7.append(`<td class="text-left"><b>${DiaEntero[7]}</b></td>`);
                        l8.append(`<td class="text-left"><b>${DiaEntero[8]}</b></td>`);
                    }else if(DiaEntero[0] == 'b'){
                        l1.append(`<td class="text-left"><b>${DiaEntero[1]}</b></td>`);
                        l2.append(`<td class="text-left"><b>${DiaEntero[2]}</b></td>`);
                        l3.append(`<td class="text-left"><b>${DiaEntero[3]}</b></td>`);
                        l4.append(`<td class="text-left"><b>${DiaEntero[4]}</b></td>`);
                        l5.append(`<td class="text-left"><b>${DiaEntero[5]}</b></td>`);
                        l6.append(`<td class="text-left"><b>${DiaEntero[6]}</b></td>`);
                        l7.append(`<td class="text-left"><b>${DiaEntero[7]}</b></td>`);
                        l8.append(`<td class="text-left"><b>${DiaEntero[8]}</b></td>`);
                    }else if(DiaEntero[0] == 'c'){
                        l1.append(`<td class="text-left"><b>${DiaEntero[1]}</b></td>`);
                        l2.append(`<td class="text-left"><b>${DiaEntero[2]}</b></td>`);
                        l3.append(`<td class="text-left"><b>${DiaEntero[3]}</b></td>`);
                        l4.append(`<td class="text-left"><b>${DiaEntero[4]}</b></td>`);
                        l5.append(`<td class="text-left"><b>${DiaEntero[5]}</b></td>`);
                        l6.append(`<td class="text-left"><b>${DiaEntero[6]}</b></td>`);
                        l7.append(`<td class="text-left"><b>${DiaEntero[7]}</b></td>`);
                        l8.append(`<td class="text-left"><b>${DiaEntero[8]}</b></td>`);
                    }else if(DiaEntero[0] == 'd'){
                        l1.append(`<td class="text-left"><b>${DiaEntero[1]}</b></td>`);
                        l2.append(`<td class="text-left"><b>${DiaEntero[2]}</b></td>`);
                        l3.append(`<td class="text-left"><b>${DiaEntero[3]}</b></td>`);
                        l4.append(`<td class="text-left"><b>${DiaEntero[4]}</b></td>`);
                        l5.append(`<td class="text-left"><b>${DiaEntero[5]}</b></td>`);
                        l6.append(`<td class="text-left"><b>${DiaEntero[6]}</b></td>`);
                        l7.append(`<td class="text-left"><b>${DiaEntero[7]}</b></td>`);
                        l8.append(`<td class="text-left"><b>${DiaEntero[8]}</b></td>`);
                    }else if(DiaEntero[0] == 'e'){
                        l1.append(`<td class="text-left"><b>${DiaEntero[1]}</b></td>`);
                        l2.append(`<td class="text-left"><b>${DiaEntero[2]}</b></td>`);
                        l3.append(`<td class="text-left"><b>${DiaEntero[3]}</b></td>`);
                        l4.append(`<td class="text-left"><b>${DiaEntero[4]}</b></td>`);
                        l5.append(`<td class="text-left"><b>${DiaEntero[5]}</b></td>`);
                        l6.append(`<td class="text-left"><b>${DiaEntero[6]}</b></td>`);
                        l7.append(`<td class="text-left"><b>${DiaEntero[7]}</b></td>`);
                        l8.append(`<td class="text-left"><b>${DiaEntero[8]}</b></td>`);
                    }
                    
                });
    
            }else{
                alert("No existen horarios registrados");
            }
        });
    }
var ns = [];
var labels = [];
var p1s = [];
var p2s = [];
var p3s = [];
function myFunction5() {
    console.log("entre!!!!");

    for(var i=1;i<=cantidad_alumnos;i++){
        ns[(i-1)] = [];
        labels[(i-1)] = [];
        for(var j=1;j<=6;j++){
            ns[(i-1)][(j-1)] = jQuery(`[name=${i}${j}]`).val();
            if(j<=3)
                labels[(i-1)][(j-1)] = jQuery(`#${i}${j}`);
        }
        
    }
    for(var i=1;i<=cantidad_alumnos;i++){
        p1s[(i-1)] = Math.round((ns[(i-1)][0]*0.1+ns[(i-1)][1]*0.35+ns[(i-1)][2]*0.35+ns[(i-1)][3]*0.1)*100)/100;
        p2s[(i-1)] = Math.round((ns[(i-1)][4]*0.05+ns[(i-1)][5]*0.05)*100)/100;
        p3s[(i-1)] = Math.round((p1s[(i-1)] + p2s[(i-1)])*100)/100;
    }
    for(var i=1;i<=cantidad_alumnos;i++){
        for(var j=1;j<=3;j++){
            labels[(i-1)][(j-1)].css("font-weight","bold").text(p1s[(i-1)].toString()); 
            labels[(i-1)][(j-1)].css("font-weight","bold").text(p2s[(i-1)].toString()); 
            labels[(i-1)][(j-1)].css("font-weight","bold").text(p3s[(i-1)].toString()); 
        }
        
    }
}
var cantidad_alumnos;//<---------------------------------------------------------------------CANTIDAD DE ALUMNOS
function myFunction6() {
    jQuery('#lista_curso_nota').empty();
    var ncur = jQuery('[name=ncur]');
    var npar = jQuery('[name=npar]');
    var list = jQuery('#lista_curso_nota');
    socket.emit('load_list', {
        curso: ncur.val(),
        paralelo: npar.val()
    }, function (msj,tipo) {
        if(tipo == "lista"){
            var nombre_completo = (Object.values(msj)).sort();
            cantidad_alumnos = 0;

            nombre_completo.forEach(function(element) {
                cantidad_alumnos++;
                var arr = element.split(" ");
                var paterno = arr[0];
                var materno = arr[1];
                var nombres = arr[2];

                list.append(`<tr>
                <td class="not"style="width:50px;"align="center">${cantidad_alumnos}</td>
                <td class="not"style="width:250px"align="center">${paterno+" "+materno+" "+nombres}</td>
                <td class="not"><input name="${cantidad_alumnos}1"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}2"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}3"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}4"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><label id="${cantidad_alumnos}1"style="width:50px"></label></td>
                <td class="not"><input name="${cantidad_alumnos}5"onchange="myFunction5()"type="number"style="width:50px" min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}6"onchange="myFunction5()"type="number"style="width:50px" min="0"max="100"required="required"></td>
                <td class="not"><label id="${cantidad_alumnos}2"style="width:50px"></label></td>
                <td class="not"><label id="${cantidad_alumnos}3"style="width:50px"></label></td>
                </tr>`);
            });
        }else{
            alert("El curso todavia no cuenta con Estudiantes inscritos");
        }
    });
}
    
//-------------------------------------------------- ENVIAR DATOS ENTREVISTA
jQuery('#send_ent').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#guardar_per');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Guardando....'); 

    var prof = jQuery('[name=eprof]');
    var mate = jQuery('[name=epmat]');
    var fech = jQuery('[name=epf]');
    var hor = jQuery('[name=eph]');

    socket.emit('save_ent', {
        prof: prof.val(),
        mate: mate.val(),
        fech: fech.val(),
        hor: hor.val()
    }, function (msj,tipo) {
        if(msj){
            alert(msj);
            window.location.href = '/entrevistas_sec';
        }
    });
});
//============================================================================================== ENTREVISTAS
//-------------------------------------------------- ENVIAR DATOS COMUNICADOS
jQuery('#send_com').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#guardar_com');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Registrando....'); 

    var ctipo = jQuery('[name=ctipo]');
    var cfecha = jQuery('[name=cfecha]');
    var ctexto = jQuery('[name=ctexto]');
    var ctitulo = jQuery('[name=ctitulo]');
    

    socket.emit('save_com', {
        ctipo: ctipo.val(),
        cfecha: cfecha.val(),
        ctexto: ctexto.val(),
        ctitulo: ctitulo.val()
    }, function (msj,tipo) {
        if(msj){
            alert(msj);
            window.location.href = '/comunicados_sec';
        }
    });
});

//============================================================================================== LISTAS CURSOS
jQuery('#get_list').on('submit', function(e){
    e.preventDefault();
    jQuery('#lista_curso').empty();
    var lcur = jQuery('[name=lcur]');
    var lpar = jQuery('[name=lpar]');
    var list = jQuery('#lista_curso');
    socket.emit('load_list', {
        curso: lcur.val(),
        paralelo: lpar.val()
    }, function (msj,tipo) {
        if(tipo == "lista"){
            console.log("La lista extraida!!!");

            //----------------------------------------------
            var key;
            for(key in msj){
                if(msj.hasOwnProperty(key)){
                    console.log(key + " = " +msj[key]);
                }
            }
            //----------------------------------------------
            

            var nombre_completo = (Object.values(msj)).sort();
            var nro = 0;

            nombre_completo.forEach(function(element) {
                nro++;
                var arr = element.split(" ");
                var paterno = arr[0];
                var materno = arr[1];
                var nombres = arr[2];
                list.append(`<tr><td>${nro}</td><td>${paterno}</td><td>${materno}</td><td>${nombres}</td></tr>`);
            });
        }else{
            alert("El curso todavia no cuenta con Estudiantes inscritos");
        }
    });
});
//============================================================================================== PERSONAL
//-------------------------------------------------- ENVIAR DATOS PERSONAL
jQuery('#send_personal').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#guardar_per');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Guardando....'); 

    var ppap = jQuery('[name=ppap]');
    var ppn = jQuery('[name=ppn]');
    var ppfn = jQuery('[name=ppfn]');
    var ppci = jQuery('[name=ppci]');
    var ppdep1 = jQuery('[name=ppdep1]');
    var ppdir = jQuery('[name=ppdir]');
    var ppcar = jQuery('[name=ppcar]');
    var ppmat = jQuery('[name=ppmat]');
    var pcont = jQuery('[name=pcont]');

    socket.emit('save_per', {
        ppap: ppap.val().trim(),
        ppn: ppn.val().trim(),
        ppfn: ppfn.val(),
        ppci: ppci.val(),
        ppdep1: ppdep1.val(),
        ppdir: ppdir.val(),
        ppcar: ppcar.val(),
        ppmat: ppmat.val(),
        pcont: pcont.val()
    }, function (msj,tipo) {
        if(msj){
            if(tipo == '0'){
                alert(msj);
                window.location.href = '/personal';
            }else if(tipo == '1'){
                if(confirm(msj)){
                    socket.emit('update_per', {//update_per
                    }, function (msj,tipo) {
                    });
                    alert("Se actualizo al personal");
                    window.location.href = '/personal';
                }else{
                    alert("No se actualizo al personal");
                    window.location.href = '/personal';
                }
            }else{
                alert(msj);
                window.location.href = '/personal';
            }
        }
    });
});
//-------------------------------------------------- BORRAR PERSONAL
jQuery('#borrar_per').on('click', function(e){
    e.preventDefault();
    var ppci = jQuery('[name=ppci]').val();
    var BotonBorrar= jQuery('#borrar_per');
    if(ppci == ""){
        alert("Primero debe buscar el carnet de un personal valido!")
        document.getElementById("personal_tittle").scrollIntoView({ behavior: 'smooth'});
    }else{
        
        BotonBorrar.attr('disabled', 'disabled').prop('value', 'Eliminando...');
        if(confirm("Seguro que deseas borrar?")){
            socket.emit('delete_per', {
                ci: ppci
            }, function (/*msj,tipo*/) {
                BotonBorrar.removeAttr('disabled').prop('value', 'Eliminar'); 
                alert("Se borro al personal");
                window.location.href = '/personal';
            });
        }else{
            BotonBorrar.removeAttr('disabled').prop('value', 'Eliminar'); 
            alert("No se borro al personal");
        }
    }
});
//-------------------------------------------------- BUSCAR POR CARNET
jQuery('#search_personal').on('submit', function(e){
    e.preventDefault();
    
    var buscado = (jQuery('[name=p_buscar]').val()).toString();
    var BotonBuscar= jQuery('#search_data2');

    BotonBuscar.attr('disabled', 'disabled').prop('value', 'Buscando....'); 
    socket.emit('buscar_personal', {
        ci: buscado
    }, function (inf,tipo) {
        if(tipo == 'personal'){

            var ppap = jQuery('[name=ppap]').prop('value', inf.apellidos).css({ 'color': 'green', 'font-size': '120%' });
            var ppn = jQuery('[name=ppn]').prop('value', inf.nombre).css({ 'color': 'green', 'font-size': '120%' });
            var ppfn = jQuery('[name=ppfn]').prop('value', inf.fech_nac).css({ 'color': 'green', 'font-size': '120%' });
            var ppci = jQuery('[name=ppci]').prop('value', buscado).css({ 'color': 'green', 'font-size': '120%' });
            var ppdep1 = jQuery('[name=ppdep1]').prop('value', inf.ci_ext).css({ 'color': 'green', 'font-size': '120%', 'height':'120%' });
            var ppdir = jQuery('[name=ppdir]').prop('value', inf.direccion).css({ 'color': 'green', 'font-size': '120%' });
            var ppcar = jQuery('[name=ppcar]').prop('value', inf.cargo).css({ 'color': 'green', 'font-size': '120%' });
            var ppmat = jQuery('[name=ppmat]').prop('value', inf.materia).css({ 'color': 'green', 'font-size': '120%', 'height':'50%'});
            var pcont = jQuery('[name=pcont]').prop('value', inf.contra).css({ 'color': 'green', 'font-size': '120%' });

            document.getElementById("personal_tittle").scrollIntoView({ behavior: 'smooth'});
        }else{
            alert("No existen resultados");
        }
        BotonBuscar.removeAttr('disabled').prop('value', 'Buscar'); 
    });
});
//-------------------------------------------------- LOGIN Y LOGOUT
jQuery('#log-in-form').on('submit', function(e){
    e.preventDefault();
    var usuario = jQuery('[name=user]');
    var password = jQuery('[name=pass]');
    var BotonLog= jQuery('#loguear');
    BotonLog.attr('disabled', 'disabled').prop('value', 'Ingresando...');
    socket.emit('login', {
        user: usuario.val(),
        pass: password.val()
    }, function (msj,tipo) {
        BotonLog.removeAttr('disabled').prop('value', 'INGRESAR'); 
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
//============================================================================================== INSCRIPCION
//-------------------------------------------------- BORRAR ESTUDIANTE
jQuery('#borrar_est').on('click', function(e){
    e.preventDefault();
    var eci = jQuery('[name=eci]').val();
    var BotonBorrar= jQuery('#borrar_est');
    if(eci == ""){
        alert("Primero debe buscar el carnet de un estudiante valido!")
        document.getElementById("student_tittle").scrollIntoView({ behavior: 'smooth'});
    }else{
        
        BotonBorrar.attr('disabled', 'disabled').prop('value', 'Eliminando...');
        if(confirm("Seguro que deseas borrar?")){
            socket.emit('delete_est', {
                ci: eci
            }, function (/*msj,tipo*/) {
                BotonBorrar.removeAttr('disabled').prop('value', 'Eliminar'); 
                alert("Se borro al estudiante");
                window.location.href = '/dashboard_sec';
            });
            
        }else{
            BotonBorrar.removeAttr('disabled').prop('value', 'Eliminar'); 
            alert("No se borro al estudiante");
        }
    }
});
//-------------------------------------------------- BORRAR PADRE
jQuery('#borrar_dad').on('click', function(e){
    e.preventDefault();
    var pci = jQuery('[name=pci]').val();
    var BotonBorrar= jQuery('#borrar_dad');
    if(pci == ""){
        alert("Primero debe buscar el carnet de un Tutor valido!")
        document.getElementById("student_tittle").scrollIntoView({ behavior: 'smooth'});
    }else{
        var BotonBorrar= jQuery('#borrar_dad');
        BotonBorrar.attr('disabled', 'disabled').prop('value', 'Eliminando...');
        if(confirm("Seguro que deseas borrar?")){
            socket.emit('delete_dad', {
                ci: pci
            }, function (/*msj,tipo*/) {
                BotonBorrar.removeAttr('disabled').prop('value', 'Eliminar'); 
                alert("Se borro al Tutor");
                window.location.href = '/dashboard_sec';
            });
            
        }else{
            BotonBorrar.removeAttr('disabled').prop('value', 'Eliminar'); 
            alert("No se borro al estudiante");
        }
    }
});
//-------------------------------------------------- BUSCAR POR CARNET
jQuery('#search_user').on('submit', function(e){
    e.preventDefault();
    
    var buscado = (jQuery('[name=a_buscar]').val()).toString();
    var BotonBuscar= jQuery('#search_data');

    BotonBuscar.attr('disabled', 'disabled').prop('value', 'Buscando....'); 
    socket.emit('buscar_usuario', {
        ci: buscado
    }, function (inf,tipo) {
        if(tipo == 'padre'){
            var pci = jQuery('[name=pci]').prop('value', buscado).css({ 'color': 'green', 'font-size': '120%' });
            var pn = jQuery('[name=pn]').prop('value', inf.nombre).css({ 'color': 'green', 'font-size': '120%' });
            var pap = jQuery('[name=pap]').prop('value', inf.paterno).css({ 'color': 'green', 'font-size': '120%' });
            var pam = jQuery('[name=pam]').prop('value', inf.materno).css({ 'color': 'green', 'font-size': '120%' });
            var pdep1 = jQuery('[name=pdep1]').prop('value', inf.ci_ext).css({ 'color': 'green', 'font-size': '120%', 'height': '120%' });
            var pdir = jQuery('[name=pdir]').prop('value', inf.direccion).css({ 'color': 'green', 'font-size': '120%' });
            var ptel = jQuery('[name=ptel]').prop('value', inf.telefono).css({ 'color': 'green', 'font-size': '120%' });
            var pocu = jQuery('[name=pocu]').prop('value', inf.ocupacion).css({ 'color': 'green', 'font-size': '120%' });
            var pgrado = jQuery('[name=pgrado]').prop('value', inf.grado_academico).css({ 'color': 'green', 'font-size': '120%' });
            var ppar = jQuery('[name=ppar]').prop('value', inf.parentesco).css({ 'color': 'green', 'font-size': '120%', 'height': '120%' });

            document.getElementById("dad_tittle").scrollIntoView({ behavior: 'smooth'});
        }else if(tipo == 'estudiante'){
            var ecpp = jQuery('[name=ecpp]').prop('value', inf.ci_padre).css({ 'color': 'green', 'font-size': '120%' });
            var eap = jQuery('[name=eap]').prop('value', inf.paterno).css({ 'color': 'green', 'font-size': '120%' });
            var eam = jQuery('[name=eam]').prop('value', inf.materno).css({ 'color': 'green', 'font-size': '120%' });
            var en = jQuery('[name=en]').prop('value', inf.nombre).css({ 'color': 'green', 'font-size': '120%' });
            var eci = jQuery('[name=eci]').prop('value', buscado).css({ 'color': 'green', 'font-size': '120%' });
            var edep1 = jQuery('[name=edep1]').prop('value', inf.ci_ext).css({ 'color': 'green', 'font-size': '120%', 'height': '120%'});
            var efn = jQuery('[name=efn]').prop('value', inf.fech_nac).css({ 'color': 'green', 'font-size': '120%' });
            var esex = jQuery('[name=esex]').prop('value', inf.sexo).css({ 'color': 'green', 'font-size': '120%', 'height': '120%'});
            var ep = jQuery('[name=ep]').prop('value', inf.pais_nac).css({ 'color': 'green', 'font-size': '120%' });
            var edep2 = jQuery('[name=edep2]').prop('value', inf.dpto_nac).css({ 'color': 'green', 'font-size': '120%','height': '120%' });
            var eprov = jQuery('[name=eprov]').prop('value', inf.prov_nac).css({ 'color': 'green', 'font-size': '120%' });
            var eloc = jQuery('[name=eloc]').prop('value', inf.loca_nac).css({ 'color': 'green', 'font-size': '120%' });
            var ecur = jQuery('[name=ecur]').prop('value', inf.curso).css({ 'color': 'green', 'font-size': '120%' });
            var epar = jQuery('[name=epar]').prop('value', inf.paralelo).css({ 'color': 'green', 'font-size': '120%' });
            document.getElementById("student_tittle").scrollIntoView({ behavior: 'smooth'});
        }else{
            alert("No existen resultados");
        }
        BotonBuscar.removeAttr('disabled').prop('value', 'Buscar'); 
    });
});

//-------------------------------------------------- ENVIAR DATOS ESTUDIANTE
jQuery('#send_data1').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#guardar_est');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Guardando....'); 

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
        eap: eap.val().trim(),
        eam: eam.val().trim(),
        en: en.val().trim(),
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
//-------------------------------------------------- ENVIAR DATOS PADRE
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
                    var buscado = (jQuery('[name=a_buscar]').val()).toString();
                    socket.emit('update_dad', {
                        antiguo_ci: buscado  
                    }, function (msj,tipo) { 
                    });
                    alert("Se actualizo el Tutor");
                    window.location.href = '/dashboard_sec';
                }else{
                    alert("No se actualizo el Tutor");
                    window.location.href = '/dashboard_sec';
                }
                
            }
        }
    });
});