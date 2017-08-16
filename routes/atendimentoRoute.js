const route = require("express").Router();
const atendimentoController = require('../controllers/atendimentoController');

route.get('/atendimentos', atendimentoController.getAll);
route.get('/atendimentos/:id', atendimentoController.getAtendimentoByID);
route.post('/atendimentos', atendimentoController.atendimentoNew);
route.put('/atendimentos/:id', atendimentoController.updateAtendimento);


module.exports = route;