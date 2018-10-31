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

const getLocationFromEndereco = ({ rua, cidade, uf, cep, numero, bairro }) => {
  return mapsClient.geocode({
    address: `${rua}, ${cidade}`,
    components: {
      postal_code: cep,
    }
  })
    .asPromise()
    .then(googleResToCoordinates)
}

module.exports = getLocationFromEndereco;
