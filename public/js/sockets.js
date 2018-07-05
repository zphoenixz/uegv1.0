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
    // var key;
    for(var i=1;i<=cantidad_alumnos;i++){
        ns[(i-1)] = [];
        labels[(i-1)] = [];
        for(var j=1;j<=6;j++){
            ns[(i-1)][(j-1)] = jQuery(`[name=${i}${j}]`).val();
            if(j<=3){
                labels[(i-1)][(j-1)] = jQuery(`#${i}${i}${j}`);
            }
        }
        
    }
    for(var i=1;i<=cantidad_alumnos;i++){
        p1s[(i-1)] = Math.round((ns[(i-1)][0]*0.1+ns[(i-1)][1]*0.35+ns[(i-1)][2]*0.35+ns[(i-1)][3]*0.1)*100)/100;
        p2s[(i-1)] = Math.round((ns[(i-1)][4]*0.05+ns[(i-1)][5]*0.05)*100)/100;
    }
    for(var i=1;i<=cantidad_alumnos;i++){
        p3s[(i-1)] = Math.round((p1s[(i-1)] + p2s[(i-1)])*100)/100;
    }
    // console.log("Notas: ps1:"+ p1s[0]+", ps2: "+p2s[0]+", ps3: "+p3s[0]);
    for(var i=1;i<=cantidad_alumnos;i++){
        labels[(i-1)][0].css("font-weight","bold").text(p1s[(i-1)].toString()); 
        labels[(i-1)][1].css("font-weight","bold").text(p2s[(i-1)].toString()); 
        labels[(i-1)][2].css("font-weight","bold").text(p3s[(i-1)].toString()); 
    }
}
var carnets = [];
var cantidad_alumnos;//<---------------------------------------------------------------------CANTIDAD DE ALUMNOS
function myFunction6() {
    jQuery('#lista_curso_nota').empty();
    var ncur = jQuery('[name=ncur]');
    var npar = jQuery('[name=npar]');
    var list11 = jQuery('#lista_curso_nota');
    socket.emit('load_list', {
        curso: ncur.val(),
        paralelo: npar.val()
    }, function (msj,tipo) {
        if(tipo == "lista"){
            var nombre_completo = (Object.values(msj)).sort();
            cantidad_alumnos = 0;
            //----------------------------------------------
            var key;var i=0;
            for(key in msj){
                if(msj.hasOwnProperty(key)){
                    carnets[i] = msj[key]+"/"+key; i++;
                    //console.log(key + " = " +msj[key]);
                }
            }
            //----------------------------------------------
            nombre_completo.forEach(function(element) {
                cantidad_alumnos++;
                var arr = element.split(" ");
                var paterno = arr[0];
                var materno = arr[1];
                var nombres = arr[2];

                list11.append(`<tr>
                <td class="not"style="width:50px;"align="center">${cantidad_alumnos}</td>
                <td class="not"style="width:250px"align="center">${paterno+" "+materno+" "+nombres}</td>
                <td class="not"><input name="${cantidad_alumnos}1"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}2"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}3"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}4"onchange="myFunction5()"type="number"style="width:50px"min="0"max="100"required="required"></td>
                <td class="not"><label id="${cantidad_alumnos}${cantidad_alumnos}1"style="width:50px"></label></td>
                <td class="not"><input name="${cantidad_alumnos}5"onchange="myFunction5()"type="number"style="width:50px" min="0"max="100"required="required"></td>
                <td class="not"><input name="${cantidad_alumnos}6"onchange="myFunction5()"type="number"style="width:50px" min="0"max="100"required="required"></td>
                <td class="not"><label id="${cantidad_alumnos}${cantidad_alumnos}2"style="width:50px"></label></td>
                <td class="not"><label id="${cantidad_alumnos}${cantidad_alumnos}3"style="width:50px"></label></td>
                </tr>`);
            });
        }else{
            alert("El curso todavia no cuenta con Estudiantes inscritos");
        }
    });
}

