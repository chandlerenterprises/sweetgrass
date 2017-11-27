var express = require('express');
var router = express.Router();

/*
 
 UPLOAD CONTROLLER - Creates Jewel here

*/

router.post('/post/:meta', function(req, res) {
  require('./upload')(req, res)
})

module.exports = router;

//....
