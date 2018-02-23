const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const Atendimentos = require('../models/atendimentos');
const { prop } = require('ramda');

const storage = multer.diskStorage({
  destination: 'public/imagens',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});

const uploadingHandler = multer({
  limits: {fileSize: 1000000, files:1},
  storage: storage,
}).single("file");

const atendimentoUpload = ( req, res, next ) => {
    const id = prop("id", req.params) || '599364106d357012f81bbaea';
    const filename = prop("filename", req.file);
    const tipo = req.body.tipo || 'inicio_atendimento';


    Atendimentos.findById(id)
    .then(atendimento => {
        atendimento.imagens.push({
          url: filename,
          tipo 
        });
        return atendimento.save();
    })
    .then(atendimento => res.json(atendimento))
    .catch(error => next(error));
    
};

const assinaturaUpload = ( req, res, next ) => {
  const id = prop("id", req.params);
  const filename = prop("filename", req.file);

  Atendimentos.findById(id)
  .then(atendimento => {
      atendimento.assinatura.url = filename;
      return atendimento.save();
  })
  .then(atendimento => res.json(atendimento))
  .catch(error => next(error));
  
};

module.exports = {
    atendimentoUpload, 
    assinaturaUpload,
    uploadingHandler
}