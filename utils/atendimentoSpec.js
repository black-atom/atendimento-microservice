const { prop, applySpec, path, propOr } = require('ramda');

const removeMask = value => value.replace(/\D+/g, '');
const removeMaskProp = propName => objeto => objeto[propName] ? removeMask(prop(propName, objeto)) : objeto[propName];
const clienteProp = propName => objeto => applySpec(clienteSpec)(prop(propName, objeto));
const contatoProp = propName => objeto => applySpec(contatoSpec)(prop(propName, objeto));
const enderecoProp = propName => objeto => applySpec(enderecoSpec)(prop(propName, objeto));

const atendimentoSpec = {
  assinatura: prop('assinatura'),
  cliente: clienteProp('cliente'),
  contato: contatoProp('contato'),
  endereco: enderecoProp('endereco'),
  estacionamento: prop('estacionamento'),
  numero_equipamento: prop('numero_equipamento'),
  modelo_equipamento: prop('modelo_equipamento'),
  testes_efetuados: prop('testes_efetuados'),
  descricao: prop('descricao'),
  data_atendimento: prop('data_atendimento'),
  imagens: prop('imagens'),
  observacao: prop('observacao'),
  avaliacao: prop('avaliacao'),
  autorizado: prop('autorizado'),
  valor: prop('valor'),
  garantia: prop('garantia'),
  tipo: prop('tipo'),
  tecnico: prop('tecnico'),
  estado: prop('estado'),
  interacao_tecnico: prop('interacao_tecnico'),
  motivos: prop('motivos'),
  createdBy: prop('createdBy'),
  updatedBy: prop('updatedBy'),
  faturamento: prop('faturamento'),
  relatorio: propOr(null, ['relatorio']),
};

const clienteSpec = {
  cnpj_cpf: removeMaskProp('cnpj_cpf'),
  inscricao_estadual: removeMaskProp('inscricao_estadual'),
  nome_razao_social: prop('nome_razao_social'),
  nome_fantasia: prop('nome_fantasia')
};
const contatoSpec = {
  nome: prop('nome'),
  telefone: removeMaskProp('telefone'),
  celular: removeMaskProp('celular'),
  observacao: prop('observacao'),
  email: prop('email')
};
const enderecoSpec = {
  cep: removeMaskProp('cep'),
  rua: prop('rua'),
  numero: prop('numero'),
  bairro: prop('bairro'),
  cidade: prop('cidade'),
  uf: prop('uf'),
  ponto_referencia: prop('ponto_referencia'),
  complemento: prop('complemento')
};

module.exports = applySpec(atendimentoSpec);
