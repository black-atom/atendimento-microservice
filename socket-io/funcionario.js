class Funcionario{
    constructor(_id, nome){
        this._id = _id
        this.nome = nome
        this.connected = false
    }

    isConnected(){
        return this.connected;
    }
}

module.exports = Funcionario