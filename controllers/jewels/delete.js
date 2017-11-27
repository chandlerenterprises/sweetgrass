var mongoose = require('mongoose')
var Grid = require('gridfs-stream')
var User = mongoose.model('users')
//var fs_files = mongoose.model('fs.files'), fs_chunks = mongoose.model('fs.chunks')

var errorHandler = require(global.base+'/middleware/errorHandler')
var conn = mongoose.connection
Grid.mongo = mongoose.mongo


module.exports = function(req, res) {
  console.log(req.body)
  
  var gfs = Grid(conn.db), ID = req.body.fileID
  if(!ID) return res.error('please send a valid ID')
  
  User.findOne({ username : res.locals.username }, function(err, user) {
    if(err) return errorHandler.mongo(err)

    var files = user.toObject(), files = user.files
    var belongsToUser, idx

    for(var a in files) {
      if(files[a].ref == ID) belongsToUser = true, idx = a
    }
    
    if(!belongsToUser) return res.error('this file doesnt belong to you')
    
    gfs.remove({ _id : ID }, function(err) {
      if(err) return errorHandler.mongo(err)
      
      user.files.splice(idx, 1), user.save()
      res.success('successfully removed')
    })
        
  })

}