/**
 * File upload/download service
 * @author Ethan Chandler mstreproductions@gmail.com
 * @date 1/1/17
 **/

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('tiny'));
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.base = path.join(__dirname + '/file-management/', '..', '.');
global.serverSessionId = crypto.randomBytes(20).toString('hex');

app.use(require('./middleware/res'))
app.use(require('./middleware/jwtHandler').express)
app.use(require('./middleware/cssToSass')); //uncomment when deving scss

app.use('/', require('./controllers'));

app.use(function(req, res, next) {
  res.sendStatus(404);
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
});

module.exports = app;