function myFunction7() {
    var input_nombre = jQuery('#nom_nota');
    var input_apellidos = jQuery('#ap_nota');
    var input_fecha = jQuery('#fe_nota');

    var lista_notas = jQuery('#promedios');
    jQuery('#promedios').empty();
    socket.emit('recuperar_notas', {
 
    }, function (res) {
        input_nombre.attr('disabled', 'disabled').prop('value', `${res.nombre_nota}`).css({ 'color': 'green', 'font-size': '120%' }); 
        input_apellidos.attr('disabled', 'disabled').prop('value', `${res.pat_nota+" "+res.mat_nota}`).css({ 'color': 'green', 'font-size': '120%' }); 
        input_fecha.attr('disabled', 'disabled').prop('value', `${res.fec_nota}`).css({ 'color': 'green', 'font-size': '120%' }); 
// var mat, fis, bio, geo, lit, art, mus, edu, qui, fil, civ, psi, ing;
        var pmat = (Math.round((Number(res.mat1)+Number(res.mat2)+Number(res.mat3)+Number(res.mat4))/4)*100/100).toString();
        var pfis = (Math.round((Number(res.fis1)+Number(res.fis2)+Number(res.fis3)+Number(res.fis4))/4)*100/100).toString();
        var pbio = (Math.round((Number(res.bio1)+Number(res.bio2)+Number(res.bio3)+Number(res.bio4))/4)*100/100).toString();
        var pgeo = (Math.round((Number(res.geo1)+Number(res.geo2)+Number(res.geo3)+Number(res.geo4))/4)*100/100).toString();
        var plit = (Math.round((Number(res.lit1)+Number(res.lit2)+Number(res.lit3)+Number(res.lit4))/4)*100/100).toString();
        var part = (Math.round((Number(res.art1)+Number(res.art2)+Number(res.art3)+Number(res.art4))/4)*100/100).toString();
        var pmus = (Math.round((Number(res.mus1)+Number(res.mus2)+Number(res.mus3)+Number(res.mus4))/4)*100/100).toString();
        var pedu = (Math.round((Number(res.edu1)+Number(res.edu2)+Number(res.edu3)+Number(res.edu4))/4)*100/100).toString();
        var pqui = (Math.round((Number(res.qui1)+Number(res.qui2)+Number(res.qui3)+Number(res.qui4))/4)*100/100).toString();
        var pfil = (Math.round((Number(res.fil1)+Number(res.fil2)+Number(res.fil3)+Number(res.fil4))/4)*100/100).toString();
        var pciv = (Math.round((Number(res.civ1)+Number(res.civ2)+Number(res.civ3)+Number(res.civ4))/4)*100/100).toString();
        var ppsi = (Math.round((Number(res.psi1)+Number(res.psi2)+Number(res.psi3)+Number(res.psi4))/4)*100/100).toString();
        var ping = (Math.round((Number(res.ing1)+Number(res.ing2)+Number(res.ing3)+Number(res.ing4))/4)*100/100).toString();

        lista_notas.append(`<tr><td>Matemáticas     </td><td>${res.mat1}</td><td>${res.mat2}</td><td>${res.mat3}</td><td>${res.mat4}</td><td>${pmat}</td></tr>`);
        lista_notas.append(`<tr><td>Física          </td><td>${res.fis1}</td><td>${res.fis2}</td><td>${res.fis3}</td><td>${res.fis4}</td><td>${pfis}</td></tr>`);
        lista_notas.append(`<tr><td>Biología        </td><td>${res.bio1}</td><td>${res.bio2}</td><td>${res.bio3}</td><td>${res.bio4}</td><td>${pbio}</td></tr>`);
        lista_notas.append(`<tr><td>Geografía       </td><td>${res.geo1}</td><td>${res.geo2}</td><td>${res.geo3}</td><td>${res.geo4}</td><td>${pgeo}</td></tr>`);
        lista_notas.append(`<tr><td>Literatura      </td><td>${res.lit1}</td><td>${res.lit2}</td><td>${res.lit3}</td><td>${res.lit4}</td><td>${plit}</td></tr>`);
        lista_notas.append(`<tr><td>Artes Plasticas </td><td>${res.art1}</td><td>${res.art2}</td><td>${res.art3}</td><td>${res.art4}</td><td>${part}</td></tr>`);
        lista_notas.append(`<tr><td>Música          </td><td>${res.mus1}</td><td>${res.mus2}</td><td>${res.mus3}</td><td>${res.mus4}</td><td>${pmus}</td></tr>`);
        lista_notas.append(`<tr><td>Educacion Física</td><td>${res.edu1}</td><td>${res.edu2}</td><td>${res.edu3}</td><td>${res.edu4}</td><td>${pedu}</td></tr>`);
        lista_notas.append(`<tr><td>Química         </td><td>${res.qui1}</td><td>${res.qui2}</td><td>${res.qui3}</td><td>${res.qui4}</td><td>${pqui}</td></tr>`);
        lista_notas.append(`<tr><td>Filosofia       </td><td>${res.fil1}</td><td>${res.fil2}</td><td>${res.fil3}</td><td>${res.fil4}</td><td>${pfil}</td></tr>`);
        lista_notas.append(`<tr><td>Cívica          </td><td>${res.civ1}</td><td>${res.civ2}</td><td>${res.civ3}</td><td>${res.civ4}</td><td>${pciv}</td></tr>`);
        lista_notas.append(`<tr><td>Psicologia      </td><td>${res.psi1}</td><td>${res.psi2}</td><td>${res.psi3}</td><td>${res.psi4}</td><td>${ppsi}</td></tr>`);
        lista_notas.append(`<tr><td>Ingles          </td><td>${res.ing1}</td><td>${res.ing2}</td><td>${res.ing3}</td><td>${res.ing4}</td><td>${ping}</td></tr>`);
    });

    // mat, fis, bio, geo, lit, art, mus, edu, qui, fil, civ, psi, ing;

}
//================================================================================================ NOTAS
//-------------------------------------------------- INGRESAR A VER MIS NOTAS


