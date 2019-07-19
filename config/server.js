/**
 * @fileOverview Hapi server main configuration file
 */

const Hapi = require('hapi');
const Boom = require('boom');
const auth = require('./auth');
const swagger = require('./swagger');
const admin = require('./admin');

const routes = require('../src/routes');

const server = Hapi.server({
  port: process.env.PORT,
  routes: {
    validate: {
      failAction: async (req, response, err) => {
        throw Boom.badRequest(err.message);
      },
    },
  },
});

module.exports.start = async (database) => {
  await auth.register(server);

  if (process.env.SWAGGER === 'true') {
    await swagger.register(server);
  }

  if (process.env.ADMIN === 'true') {
    await admin.register(server, database);
  }

  for (const route in routes) {
    server.route(routes[route]);
  }

  return server.start();
};
