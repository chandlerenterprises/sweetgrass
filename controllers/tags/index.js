var express = require('express');
var router = express.Router();

/*
 
 UPLOAD CONTROLLER

*/

router.get('/', function(req, res) {
  if(res.locals.authenticated && res.locals.admin) require('./load')(req, res)
  else res.render('upload')
})

router.post('/post/:description', function(req, res) {
  require('./upload')(req, res)
})

router.post('/delete', function(req, res) {
  require('./delete')(req, res)
})

router.post('/update', function(req, res) {
  require('./update')(req, res)
})

module.exports = router;

//....
