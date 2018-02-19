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
    cidade            : { type: String, required: [true, "Entre com a cidade"] },
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

//***************** Contato Schema end ********************* */


//***************** Interacao Tecnico Schema *************** */
const interacaoTecnicoSChema = new Schema({
    estado            : { type: String, enum: ['em_descolamento', 'chegou_ao_destino', 'inicio_atendimento', 'fim_do_atendimento', ''	], default: '' },
    relatorio_tecnico : { relatorio: { type: String, default: '' } },
    retorno           : { retornar: { type: Boolean, default: false }, motivo:   { type: String,  default: ''  }},
    treinamento       : {
      interrupcoes:          { type: Boolean, default: false },
      cadastros:             { type: Boolean, default: false },
      relatorios:            { type: Boolean, default: false },
      importacao_dados:      { type: Boolean, default: false },
      parametros_gerais:     { type: Boolean, default: false },
      abonos_justificativas: { type: Boolean, default: false },
      backup_sistema:        { type: Boolean, default: false },
      software:              { type: String,  default: '' },
      caminho:               { type: String,  default: '' }
    },
    remocao_relogio   : {
      retirado:              { type: Boolean, default: false },
      chave:                 { type: Boolean, default: false },
      bateria:               { type: Boolean, default: false },
      bobina:                { type: Boolean, default: false },
      fonte:                 { type: Boolean, default: false },
      pino:                  { type: Boolean, default: false },
      impressora:            { type: Boolean, default: false }
    }
})

//***************** Interacao Tecnico Schema end *********** */


//***************** Cliente Schema ************************* */
const clienteSchema = new Schema({
  _id                  : { type: Schema.Types.ObjectId },
  cnpj_cpf             : { type: String, required: [true, "Entre com o cnpj/cpf do cliente"] },
  nome_razao_social    : { type: String, required: [true, "Entre com o nome  do Cliente"] },
  nome_fantasia        : { type: String, default: '' },
  inscricao_estadual   : { type: String, default: '' }
})

//***************** Cliente Schema end ********************* */



//***************** Atendimento Schema ********************* */
const atendimentoSchema = new Schema({
    cliente            : { type: clienteSchema, required: [true, "Entre com os dados de contato"] },
    endereco           : { type: enderecoSchema, required: [true, "Entre com os dados do endereco"] },
    imagens            : { type: [{ tipo: String, url: String }], default: [] },
    contato            : { type: contatoSchema, required: [true, "Entre com os dados de contato"] },
    data_atendimento   : { type: Schema.Types.Date, required: [true, "Entre com a data do atendimento"], default: new Date() },
    descricao          : { type: String, default: '' },
    testes_efetuados   : { type: String, required: [true, "Entre com os testes efetuados"], default: '' },
    modelo_equipamento : { type: String, required: [true, "Entre com o modelo do equipamento"], default: '' },
    numero_equipamento : { type: String, default: '' },
    estacionamento     : { type: String, required: [true, "Entre com o estacionamento"], default: '' },
    tipo               : { type: String, default: '' },
    valor              : { type: Number, default: '' },
    autorizado         : { type: String, default: '' },
    garantia           : { type: Schema.Types.Date, default: '' },
    observacao         : { type: String, default: '' },
    estado             : { type: String, enum: ["agendado", "cancelado", "associado"], default: "agendado" },
    interacao_tecnico  : { type: interacaoTecnicoSChema, required: [true, "Entre com os dados do tecnico!"], default: {} },
    tecnico            : { 
      _id:                    { type: Schema.Types.ObjectId },
      nome:                   { type: String, default: null } 
    },
    avaliacao          : { type: [{ 
      pergunta:              { type: String, required: true }, 
      valor:                 { type: Number, default: '' }}], 
      default: [] 
    },
    motivos            : { type: [{ 
      estado:                 { type: String, enum: ["cancelado", "reagendado", "encaixe"], required: [true, "Entre com o estado do motivo!"] }, 
      motivo:                 { type: String, required: [true, "Entre com o motivo!"]}}],
      default: [] 
    },
  },
  { versionKey: false }
);

//***************** Atendimento Schema end ***************** */


atendimentoSchema.plugin(timestamps);
atendimentoSchema.plugin(userAudit);


module.exports = dbConnection.model("atendimentos", atendimentoSchema);