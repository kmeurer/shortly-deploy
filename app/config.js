var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Promise = require('bluebird');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/simplydb');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('successfully connected');
});

module.exports = db;
