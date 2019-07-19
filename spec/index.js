process.env.NODE_ENV = 'test';
process.env.MONGO_URL = process.env.MONGO_TEST_URL || 'mongodb://mongo/hapi-server-test';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const { factory } = require('factory-girl');

const models = require('require.all')({
  dir: '../src/models',
  match: /model\.js$/i,
  recursive: false,
});
const database = require('../config/database');
const server = require('../config/server');

chai.use(sinonChai);

global.sinon = sinon;
global.expect = chai.expect;
global.server = server;
global.factory = factory;

before(async () => {
  await database.connect();
});

beforeEach(async () => {
  global.sandbox = global.sinon.createSandbox();
});

afterEach(async () => {
  global.sandbox.restore();
  for (const model in models) {
    await models[model].deleteMany({});
  }
});

after(async () => {
  await database.mongoose.connection.close();
});

require('require.all')({
  dir: './factories',
  recursive: false,
});

require('require.all')({
  dir: '../src/',
  match: /spec\.js$/i,
  recursive: true,
});
