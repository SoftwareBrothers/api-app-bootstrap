/* eslint no-console: 'off' */
const pkg = require('./package.json');
require('@google-cloud/trace-agent').start();
require('@google-cloud/debug-agent').start({
  serviceContext: {
    service: 'hapi-api',
    version: pkg.version,
  },
});

const server = require('./config/server');
const database = require('./config/database');

const start = async () => {
  try {
    await database.connect();
    await server.start(database);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running');
};

start();
