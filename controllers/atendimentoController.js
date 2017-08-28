const Atendimentos = require('../models/atendimentos');
const { prop } = require('ramda');
const multer = require('multer');

const getAll = ( req, res, next ) => {
    
    Atendimentos.find(req.query)
    .then( atendimentos => {
        //const _io = io;
        io.enviarUpdateTecnico(321321321);
        console.log(io);
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

const getAtendimentosFromAEmployee = ( req, res, next ) => {

    const _id = prop("id", req.params);
    Atendimentos.findById(_id)
    .then(atendimento => res.json(atendimento) )
    .catch( error => next(error) )
    
}

const uploadingHandler = multer({
  dest: "../public/images",
  limits: {fileSize: 1000000, files:1},
}).single("file");


const atendimentoUpload = ( req, res, next ) => {
    console.log(req.file.path);
    console.log(req.body.chamado);
    res.end('File is uploaded');
};


module.exports = {
    getAll,
    atendimentoNew,
    updateAtendimento,
    getAtendimentoByID
}