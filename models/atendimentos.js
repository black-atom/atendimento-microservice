const {Schema} = require("mongoose");
const timestamps = require('mongoose-timestamp');
const userAudit = require('mongoose-useraudit-plugin');
const dbConnection = require('../databaseConnection');


//***************** Endereco Schema ************************ */
const enderecoSchema  = new Schema({
    rua               : { type: String, required: [true, "Entre com o nome da rua"] },
    numero            : { type: String, required: [true, "Entre com o numero"] },
    cep               : { type: String, required: [true, "Entre com o cep"] },
    bairro            : { type: String, required: [true, "Entre com o bairro"] },
    cidade            : { type: String, required: [true, "Entre com os dados da cidade"] },
    uf                : { type: String, required: [true, "Entre com os dados do estado"] },
    ponto_referencia  : { type: String, default: '' },
    complemento       : { type: String, default: '' },
})

//***************** Endereco Schema end ******************** */


//***************** Contato Schema ************************* */
const contatoSchema  = new Schema({
  email             : { type: String, default: '' },
  celular           : { type: String, default: '' },
  nome              : { type: String },
  observacao        : { type: String, default: '' },
  telefone          : { type: String, required: [true, "Entre com o telefone de contato!"] },
})



//***************** Equipamentos Retiramos Schema *************** */
const equipamentosRetiradosSchema = new Schema({
  id                  : { type: String, default: '' },
  descricao           : { type: String, default: '' },
  modelo              : { type: String, default: '' },
  numero_equipamento  : { type: String, default: '' },
  problema            : { type: String, default: '' },
  testes              : { type: String, default: '' },
  foto                : { type: String, default: '' },
  key                 : { type: String, default: '' },
  pecas: {
    type: [{
      descricao       : { type: String, default: '' },
      quantidade      : { type: Number, default: '' },
      foto            : { type: String, default: '' },
    }],
    default: [],
  }
}, { _id : false })

//***************** Equipamentos Com Troca de Peca Schema *************** */
const equipementoComTrocaDePecaSchema = new Schema({
  id                  : { type: String, default: '' },
  descricao           : { type: String, default: '' },
  modelo              : { type: String, default: '' },
  numero_equipamento  : { type: String, default: '' },
  problema            : { type: String, default: '' },
  testes              : { type: String, default: '' },
  foto                : { type: String, default: '' },
  key                 : { type: String, default: '' },
  pecas: {
    type: [{
      descricao       : { type: String, default: '' },
      quantidade      : { type: Number, default: '' },
      preco           : { type: Number, default: '' }, 
    }],
    default: [],
  }
}, { _id : false })

//***************** Faturamento Schema *************** */
const faturamentoSchema = new Schema({
  cnpj                : { type: String,   default: ''},
  razao_social        : { type: String,   default: ''},
  email               : { type: String,   default: ''},
  prazo               : { type: String,   default: ''},
  equipamentos        : { type: [equipementoComTrocaDePecaSchema], default: []},
}, { _id : false })

//***************** Treinamento Schema *************** */
const treinametoSchema = new Schema({
  topicos             : { type: [String], default: []},
  software            : { type: String,   default: ''},
  caminho_rede        : { type: String,   default: ''},
}, { _id : false })

//*****************  Relatorio Schema *************** */
const relatorioSchema = new Schema({
  motivo_retorno          : { type: String, default: '' },
  resumo_atendimento      : { type: String, default: '' },
  treinamento             : { type: treinametoSchema, default: ''},
  equipamentos_retirados  : { type: [equipamentosRetiradosSchema], default: []},
  faturamento             : { type: faturamentoSchema, default: []},
}, { _id : false })


//***************** Cliente Schema ************************* */
const clienteSchema = new Schema({
  _id                  : { type: Schema.Types.ObjectId },
  cnpj_cpf             : { type: String, required: [true, "Entre com o cnpj/cpf do cliente"] },
  nome_razao_social    : { type: String, required: [true, "Entre com o nome  do Cliente"] },
  nome_fantasia        : { type: String, default: '' },
  inscricao_estadual   : { type: String, default: '' }
})

