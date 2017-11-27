var Grid = require('gridfs-stream')
var mongoose = require('mongoose')
//var User = mongoose.model('users')
var User = require(global.base+'/models/user')
var errorHandler = require(global.base+'/middleware/errorHandler')
var readFile = require('./readFile')

var conn = mongoose.connection

Grid.mongo = mongoose.mongo

module.exports = function(req, res) {
  
  var loggedInUsername = res.locals.username
  var requestedUsername = req.params.username
  
  var gfs = Grid(conn.db);
  var buffers = []
  
  User.findOne({ username : loggedInUsername }, function(err, user) {
    if(err) return errorHandler.mongo(err)
    if(!user) return res.error('unexpected error')
    
    var files = user.toObject(), files = user.files.toObject()
    
    if(!files[0]) return res.render('upload', { uploads : [] })
    
    readFile(gfs, files, [], 0, false, true, function(parsed) {
      res.render('upload', { uploads : parsed })
    })
   
  })
  
}