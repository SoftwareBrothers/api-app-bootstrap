/**
 * @module models
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  auth: {
    password: String,
  },
});

UserSchema.set('toObject', { versionKey: false });

/**
 * Mongoose model for the users collection.
 *
 * @constructor
 */
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
