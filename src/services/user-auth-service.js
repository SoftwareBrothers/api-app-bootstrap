const Bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../models/user-model');

module.exports = {
  /**
    * @param  {string} email
    * @param  {string} password
    * @return {User}
    */
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    const invalid = !user || !await Bcrypt.compare(password, user.auth && user.auth.password);
    if (invalid) {
      throw Boom.forbidden('Email and|or password doesn\'t match');
    }
    return user;
  },
};
