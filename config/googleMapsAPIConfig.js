const { getConfig } = require('./utils');

const config = {
  development: {
    apiKey: null,
  },
  test: {
    apiKey: null,
  },
  production: {
    apiKey: null,
  }
};

module.exports = getConfig(config);