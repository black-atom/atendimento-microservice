const Funcionario = require("./funcionario")
const axios = require("axios").default

class Monitoramento{
    constructor(){
        this.io = {}
        this.funcionarios = []
    }
    
    setIO(io){
        this.io = io
        this.registerEvents()
    }

    registerEvents(){
        this.io.on("connection", this.connection.bind(this))
    }

    registraFuncionario(socket){
        socket.on('registraFuncionario', dados => {
            console.log(dados)
        })
    }

    connection(socket) {
        this.registraFuncionario(socket)
        console.log(socket.id)
    }
}
let monitoramentoSingleton = new Monitoramento();

module.exports = monitoramentoSingleton