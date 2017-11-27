var express = require('express');
var router = express.Router();

/*
 
 Jewels CONTROLLER

*/

router.get('/', function(req, res) {
  res.render('jewels')
})

router.get('/jewel/:id', function(req, res) {
  if(res.locals.authenticated) require('./load')(req, res)
  else res.render('upload')
})

router.post('/post/:meta', function(req, res) {
  require('./post')(req, res)
})

router.post('/delete', function(req, res) {
  require('./delete')(req, res)
})

router.post('/update', function(req, res) {
  require('./update')(req, res)
})

module.exports = router;

//....
