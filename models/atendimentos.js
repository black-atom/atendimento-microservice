const {Schema} = require("mongoose");
const timestamps = require('mongoose-timestamp');
const dbConnection = require('../databaseConnection');

const enderecoSchema  = new Schema({
    rua: {type: String, required: [true, "Entre com o nome da rua e numero"]},
    complemento: { type: String, default: "" },
    bairro: {type: String, required: [true, "Entre com o bairro"]},
    cidade: {type: String, required: [true, "Entre com a cidade"]},
    uf: {type: String, required: [true, "Entre com os dados do estado"]},
    ponto_referencia: { type: String, default: "" },
    cep: {type: String, required: [true, "Entre com o cep"]}
})

const contatoSchema  = new Schema({
    email: { type: String, default: "" },
    telefone: {type: String, required: [true, "Entre com o telefone de contato!"]},
    nome: {type: String, required: [true, "Entre com o nome para contato!"]},
    observacao: { type: String, default: "" },
})

const atendimentoSchema = new Schema({

    cliente:{
        _id: {
            type: Schema.Types.ObjectId
        },
        cnpj_cpf: {
            type: String, 
            required: [true, "Entre com o cnpj/cpf do cliente"]
        },
        nome: {
            type: String, 
            required: [true, "Entre com o nome  do Cliente"]
        },
    },
    endereco: {
        type: enderecoSchema,
        required: [true, "Entre com os dados do endereco"]
    },
    contato: {
        type: contatoSchema,
        required: [true, "Entre com os dados de contato"]
    },
    data: {
        type: Schema.Types.Date,
        required: [true, "Entre com a data do atendimento"],
        default: new Date(),
    },
    descricao: {
        type: String, 
        default: ""
    },
    tecnico: {
        _id: {
            type: Schema.Types.ObjectId
        },
        nome: {
            type: String, 
            required: [true, "Entre com o nome do tecnico"]
        },
    },
    // tecnicoAcompanhante: {
    //     _id: {
    //         type: Schema.Types.ObjectId
    //     },
    //     cnpj_cpf: {
    //         type: String, 
    //         required: [true, "Entre com o cnpj/cpf do cliente"]
    //     },
    // },
}, { versionKey: false });

atendimentoSchema.plugin(timestamps);


module.exports = dbConnection.model("atendimentos", atendimentoSchema);