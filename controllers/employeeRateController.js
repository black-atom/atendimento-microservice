const Atendimentos = require('../models/atendimentos');


const calcEmployeeRates = (req, res, next) => {

  Atendimentos.aggregate([
    { $unwind: "$avaliacao" },
    { $match: { 
      'avaliacao.valor': { $gte: 1 },
      'tecnico._id': { "$exists": true, "$ne": null }
    }},
    {
      $group: {
          _id: '$tecnico._id',
          rate: {$avg: '$avaliacao.valor'}
      },
      
    }
  ])
  .then(data => res.json(data))
  .catch(error => next(error))

}

module.exports = {
  calcEmployeeRates
}

