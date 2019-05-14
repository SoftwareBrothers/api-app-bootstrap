/**
 * @module models
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  auth: {
    password: String,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
