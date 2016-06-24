
'use strict'; // allow 'let'

// DEPENDENCIES - NPM PACKAGES

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// SCHEMA

const USER_SCHEMA = new mongoose.Schema({
  username: String,
  password: String,
});

USER_SCHEMA.plugin(passportLocalMongoose);

// MODEL

const user = mongoose.model('User', USER_SCHEMA);

// EXPORT

module.exports = user;
