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

console.log(data.toDate())
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
    })
  )
  .subscribe(atendimento => console.log(atendimento._id))