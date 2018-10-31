const location = require('./location')


location({
  rua: 'Rua Santa Catarina',
  cidade: 'Diadema',
  cep: '09961400',
  uf: 'SP'
}).then(console.log)