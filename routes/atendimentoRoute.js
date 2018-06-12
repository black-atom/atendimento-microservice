const route = require("express").Router();
const atendimentoController = require('../controllers/atendimentoController');
const uploadController = require('../controllers/uploadController');
const express = require('express');
const rolesMiddleware = require('../middleware/roleMiddleware');
const employeeRateController = require('../controllers/employeeRateController');

route.get('/atendimentos', rolesMiddleware(['all']), atendimentoController.getAll);
route.patch('/atendimentos', rolesMiddleware(['all']), atendimentoController.patchAtendimentos);
route.get('/atendimentos/:id', rolesMiddleware(['all']), atendimentoController.getAtendimentoByID);
route.post('/atendimentos', rolesMiddleware(['all']), atendimentoController.atendimentoNew);
route.put('/atendimentos/:id', rolesMiddleware(['all']), atendimentoController.updateAtendimento);
route.get('/funcionariosatendimentos/', rolesMiddleware(['all']), atendimentoController.getTodosAtendimentosDosEmpregados);
route.post('/atendimentos/:id/imagens', rolesMiddleware(['all']), uploadController.atendimentoUploadHandler, uploadController.atendimentoUpload);
route.post('/atendimentos/:id/assinaturas', rolesMiddleware(['all']), uploadController.assinaturaUpload);
route.get('/avaliacoes', rolesMiddleware(['all']), employeeRateController.calcEmployeeRates);


//route.put('/atendimentos/funcionario/:id', atendimentoController.getUPFromUddnwind);



module.exports = route;