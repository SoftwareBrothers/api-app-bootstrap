/**
 * @fileOverview Mongoose configuration
 */

const mongoose = require('mongoose');

module.exports.connect = async () => mongoose.connect(process.env.MONGO_URL);

module.exports.mongoose = mongoose;
