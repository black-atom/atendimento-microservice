const registerTecnico = (socket) => {

    let addedUser = false;

    socket.on("registra-tecnico", (dadosTecnico) => {
        console.log("novo tecnico: ");
        console.log(dadosTecnico);
        if(!addedUser){
            socket.tecnico = dadosTecnico;
        }
    })
}

module.exports = registerTecnico;