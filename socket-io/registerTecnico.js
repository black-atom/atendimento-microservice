let connectedTenicos = [];

const registerTecnico = (socket) => {

    let addedUser = false;

    socket.on("registra-tecnico", (dadosTecnico) => {

        if(!addedUser){
            socket.tecnico = dadosTecnico;
        }
        connectedTenicos.push(socket);
    });

    socket.on("disconnect", () =>{
        console.log("Desconecting")
        console.log(socket.tecnico);
        connectedTenicos = connectedTenicos.filter( s => s !== socket);
    })

    return {
        getTecnicos: () => {
            return connectedTenicos;
        }
    }
}

module.exports = registerTecnico;