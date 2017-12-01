require('./model/model');
require('./main');
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require('fs');
mongoose.Promise = require('bluebird');   // To remove deprecation warning of mpromise
var morgan = require('morgan');
var path = require('path');
const jwt = require('jsonwebtoken');


mongoose.connect('mongodb://localhost:27017/testDB', { useMongoClient: true });

var app = module.exports = express();

var NODE_ENV = 'development';
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var logFile = fs.createWriteStream('logFile.txt', { flag: 'a' });
// app.use(morgan('combined', { stream: logFile }));

routes = require('./routes/routes');

app.use('/api', routes);

app.use('/logs', express.static(path.join(__dirname + '/logs')));

var port = process.env.PORT || 8888;

app.listen(port);

console.log('Server starts on port ' + port);