jQuery('#require_nota').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#buscar_nota');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Buscando....'); 

    var buscado = jQuery('[name=est_ci]').val();
    var fech = jQuery('[name=fec_ci]').val();
    socket.emit('buscar_usuario', {
        ci: buscado
    }, function (inf,tipo) {
        if(tipo == 'estudiante'){
            if(fech == inf.fech_nac){
                // nombre_nota = inf.nombre;
                // pat_nota = inf.paterno;
                // mat_nota = inf.materno;
                // fec_nota = inf.fech_nac;

                var todosLosDatos = (Object.values(inf.Bimestres)).sort();
                //PRIMER BIMESTRE------------------------------------------------------
                var mat1 = (todosLosDatos[0].Matematicas.nota).split("/")[2];
                var fis1 = (todosLosDatos[0].Fisica.nota).split("/")[2];
                var bio1 = (todosLosDatos[0].Biologia.nota).split("/")[2];
                var geo1 = (todosLosDatos[0].Geografia.nota).split("/")[2];

                var lit1 = (todosLosDatos[0].Literatura.nota).split("/")[2];
                var art1 = (todosLosDatos[0].Artes_Plasticas.nota).split("/")[2];
                var mus1 = (todosLosDatos[0].Musica.nota).split("/")[2];
                var edu1 = (todosLosDatos[0].Educ_Fisica.nota).split("/")[2];

                var qui1 = (todosLosDatos[0].Quimica.nota).split("/")[2];
                var fil1 = (todosLosDatos[0].Filosofia.nota).split("/")[2];
                var civ1 = (todosLosDatos[0].Civica.nota).split("/")[2];
                var psi1 = (todosLosDatos[0].Psicologia.nota).split("/")[2];
                var ing1 = (todosLosDatos[0].Ingles.nota).split("/")[2];
                 //SEGUNDO BIMESTRE------------------------------------------------------
                var mat2 = (todosLosDatos[1].Matematicas.nota).split("/")[2];
                var fis2 = (todosLosDatos[1].Fisica.nota).split("/")[2];
                var bio2 = (todosLosDatos[1].Biologia.nota).split("/")[2];
                var geo2 = (todosLosDatos[1].Geografia.nota).split("/")[2];
 
                var lit2 = (todosLosDatos[1].Literatura.nota).split("/")[2];
                var art2 = (todosLosDatos[1].Artes_Plasticas.nota).split("/")[2];
                var mus2 = (todosLosDatos[1].Musica.nota).split("/")[2];
                var edu2 = (todosLosDatos[1].Educ_Fisica.nota).split("/")[2];
 
                var qui2 = (todosLosDatos[1].Quimica.nota).split("/")[2];
                var fil2 = (todosLosDatos[1].Filosofia.nota).split("/")[2];
                var civ2 = (todosLosDatos[1].Civica.nota).split("/")[2];
                var psi2 = (todosLosDatos[1].Psicologia.nota).split("/")[2];
                var ing2 = (todosLosDatos[1].Ingles.nota).split("/")[2];
                //TERCER BIMESTRE------------------------------------------------------
                var mat3 = (todosLosDatos[2].Matematicas.nota).split("/")[2];
                var fis3 = (todosLosDatos[2].Fisica.nota).split("/")[2];
                var bio3 = (todosLosDatos[2].Biologia.nota).split("/")[2];
                var geo3 = (todosLosDatos[2].Geografia.nota).split("/")[2];

                var lit3 = (todosLosDatos[2].Literatura.nota).split("/")[2];
                var art3 = (todosLosDatos[2].Artes_Plasticas.nota).split("/")[2];
                var mus3 = (todosLosDatos[2].Musica.nota).split("/")[2];
                var edu3 = (todosLosDatos[2].Educ_Fisica.nota).split("/")[2];

                var qui3 = (todosLosDatos[2].Quimica.nota).split("/")[2];
                var fil3 = (todosLosDatos[2].Filosofia.nota).split("/")[2];
                var civ3 = (todosLosDatos[2].Civica.nota).split("/")[2];
                var psi3 = (todosLosDatos[2].Psicologia.nota).split("/")[2];
                var ing3 = (todosLosDatos[2].Ingles.nota).split("/")[2];
                 //CUARTO BIMESTRE------------------------------------------------------
                 var mat4 = (todosLosDatos[3].Matematicas.nota).split("/")[2];
                 var fis4 = (todosLosDatos[3].Fisica.nota).split("/")[2];
                 var bio4 = (todosLosDatos[3].Biologia.nota).split("/")[2];
                 var geo4 = (todosLosDatos[3].Geografia.nota).split("/")[2];
 
                 var lit4 = (todosLosDatos[3].Literatura.nota).split("/")[2];
                 var art4 = (todosLosDatos[3].Artes_Plasticas.nota).split("/")[2];
                 var mus4 = (todosLosDatos[3].Musica.nota).split("/")[2];
                 var edu4 = (todosLosDatos[3].Educ_Fisica.nota).split("/")[2];

                 var qui4 = (todosLosDatos[3].Quimica.nota).split("/")[2];
                 var fil4 = (todosLosDatos[3].Filosofia.nota).split("/")[2];
                 var civ4 = (todosLosDatos[3].Civica.nota).split("/")[2];
                 var psi4 = (todosLosDatos[3].Psicologia.nota).split("/")[2];
                 var ing4 = (todosLosDatos[3].Ingles.nota).split("/")[2];
                // console.log("bimestrees   " + todosLosDatos[0].Ingles.nota);
                // console.log("bimestrees   " + (todosLosDatos[0].Ingles.nota).split("/")[2]);
                socket.emit('guardar_notas', {
                    nom: inf.nombre,
                    pat: inf.paterno,
                    mat: inf.materno,
                    fec: inf.fech_nac,

                    mat1: mat1,
                    fis1: fis1,
                    bio1: bio1,
                    geo1: geo1,
                    lit1: lit1,
                    art1: art1,
                    mus1: mus1,
                    edu1: edu1,
                    qui1: qui1,
                    fil1: fil1,
                    civ1: civ1,
                    psi1: psi1,
                    ing1: ing1,

                    mat2: mat2,
                    fis2: fis2,
                    bio2: bio2,
                    geo2: geo2,
                    lit2: lit2,
                    art2: art2,
                    mus2: mus2,
                    edu2: edu2,
                    qui2: qui2,
                    fil2: fil2,
                    civ2: civ2,
                    psi2: psi2,
                    ing2: ing2,

                    mat3: mat3,
                    fis3: fis3,
                    bio3: bio3,
                    geo3: geo3,
                    lit3: lit3,
                    art3: art3,
                    mus3: mus3,
                    edu3: edu3,
                    qui3: qui3,
                    fil3: fil3,
                    civ3: civ3,
                    psi3: psi3,
                    ing3: ing3,

                    mat4: mat4,
                    fis4: fis4,
                    bio4: bio4,
                    geo4: geo4,
                    lit4: lit4,
                    art4: art4,
                    mus4: mus4,
                    edu4: edu4,
                    qui4: qui4,
                    fil4: fil4,
                    civ4: civ4,
                    psi4: psi4,
                    ing4: ing4

                }, function () {
                    window.location.href = '/notas';
                });

                

                window.location.href = '/notas';
            }else{
                alert("La fecha de nacimiento no coincide");
            }
        }else{
            alert("El estudiante que busca no existe.");
        }
        BotonGuardar.removeAttr('disabled').prop('value', 'Buscar'); 
    });

});
//------------------------------------------------------------------------ ENVIAR DATOS NOTAS
jQuery('#send_grades').on('submit', function(e){
    e.preventDefault();
    var BotonGuardar = jQuery('#enviar_notas');
    BotonGuardar.attr('disabled', 'disabled').prop('value', 'Enviando Notas .......'); 
    var bimestre = jQuery('[name=nbim]').val();
    //-----------------------------------------------------------------------------Ordenar CARNETS
    for(var i=0;i<cantidad_alumnos;i++){
        console.log("Carnet1 #"+(i+1)+": "+carnets[i]);
    }
    carnets.sort();
    var aux1 = [];
    for(var i=0;i<cantidad_alumnos;i++){
        aux1[i] = (carnets[i]).split("/");
        carnets[i] = aux1[i][1];
        console.log("Carnet2 #"+(i+1)+": "+carnets[i]);
    }

    for(var i=0;i<cantidad_alumnos;i++){
        var notas = p1s[i]+"/"+p2s[i]+"/"+p3s[i];
        var c = carnets[i];
        console.log("Estoy guardando "+c+", del bimestre: "+bimestre);
        socket.emit('save_est2', {
            ci: c,
            not: notas,
            bim: bimestre
        }, function () {
        });
    }
    BotonGuardar.removeAttr('disabled').prop('value', 'Registrar Notas'); 
});
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