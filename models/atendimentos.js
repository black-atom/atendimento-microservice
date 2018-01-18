const {Schema} = require("mongoose");
const timestamps = require('mongoose-timestamp');
const userAudit = require('mongoose-useraudit-plugin');
const dbConnection = require('../databaseConnection');

const enderecoSchema  = new Schema({
    rua: {type: String, required: [true, "Entre com o nome da rua"]},
    numero: {type: String, required: [true, "Entre com o numero"]},
    complemento: { type: String, default: "" },
    bairro: {type: String, required: [true, "Entre com o bairro"]},
    cidade: {type: String, required: [true, "Entre com a cidade"]},
    uf: {type: String, required: [true, "Entre com os dados do estado"]},
    ponto_referencia: { type: String, default: "" },
    cep: {type: String, required: [true, "Entre com o cep"]}
})

const contatoSchema  = new Schema({
    email: { type: String, default: "" },
    celular: { type: String, default: "" },
    telefone: {type: String, required: [true, "Entre com o telefone de contato!"]},
    nome: {type: String},
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
        nome_razao_social: {
            type: String, 
            required: [true, "Entre com o nome  do Cliente"]
        },
        nome_fantasia: { 
            type: String, 
            default: ""
         },
        inscricao_estadual: { 
            type: String, 
            default: "" 
        }
    },
    endereco: {
        type: enderecoSchema,
        required: [true, "Entre com os dados do endereco"]
    },
    imagens: {
        type: [{
            tipo: String,
            url: String
        }],
        default: []
    },
    contato: {
        type: contatoSchema,
        required: [true, "Entre com os dados de contato"]
    },
    data_atendimento: {
        type: Schema.Types.Date,
        required: [true, "Entre com a data do atendimento"],
        default: new Date(),
    },
    descricao: {
        type: String, 
        default: ""
    },
    testes_efetuados: {
        type: String, 
        required: [true, "Entre com os testes efetuados"],
        default: ""
    },
    modelo_equipamento: {
        type: String, 
        required: [true, "Entre com o modelo do equipamento"],
        default: ""
    },
    numero_equipamento: {
        type: String, 
        default: ""
    },
    estacionamento: {
        type: String, 
        required: [true, "Entre com o estacionamento"],
        default: ""
    },
    tecnico: {
        _id: {
            type: Schema.Types.ObjectId,
        },
        nome: {
            type: String,
            default: null
        },
    },
    tipo: {
        type: String, 
        default: ""
    },
    valor: {
        type: Number, 
        default: ""
    },
    autorizado: {
        type: String, 
        default: ""
    },
    avaliacao: {
        type: [{
            pergunta: {
                type: String, 
                required: true
            },
            valor: {
                type: Number,
                default: ""
            },
        }],
        default: []
    },
    observacao: { 
        type: String, 
        default: "" 
    },
    km_inicio: {
        km: {
            type: Number, 
            default: ""
        },
        data: {
            type: Date, 
            default: ""
        }
    },
    km_final: {
        km: {
            type: Number, 
            default: ""
        },
        data: {
            type: Date, 
            default: ""
        }
    },
    inicio: {
            type: Date, 
            default: ""
      
    },
    fim: {
            type: Date, 
            default: ""
    },
    estado: {
        type: String, 
        enum: [
            'aberto',
            'cancelar',
            'associado', 
            'em_descolamento', 
            'chegou_ao_destino', 
            'inicio_atendimento', 
            'fim_do_atendimento',
            'aberto'
        ],
        default: 'aberto'
    },
    situacao: {
        status: {
            type: String, 
            enum: [  
                'cancelar',
                'reagendar',
                'encaixe',
                'aberto'
            ],
            default: 'aberto'
        },
        motivo: {
            type: String, 
            default: ""
        }
    },
    retorno: {
        type: {
            retornar: {
                type: Boolean,
                default: false
            },
            motivo: {
                type: String,
                default: ""
            }
        }
    },
    relatorio_tecnico: {
        relatorio: {
            type: String,
            default: ""
        }
    },
    treinamento: {
        type: {
            interrupcoes: {
                type: Boolean,
                default: false
            },
            cadastros: {
                type: Boolean,
                default: false
            },
            relatorios: {
                type: Boolean,
                default: false
            },
            importacao_dados: {
                type: Boolean,
                default: false
            },
            parametros_gerais: {
                type: Boolean,
                default: false
            },
            abonos_justificativas: {
                type: Boolean,
                default: false,
            },
            backup_sistema: {
                type: Boolean, 
                default: false
            },
            software: {
                type: String,
                default: ""
            },
            caminho: {
                type: String,
                default: ""
            }
        }
    },
    remocao_relogio: {
        type: {
            retirado: {
                type: Boolean,
                default: false
            },
            chave: {
                type: Boolean,
                default: false
            },
            bateria: {
                type: Boolean,
                default: false
            },
            bobina: {
                type: Boolean,
                default: false
            },
            fonte: {
                type: Boolean,
                default: false
            },
            pino: {
                type: Boolean,
                default: false
            },
            impressora: {
                type: Boolean,
                default: false
            }
        }
    },
},
 { versionKey: false });

atendimentoSchema.plugin(timestamps);
atendimentoSchema.plugin(userAudit);


module.exports = dbConnection.model("atendimentos", atendimentoSchema);