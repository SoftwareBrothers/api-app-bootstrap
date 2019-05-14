const health = require('./endpoints/health-route');
const usersCreate = require('./endpoints/users-create-route');
const usersAuth = require('./endpoints/users-auth-route');
const me = require('./endpoints/me-route');

module.exports = {
  '/api/health': health,
  '/api/users/create': usersCreate,
  '/api/users/auth': usersAuth,
  '/api/me': me,
};
