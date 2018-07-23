const randomLocation = require('random-location');
const cnpj = require("@fnando/cnpj/dist/node");
const {
  applySpec,
  pathOr,
  propOr,
  defaultTo,
  pipe,
  map,
} = require('ramda');
const { 
  atendimentos: AtendimentoModel,
 } = require('../models');

const getRandomLocation = () => {
  const point = {
    latitude: -23.6663116,
    longitude: -46.562314
  }
   
  const radius = 2000 // in meters
   
  const randomPoint = randomLocation.randomCirclePoint(point, radius)
  return [randomPoint.latitude, randomPoint.longitude]
}

const assinaturaSpec = applySpec({
  nome                  : pathOr('', ['assinatura', 'nome']),
  documento_id          : pathOr('', ['assinatura', 'documento_id']),
  url                   : pathOr('', ['assinatura', 'url']),
})

const clienteSpec = applySpec({
  cnpj_cpf             : pathOr(cnpj.generate(), ['cliente', 'cnpj_cpf']),
  nome_razao_social    : pathOr('Nome Test', ['cliente', 'nome_razao_social']),
  nome_fantasia        : pathOr('', ['cliente', 'nome_fantasia']),
  inscricao_estadual   : pathOr('', ['cliente', 'inscricao_estadual']),
})

const enderecoSpec = applySpec({
  rua               : pathOr('Rua Test', ['endereco', 'rua']),
  numero            : pathOr(10, ['endereco', 'numero']),
  cep               : pathOr('09080076', ['endereco', 'cep']),
  bairro            : pathOr('Bairro Test', ['endereco', 'bairro']),
  cidade            : pathOr('Sao Paulo', ['endereco', 'cidade']),
  uf                : pathOr('SP', ['endereco', 'uf']),
  ponto_referencia  : pathOr('', ['endereco', 'ponto_referencia']),
  complemento       : pathOr('', ['endereco', 'complemento']),
  location          : applySpec({
    type: pathOr('Point', ['endereco', 'complemento', 'location', 'type']),
    coordinates: pathOr(getRandomLocation(), ['endereco', 'complemento', 'location', 'coordinates']),
  }),
})

const contatoSpec = applySpec({
  email             : pathOr('email@test.js', ['contato', 'email']),
  celular           : pathOr('1194322344', ['contato', 'celular']),
  nome              : pathOr('Windows', ['contato', 'nome']),
  observacao        : pathOr('', ['contato', 'observacao']),
  telefone          : pathOr('1194322344', ['contato', 'telefone']),
})

const tecnicoSpec = applySpec({
  nome: pathOr('nome tecnico', ['tecnico', 'nome']),
})

const relatorioSpec = applySpec({
  motivo_retorno          : pathOr('', ['relatorio', 'telefone']),
  resumo_atendimento      : pathOr('', ['relatorio', 'telefone']),
  treinamento             : pathOr({}, ['relatorio', 'treinamento']),
  equipamentos_retirados  : pathOr([], ['relatorio', 'equipamentos_retirados']),
  faturamento             : pathOr([], ['relatorio', 'faturamento']),      
})

const atendimentoSpec = applySpec({
  liberacao          : propOr(null, 'liberacao'),
  assinatura         : assinaturaSpec,
  cliente            : clienteSpec,
  createdBy          : propOr('test', 'createdBy'),
  endereco           : enderecoSpec,
  imagens            : propOr([], 'imagens'),
  contato            : contatoSpec,
  data_atendimento   : propOr(new Date(), 'data_atendimento'),
  descricao          : propOr('descricao do atendimento', 'descricao'),
  testes_efetuados   : propOr('testes efetuados', 'testes_efetuados'),
  modelo_equipamento : propOr('31231312', 'modelo_equipamento'),
  numero_equipamento : propOr('3213', 'numero_equipamento'),
  estacionamento     : propOr('estacionamento', 'estacionamento'),
  tipo               : propOr('atendimento', 'tipo'),
  valor              : propOr(0.0, 'valor'),
  autorizado         : propOr('', 'autorizado'),
  garantia           : propOr('', 'garantia'),
  observacao         : propOr('observacao', 'observacao'),
  isChecked_stock    : propOr(false, 'isChecked_stock'),
  isViewed           : propOr(false, 'isViewed'),
  estado             : propOr('agendado', 'estado'),
  relatorio          : relatorioSpec,
  tecnico            : tecnicoSpec,
  avaliacao          : propOr([], 'avaliacao'),
  motivos            : propOr([], 'motivos'),
  updatedBy          : propOr('test', 'updatedBy'),
  faturamento        : propOr([], 'faturamento'),
})


const createAtendimentoInstance = (atdDefaults) => {
  const atendimento = new AtendimentoModel(atendimentoSpec(atdDefaults));

  return atendimento.save()
}

createAtendimentoInstance({})
  .then(data => console.log(data))
// console.log(atendimentoSpec({}))