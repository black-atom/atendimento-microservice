const socketIO = require('socket.io');
const { isNil } = require('ramda');

let io = null;
module.exports = ( server ) => {

    if(isNil(io)){
        io = new socketIO(server);
    } 

    io.on('connection', (socket) => {

        console.log("novo socket!!!");
        require("./registerTecnico")(socket);
        
    })

    return {
        enviarUpdateTecnico : () => {
            io.sockets.forEach(s => console.log(s));
        }
    }

}
