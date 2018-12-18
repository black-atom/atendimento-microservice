const { from } = require('rxjs');
const { tap, flatMap, map, zip } = require('rxjs/operators');
const { atendimentos } = require('../../models');
const moment = require('moment');
const { location } = require('../../controllers/utils')
const data = moment('20181031')

const populateLocation = (atendimento) => {
  return location(atendimento.endereco)
    .then(coordinates => ({
      ...atendimento,
      location: {
        coordinates,
      }
    }));
};

const errors = []

from(atendimentos.find({
  data_atendimento: {
    $gt: data.startOf('day').toDate(),
  }
}))
  .pipe(
    tap(data => console.log(`${data.length} documents will be migrated`)),
    flatMap(atendimentos => atendimentos),
    flatMap(atendimento => {
      return location(atendimento.endereco)
        .then(coordinates => {
          atendimento.location ={
            coordinates,
          }

          return atendimento.save()
        })
        .catch(error => {
          console.log('error ====>', error)
          errors.push(atendimento)
        })
    }),
    tap(() => console.log('erros', errors)),
    tap(() => console.log('n of errors ====>', errors.length))
  )
  .subscribe(atendimento => console.log(atendimento._id))