//***************** Cliente Schema end ********************* */


//***************** Assinatura Schema ************************* */
const assinaturaSchema = new Schema({
  nome                  : { type: String, default: '' },
  documento_id          : { type: String, default: '' },
  url                   : { type: String, default: '' },
})
//***************** assinatura Schema end ********************* */

const locationSchema = new Schema({
  type              : { type: String, default: 'Point', required: true },
  coordinates       : { type: [Number], required: true, defaul: [] },
}, { _id: false })

const liberacaoSupervisorSchema = new Schema({
  nome_supervisor: { type: String, default: '', required: [true, "Entre com os dados do supervisor"] },
  _id : { type: Schema.Types.ObjectId },
});

//***************** Atendimento Schema ********************* */
const atendimentoSchema = new Schema({
  assinatura: {
    type: assinaturaSchema
  },
  autorizado: {
    type: String,
    default: ''
  },
  avaliacao: {
    type: [{
      pergunta: {
        type: String,
        required: true
      },
      valor: {
        type: Number,
        default: ''
      }
    }],
    default: []
  },
  cliente: {
    type: clienteSchema,
    required: [true, "Entre com os dados de contato"]
  },
  contato: {
    type: contatoSchema,
    required: [true, "Entre com os dados de contato"]
  },
  data_atendimento: {
    type: Schema.Types.Date,
    required: [true, "Entre com a data do atendimento"],
    default: new Date()
  },
  descricao: {
    type: String,
    default: ''
  },
  endereco: {
    type: enderecoSchema,
    required: [true, "Entre com os dados do endereco"]
  },
  estacionamento: {
    type: String,
    required: [true, "Entre com o estacionamento"],
    default: ''
  },
  estado: {
    type: String,
    enum: ["agendado", "cancelado", "associado", "bloqueado"],
    default: "agendado"
  },
  faturamento: {
    status: {
      type: Boolean,
      required: [true, "Entre com o status de faturamento"],
      default: false
    },
    faturamentoAt: {
      type: Schema.Types.Date,
      required: [true, "Entre com a data do atendimento"],
      default: new Date()
    }
  },
  garantia: {
    type: String,
    default: ''
  },
  imagens: {
    type: [{
      tipo: String,
      url: String
    }],
    default: []
  },
  interacao_tecnico: {
    type: Object,
    required: [false, "Entre com os dados do tecnico!"],
    default: {}
  },
  isChecked_stock: {
    type: Boolean,
    required: [true, 'Atendimento conferido pelo estoque'],
    default: false
  },
  isViewed: {
    type: Boolean,
    required: [true, 'Atendimento visualizado ou não'],
    default: false
  },
  liberacao: {
    type: liberacaoSupervisorSchema,
    default: null
  },
  modelo_equipamento: {
    type: String,
    required: [true, "Entre com o modelo do equipamento"],
    default: ''
  },
  motivos: {
    type: [{
      estado: {
        type: String,
        enum: ["cancelado", "reagendado", "encaixe"],
        required: [true, "Entre com o estado do motivo!"]
      },
      motivo: {
        type: String,
        required: [true, "Entre com o motivo!"]
      }
    }],
    default: []
  },
  numero_equipamento: {
    type: String,
    default: ''
  },
  observacao: {
    type: String,
    default: ''
  },
  //needs to be removed
  relatorio: {
    type: relatorioSchema,
    default: null
  },
  tecnico: {
    _id: {
      type: Schema.Types.ObjectId
    },
    nome: {
      type: String,
      default: null
    }
  },
  testes_efetuados: {
    type: String,
    required: [true, "Entre com os testes efetuados"],
    default: ''
  },
  tipo: {
    type: String,
    default: ''
  },
  valor: {
    type: Number,
    default: ''
  },
  location: {
    type: locationSchema,
    required: true,
  }
},
  { versionKey: false }
);

//***************** Atendimento Schema end ***************** */
atendimentoSchema.plugin(timestamps);
atendimentoSchema.plugin(userAudit);
atendimentoSchema.index({ location: '2dsphere' });


module.exports = dbConnection.model("atendimentos", atendimentoSchema);