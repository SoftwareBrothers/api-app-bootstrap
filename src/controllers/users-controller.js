const Bcrypt = require('bcrypt');
const User = require('../models/user-model');
const auth = require('../../config/auth');
const UserService = require('../services/user-auth-service');

module.exports = {
  /**
    * @param  {String} email
    * @param  {String} password
    * @return {User}
    */
  create: async ({ payload: { email, password } }) => {
    const encryptedPassword = await Bcrypt.hash(password, 10);
    const user = User({
      email,
      auth: { password: encryptedPassword },
    }).save();

    return {
      token: auth.createToken(user),
    };
  },

  auth: async ({ payload: { email, password } }) => {
    const user = await UserService.authenticate(email, password);
    return {
      token: auth.createToken(user),
    };
  },
};
