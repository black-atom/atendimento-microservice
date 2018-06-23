const { getConfig } = require('./utils');

const config = {
  development: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY || null,
  },
  test: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY|| null,
  },
  production: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY || null,
  }
};

module.exports = getConfig(config);