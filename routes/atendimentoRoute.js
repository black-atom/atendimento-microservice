const route = require("express").Router();
const atendimentoController = require('../controllers/atendimentoController');
const uploadController = require('../controllers/uploadController');
const express = require('express');

route.get('/atendimentos', atendimentoController.getAll);
route.patch('/atendimentos', atendimentoController.patchAtendimentos);
route.get('/atendimentos/:id', atendimentoController.getAtendimentoByID);
route.post('/atendimentos', atendimentoController.atendimentoNew);
route.put('/atendimentos/:id', atendimentoController.updateAtendimento);
route.get('/funcionariosatendimentos/', atendimentoController.getTodosAtendimentosDosEmpregados);
route.post('/atendimentos/:id/imagens', uploadController.uploadingHandler, uploadController.atendimentoUpload)
route.use('/atendimentoimagens', express.static('public/imagens'));

//route.put('/atendimentos/funcionario/:id', atendimentoController.getUPFromUddnwind);



module.exports = route;