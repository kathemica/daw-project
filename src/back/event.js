//importamos lo que requerimos
var eventos = require('events');

var eventEmitter = new eventos.eventEmitter();

//handler de la conexion
var conexionHandler = function conectado() {
    console.log("conexion exitosa");
    //buscaria los datos
    //lanzar el eventi de los datos recibidos
    eventEmitter.emit('datos_recibidos');

};

//Bindeamos el evento conexion c0n el handler
eventEmitter.on('conexion', conexionHandler);

//en una sola linea bindeamos la conexion con el handler
eventEmitter.on('datos_recibidos', function() {
    console.log("Llegaron los datos ");
    //los cambiaria para rl front y los devuelvo
});

eventEmitter.emit('conexion');

console.log("testing...");