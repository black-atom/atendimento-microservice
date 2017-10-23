const Atendimentos = require('../models/atendimentos');
const { prop } = require('ramda');
const multer = require('multer');
const Promise = require('bluebird');
const axios = require('axios');


const getAll = ( req, res, next ) => {
    
    Atendimentos.find(req.query)
    .then( atendimentos => {
        //const _io = io;
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

    Atendimentos.findByIdAndUpdate(_id, atendimento, {
        runValidators: true
    })
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

    const data  = req.query.data || new Date() ;

    const login = {
        username: 'vlima',
        password: 'redhat'
    };

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    axios.request({
      headers,
      data: JSON.stringify(login),
      url: 'http://165.227.78.113:3000/login',
      method: 'POST'
    })
    .then( result => result.data.token)
    .then( token  => {
        return Object.assign({}, headers, { 'Authorization': 'Bearer ' + token })
    })
    .then( headers => ({
      headers,
      url: 'http://165.227.78.113:3000/api/funcionarios',
      method: 'GET'
    }))
    .then( axios.request )
    .then( result => result.data)
    .then(  funcionarios => {
        
        getAtendimentosPorData(data).then(atendimentos => {

            const funcAtendimentos = funcionarios.map( funcionario => {
                const atendimentosFunc = atendimentos.filter(atendimento => atendimento.tecnico._id === funcionario._id )
                funcionario.atendimentos = atendimentosFunc;
                return funcionario;
            });

            res.json(funcAtendimentos);

        })
    })
    .catch( error => next(error) )
    
}

const getAtendimentosPorData = ( data ) => {

    const dataObj = new Date(data);

    return Atendimentos.find({})
    .where('data_atendimento')
    .gte(new Date(dataObj.getFullYear(), dataObj.getMonth(), dataObj.getDate()))
    .lt(new Date(dataObj.getFullYear(), dataObj.getMonth(), dataObj.getDate() + 1 ))

}


module.exports = {
    getAll,
    patchAtendimentos,
    atendimentoNew,
    updateAtendimento,
    getAtendimentoByID,
    getTodosAtendimentosDosEmpregados
}