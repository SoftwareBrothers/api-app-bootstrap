/* eslint no-console: 'off' */
require('newrelic');
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
