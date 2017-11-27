var express = require('express');
var router = express.Router();

/*
 
 AUTH CONTROLLER

*/

router.post('/signin/', function(req, res) {
  console.log('test')
  require('./signin')(req, res)
})

router.get('/signin/', function(req, res) {
  res.render('signin')
})

router.post('/signup/', function(req, res) {
  require('./signup')(req, res)
})

router.get('/signup/', function(req, res) {
  res.render('signup')
})


module.exports = router;

//....
