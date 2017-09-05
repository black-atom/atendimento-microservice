const Atendimentos = require('../models/atendimentos');
const { prop } = require('ramda');
const multer = require('multer');
const Promise = require('bluebird');

const getAll = ( req, res, next ) => {
    
    Atendimentos.find(req.query)
    .then( atendimentos => {
        //const _io = io;
        io.enviarUpdateTecnico(321321321);
        res.json( atendimentos ) 
    })
    .catch( error => next(error) )

}

const atendimentoNew = ( req, res, next ) => {

    const atendimento = prop("body", req);
    const atendimentoModel = new Atendimentos(atendimento);

    atendimentoModel.save()
    .then( savedAtendimento => res.json(savedAtendimento) )
    .catch( error => next(error) )
    
}

const updateAtendimento = ( req, res, next ) => {

    const atendimento = prop("body", req);
    const _id = prop("id", req.params);

    Atendimentos.findByIdAndUpdate(_id, atendimento)
    .then(updatedAtendimento => updatedAtendimento._id)
    .then(id => Atendimentos.findById(id))
    .then( updatedData => res.json(updatedData) )
    .catch( error => next(error) )
}

const getAtendimentoByID = ( req, res, next ) => {

    const _id = prop("id", req.params);
    Atendimentos.findById(_id)
    .then(atendimento => res.json(atendimento) )
    .catch( error => next(error) )
    
}


const patchAtendimentos = ( req, res, next ) => {

    const atendimentosData = prop("body", req);

    if(Array.isArray(atendimentosData)){

        const atendimentosPromise = atendimentosData.map(atendimentoData =>{
             return Atendimentos.findByIdAndUpdate(atendimentoData._id, atendimentoData)
        })
        
        Promise.all(atendimentosPromise)
        .then(atendimento => res.json(atendimento) )
        .catch( error => next(error) )

    }else{
        next(new Error("You have not passed an array"));
    }
    
}


const getTodosAtendimentosDosEmpregados = ( req, res, next ) => {

    // const _id = prop("id", req.params);
   // Atendimentos.aggregate().
    // .then(atendimento => res.json(atendimento) )
    // .catch( error => next(error) )

    res.send("oiiii");
    
}


module.exports = {
    getAll,
    patchAtendimentos,
    atendimentoNew,
    updateAtendimento,
    getAtendimentoByID,
    getTodosAtendimentosDosEmpregados
}