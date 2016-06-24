
'use strict'; //enable 'let'

// DEPENDENCIES - NPM PACKAGES

var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// DEPENDENCIES - DATABASE MODELS

const User = require('./models/user.js')

// DEPENDENCIES - OTHER LOCAL SCRIPTS

const pjson = require('./package.json');

// CONSTANTS

const APP_NAME = pjson.name;
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const SERVER_MESSAGE = `Serving ${APP_NAME} on port ${PORT}`;
const DEFAULT_DATABASE_URL = `mongodb://localhost/${APP_NAME}`;
const DATABASE_URL = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
const DATABASE_MESSAGE = `Connected to database at ${DATABASE_URL}`;

// SETTINGS

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
ejs.delimiter = '?';

// VARIABLES



// ROUTES

  // Route - Root
app.get('/', function(req,res) {
  res.render('home');
});

  // Route - Secret
app.get('/secret', function(req, res) {
  res.render('secret');
});

// FUNCTIONS

function initialize() {
  serverListen();
  databaseConnect();
};

function serverListen() {
  app.listen(PORT, function() {
    console.log(SERVER_MESSAGE);
  });
}

function databaseConnect() {
  mongoose.connect(DATABASE_URL, function() {
    console.log(DATABASE_MESSAGE);
  });
};

// MAIN

initialize();
