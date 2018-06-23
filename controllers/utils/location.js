const googleMapsClient = require('@google/maps')
const { googleMapsAPIConfig } = require('../../config');
const {
  pathOr,
  pipe,
} = require('ramda');

const { apiKey: googleApiKey } = googleMapsAPIConfig();
const mapsClient = googleMapsClient.createClient({ key: googleApiKey, Promise: Promise });

const googleResToCoordinates = pipe(
  pathOr({}, ['json', 'results', 0, 'geometry', 'location']),
  ({ lat, lng }) => [lat, lng]
)

const getLocationFromEndereco = ({ rua, cidade, uf, cep, numero }) => {
  return mapsClient.geocode({ components: {
    route: `${rua} ${numero}`,
    postal_code: cep,
    city: cidade,
    country: 'Brasil',
    language: 'pt'
  }})
    .asPromise()
    .then(googleResToCoordinates)
}

module.exports = getLocationFromEndereco;
