const User = require('../../src/models/user-model');

if (!factory.factories.user) {
  factory.define('user', User, {
    email: factory.sequence('User.email', n => `user${n}@example.com`),
    auth: { password: 'password' },
  });
}
