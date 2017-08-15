const Atendimentos = require('../models/atendimentos');
const { prop } = require('ramda');

const getAll = ( req, res, next ) => {
    
    Atendimentos.find({})
    .then( atendimentos => res.json( atendimentos ) )
    .catch( error => next(error) )

}

const atendimentoNew = ( req, res, next ) => {

    const atendimento = prop("body", req);
    const atendimentoModel = new Atendimentos(atendimento);

    atendimentoModel.save()
    .then( savedAtendimento => res.json(savedAtendimento) )
    .catch( error => next(error) )
    
}

module.exports = {
    getAll,
}