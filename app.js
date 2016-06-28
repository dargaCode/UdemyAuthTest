
'use strict'; //enable 'let'

// DEPENDENCIES - NPM PACKAGES

var express = require('express');
var app = express();
var expressSession = require('express-session');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

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
const REDIRECTS = {
  successRedirect: '/secret',
  failureRedirect: '/login',
};

// SETTINGS

app.set('view engine', 'ejs');
ejs.delimiter = '?';
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
  secret: 'once one time with the thing and the stuff',
  resave: false,
  saveUninitialized: false,
}));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

// ROUTES - REGISTRATION

  // Registration Route - Index

app.get('/register', function(req, res) {
  res.render('register');
});

  // Registration Route - Create
app.post('/register', function(req, res) {
  const newUser = new User({username: req.body.username});
  const newPassword = req.body.password;
  User.register(newUser, newPassword, function(err, createdUser) {
    if (err) {
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/secret');
      });
    }
  })
});

// ROUTES - LOGIN

  // Login Route - Form
app.get('/login', function(req, res) {
  res.render('login');
});

  // Login Route - Submit
app.post('/login', passport.authenticate('local', REDIRECTS), function(req, res) {

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
