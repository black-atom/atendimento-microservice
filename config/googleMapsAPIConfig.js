const { getConfig } = require('./utils');

const config = {
  development: {
    apiKey: 'replace',
  },
  test: {
    apiKey: 'replace',
  },
  production: {
    apiKey: 'replace',
  }
};

module.exports = getConfig(config);