const { from } = require('rxjs');
const { tap, flatMap, delay, zip } = require('rxjs/operators');
const { atendimentos } = require('../../models');
const moment = require('moment');

const data = moment('20180622')
console.log(data.toDate())
from(atendimentos.find({
  data_atendimento: {
    $gt: data.startOf('day').toDate(),
  }
}))
  .pipe(
    tap(data => console.log(`${data.length} documents will be migrated`)),
    flatMap(data => data),
  )
  .subscribe(data => console.log(data._id))