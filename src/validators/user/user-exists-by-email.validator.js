const Boom = require('boom');

const User = require('../../models/user-model');

module.exports = async ({ payload: { email } }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw Boom.conflict('User already exists');
  }

  return true;
};
