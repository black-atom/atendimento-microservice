const multer = require('multer');
const crypto = require('crypto');
const uuid = require('uuid');
const path = require('path');
const Atendimentos = require('../models/atendimentos');
const MulterGoogleCloudStorage = require('multer-google-storage');
const { prop } = require('ramda');
const fs = require('fs');

function getFileNameToStore(req, file, cb) {
  console.log(file.originalname);
	cb(null,`atendimento/images/${uuid()}_${file.originalname}`);
}

const atendimentoUploadHandler = multer({
  storage: MulterGoogleCloudStorage.storageEngine({
    keyFilename: "./credentials/google.json",
    projectId: "blackatom-projects",
    bucket: "blackatom-images",
    maxRetries: 3,
    filename: getFileNameToStore,
    acl: 'publicRead',
  }),
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
  const {
    assinaturaBase64,
    nome,
    documento_id
  } = req.body;

  const convertBase64ToBuffer = assinaturaBase64 => Buffer.from(assinaturaBase64, 'base64');

  const getFileName = () => new Promise((resolve, reject) => {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if(err) reject(err);
      resolve(`${raw.toString('hex')}_assinatura.png`);
    })
  });

  const saveBase64ToFile = bufferData => Promise.resolve()
    .then(getFileName)
    .then(filename => {
      return new Promise((resolve, reject) => {
        const pathToSave  = `public/imagens/${filename}`;
        fs.writeFile(pathToSave, bufferData, err => {
          if(err) reject(err);
          resolve(filename);
        })
      })
    })

  const saveToDB = filename => Atendimentos.findById(id)
    .then(atendimento => {
      atendimento.assinatura = {
        nome,
        documento_id,
        url: filename
      };
      return atendimento.save();
    })

  
  Promise
    .resolve(assinaturaBase64)
    .then(convertBase64ToBuffer)
    .then(saveBase64ToFile)
    .then(saveToDB)
    .then(atendimento => res.json(atendimento))
    .catch(error => next(error));
};

module.exports = {
    atendimentoUpload, 
    assinaturaUpload,
    atendimentoUploadHandler
}