const request = require('request');
var admin = require("firebase-admin");
//................................................................................FB
var serviceAccount = require("../utils/ue-gualberto-villarroel-firebase-adminsdk-801k0-7fcb34097f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ue-gualberto-villarroel.firebaseio.com/"
});

//var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });
//-------------------------------------------------------------------------DELETEDATA
var deleteData = (dirname, key, callback) => {
    var db1 = admin.database();
    var ref_1 = db1.ref(dirname);
    var ref_2 = ref_1.child(key);

    ref_2.once("value", function(snapshot) {
        ref_2.remove();
    });
    callback();
};
//------------------------------------------------------------------------- DELETECURSO
var deleteCurso = (dirname, key, callback) => {
    var db1 = admin.database();
    var ref_1 = db1.ref(dirname);
    var ref_2 = ref_1.child(key);

    var db2 = admin.database();
    ref_2.once("value", function(snapshot) {
        var curso_a = (snapshot.val()).curso;
        var paralelo_a = (snapshot.val()).paralelo;
        console.log("-------> ", curso_a);
        console.log("-------> ", paralelo_a);
        //"Cursos/"+newStudent.curso, newStudent.paralelo, obj
        var ref_11 = db2.ref("Cursos/"+curso_a+"/"+paralelo_a);
        var ref_22 = ref_11.child(key);
        ref_22.remove();
    });
    callback();
};
//------------------------------------------------------------------------- DELETEMATERIA
var deleteMateria = (dirname, key, callback) => {
    var db1 = admin.database();
    var ref_1 = db1.ref(dirname);
    var ref_2 = ref_1.child(key);

    var db2 = admin.database();
    ref_2.once("value", function(snapshot) {
        var materia = (snapshot.val()).materia;
        console.log("-------> ", materia);
        //"Cursos/"+newStudent.curso, newStudent.paralelo, obj
        var ref_11 = db2.ref("Materias/"+materia);
        var ref_22 = ref_11.child(key);
        ref_22.remove();
    });
    callback();
};
//-------------------------------------------------------------------------PUSHDATA
var pushData = (dirname, key, data, callback) => {
    var db = admin.database();
    var ref_1 = db.ref(dirname);
    var ref_2 = ref_1.child(key);
    ref_2.once("value", function(snapshot) {
        ref_2.update(data);
    });
    callback();
};
//-------------------------------------------------------------------------PUSHDATA_Real
var pushData_Real = ( key, data, callback) => {
    var db = admin.database();
    var ref_1 = db.ref();
    var ref_2 = ref_1.child(key);
    ref_2.once("value", function(snapshot) {
        ref_2.push(data);
    });
    callback();
};
//-------------------------------------------------------------------------UPDATEDATA
var updateData = (dirname, key, data, callback) => {
    var db = admin.database();
    var ref_1 = db.ref(dirname);
    var ref_2 = ref_1.child(key);
    ref_2.once("value", function(snapshot) {
        ref_2.update(data);
    });
    callback();
};
//-------------------------------------------------------------------------EXISTS BOOLEAN
var exists = (dirname, key, callback) => {
    var db = admin.database();
    //var ref = db.ref("server/saving-data/fireblog/posts");
    var ref_1 = db.ref(dirname);
    var ref_2 = ref_1.child(key);
    ref_2.once("value", function(snapshot) {
        console.log(snapshot.val());
        if(snapshot.val() != null){
            console.log("Retorna true!");
            callback("1");
        }else{
            console.log("Retorna false!");
            callback("0");
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};
//-------------------------------------------------------------------------EXISTS DATA
var existsData = (dirname, key, callback) => {
    var db = admin.database();
    //var ref = db.ref("server/saving-data/fireblog/posts");
    var ref_1 = db.ref(dirname);
    var ref_2 = ref_1.child(key);
    ref_2.once("value", function(snapshot) {
        console.log(snapshot.val());
        if(snapshot.val() != null){
            callback(snapshot.val());
        }else{
            callback("0");
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};
//-------------------------------------------------------------------------EXISTS DATA
var existsPersonalData = (key, callback) => {
    var db = admin.database();
    var ref_1 = db.ref();
    var ref_2 = ref_1.child(key);
    ref_2.once("value", function(snapshot) {
        console.log(snapshot.val());
        if(snapshot.val() != null){
            callback(snapshot.val());
        }else{
            callback("0");
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};

module.exports.pushData = pushData;
module.exports.exists = exists;
module.exports.updateData = updateData;
module.exports.deleteCurso = deleteCurso;
module.exports.existsData = existsData;
module.exports.deleteData = deleteData;
module.exports.deleteMateria = deleteMateria;
module.exports.existsPersonalData = existsPersonalData;
module.exports.pushData_Real = pushData_Real;
//.................................................................................

//ejm 1-------------------------------------------------------------------
// var getWeather = (lat, lng, callback) => {
//     request({
//         url: `https://api.darksky.net/forecast/1a9ac887f128cce5beb1618878f29a9c/${lat},${lng}`,
//         json: true
//     }, (error, response, body) => {
//         if(error){
//             callback('Unable to connect to forecast.io server');
//         }else if(response.statusCode === 400){
//             callback('Unable to fetch weather');
//         }else if(response.statusCode === 200){
//             callback(undefined, {
//                 temperature: body.currently.temperature,
//                 apparentTemperature: body.currently.apparentTemperature
//             });
//         }
//     });
// };

// module.exports.getWeather = getWeather;
//ejm 2-------------------------------------------------------------------
// const request = require('request');

// var geocodeAddress = (address, callback) => {
//    var encodedAddress = encodeURIComponent(address);

//    request({
//        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyABD5Ff1a9LzSIvHAGY_lBWq9qZbR38JSY`,
//        json: true
//    }, (error, response, body) => {
//        //console.log(JSON.stringify(error, undefined, 2));//Puedo mostrar cualquiera
//                                                            //error, response, body
//        if(error){
//            callback('Unable to connect Google servers.');
//        }else if(body.status === 'ZERO RESULTS'){//ZERO RESULTS es de google apis
//            callback('Unable to find a location for that address');
//        }else if(body.status === 'OK'){
//            callback(undefined, {
//                address: body.results[0].formatted_address,
//                latitude: body.results[0].geometry.location.lat,
//                longitude: body.results[0].geometry.location.lng
//            });
//        }   
//    });      
// };

// module.exports.geocodeAddress = geocodeAddress;