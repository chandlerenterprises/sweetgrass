var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));

router.use('/jewels', require('./jewels'))

router.use('/tags', require('./tags'))

module.exports = router;
