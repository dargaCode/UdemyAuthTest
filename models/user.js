
'use strict'; // allow 'let'

// DEPENDENCIES - NPM PACKAGES

const mongoose = require('mongoose');

// SCHEMA

const USER_SCHEMA = new mongoose.Schema({
  username: String,
  password: String,
});

// MODEL

const user = mongoose.model('User', USER_SCHEMA);

// EXPORT

module.exports = user;
