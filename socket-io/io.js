const socketIO = require('socket.io');
const { isNil, both } = require('ramda');

let io = null;
let connectedTecnicos = [];

module.exports = ( server ) => {

    if(isNil(io)){
        io = new socketIO(server);
        global.io = this;
    }else if(both(isNil(server), isNil(io))){
        throw new Error("Socket io not initilized!!!");
    }

    io.on('connection', (socket) => {

        console.log("novo socket!!!");
        const registerTecnico = require("./registerTecnico")(socket);
        connectedTecnicos = registerTecnico.getTecnicos();
        
    })

    return {
        enviarUpdateTecnico : (_id) => {
            const socket = connectedTecnicos.find(s => s.tecnico._id = _id);
            if(socket){
                //console.log(socket.emit());
                socket.emit('hello', 'can you hear me?');
            }
        }
    }

}
