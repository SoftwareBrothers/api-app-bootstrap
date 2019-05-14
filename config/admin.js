/**
 * @fileOverview AdminBro main cnfiguration file
 */

const AdminBroPlugin = require('admin-bro-hapijs');
const AdminBroMongoose = require('admin-bro-mongoose');
const AdminBro = require('admin-bro');
const Bcrypt = require('bcrypt');
const AdminModel = require('../src/models/admin-model');

AdminBro.registerAdapter(AdminBroMongoose);

/**
 * Creates first admin test@example.com:password when there are no
 * admins in the database
 */
const createAdminIfNone = async () => {
  const existingAdmin = await AdminModel.countDocuments() > 0;
  if (!existingAdmin) {
    const password = await Bcrypt.hash('password', 10);
    const admin = new AdminModel({
      email: 'test@example.com',
      auth: { password },
    });
    await admin.save();
  }
};

module.exports.register = async (server, database) => {
  await createAdminIfNone();
  const options = {
    branding: {
      companyName: 'HottCoffee',
    },
    databases: [database.mongoose],
    auth: {
      authenticate: async (email, password) => {
        const admin = await AdminModel.findOne({ email });
        const isValid = admin && await Bcrypt.compare(password, admin.auth.password);
        return isValid && admin;
      },
      strategy: 'session',
      cookiePassword: process.env.COOKIE_PASSWORD || 'makesurepasswordissecure',
      isSecure: false, // only https requests
    },
  };

  return server.register({
    plugin: AdminBroPlugin,
    options,
  });
};
