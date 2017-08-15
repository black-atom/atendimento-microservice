const socketIO = require('socket.io');
const { isNil, both } = require('ramda');

let io = null;
let connectedTecnicos = [];

module.exports = ( server ) => {

    if(isNil(io)){
        io = new socketIO(server);
    }else if(both(isNil(server), isNil(io))){
        throw new Error("Socket io not initilized!!!");
    }

    io.on('connection', (socket) => {

        console.log("novo socket!!!");
        const registerTecnico = require("./registerTecnico")(socket);
        connectedTecnicos = registerTecnico.getTecnicos();
        
    })

    return {
        enviarUpdateTecnico : (nome) => {
            const socket = connectedTecnicos.find(s => s.tecnico.name = nome);
            if(socket){
                socket.imit("updateAtendimentos");
            }
        }
    }

}
