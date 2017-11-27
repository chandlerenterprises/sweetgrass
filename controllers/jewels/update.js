var mongoose = require('mongoose')
var Grid = require('gridfs-stream')
var User = mongoose.model('users')

var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var ID = req.body.fileID
  if(!ID) return res.error('please send a valid ID')
  
  User.findOne({ username : res.locals.username }, function(err, user) {
    if(err) return errorHandler.mongo(err)

    var files = user.toObject(), files = user.files.toObject()
    var belongsToUser, idx

    for(var a in files) {
      if(files[a].ref == ID) belongsToUser = true, idx = a
    }
    
    if(!belongsToUser) return res.error('this file doesnt belong to you')
  
    user.files[idx].description = req.body.newDescription, user.save()
    res.success('successfully updated')
  })

}