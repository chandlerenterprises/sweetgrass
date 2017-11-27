var validator = require('validator');
var Bcrypt = require('bcryptjs');
var async = require('async')

var errorHandler = require(global.base+'/middleware/errorHandler')
var User = require(global.base+'/models/user')

module.exports = function(req, res) {
  var email = req.body.email.toLowerCase(), username = req.body.username.toLowerCase()

  if (!validator.isEmail(email)) return res.error('Please enter a valid email')

  User.find({ email : email }, { username : username }, function(err, user) {
    if (err) return errorHandler.mongo(err)
  
    var exists = 'A user already exists with that '
    if (user.email == email) return res.error(exists + 'email!')
    if (user.username == username) return res.error(exists + 'username')

    User.create({
      email : email,
      username : username,
      password : Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10)),
      uploads: []
    }, function(err, results) {
      if (err) return errorHandler.mongo(err)
      res.success()
    });
    
  });

}