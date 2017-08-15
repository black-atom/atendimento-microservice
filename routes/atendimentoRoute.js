const route = require("express").Router();
const atendimentoController = require('../controllers/atendimentoController');

route.get('/atendimentos', atendimentoController.getAll);

module.exports = route;