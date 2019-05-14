const usersController = require('../../controllers/users-controller');
const userAuthSchema = require('../schemas/user-auth');
const tokenSchema = require('../schemas/token');
const errorSchema = require('../schemas/error');
const errorBadRequestSchema = require('../schemas/error-bad-request');
const UserExistByEmailValidator = require('../../validators/user/user-exists-by-email.validator');

module.exports = {
  path: '/api/users',
  method: 'POST',
  handler: usersController.create,
  options: {
    auth: false,
    pre: [
      { method: UserExistByEmailValidator },
    ],
    description: 'Creates new user',
    tags: ['api'],
    validate: {
      payload: userAuthSchema,
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Success',
            schema: tokenSchema,
          },
          409: {
            description: 'Conflict, user already exists',
            schema: errorSchema,
          },
          400: {
            description: 'Bad Request',
            schema: errorBadRequestSchema,
          },
        },
        payloadType: 'form',
      },
    },
  },
};
