const location = require('./location')


const address1 = {
  rua: 'Rua Santa Catarina',
  cidade: 'Diadema',
  cep: '09961400',
  uf: 'SP',
  numero: 98,
  bairro: 'Piraporinha'
}

const address2 = {
  rua: 'Rua Minas Gerais',
  cidade: 'Diadema',
  numero: 313,
  cep: '09941760',
  uf: 'SP'
}

const address3 = {
  rua: 'Avenida do Imperador',
  cidade: 'São Paulo',
  numero: 3752,
  bairro: 'Limoeiro',
  cep: '08051000',
  uf: 'SP'
}

location(address1).then(console.log)