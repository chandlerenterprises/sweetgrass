var mongoose = require('mongoose')
var mongo = require('mongodb')
var Grid = require('gridfs-stream')
var fs = require('fs')
var formidable = require('formidable');
var cookie = require('cookie');

var path = require('path'),
    util = require('util');
    
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr'

var Jewel = require(global.base+'/models/jewel')
var errorHandler = require(global.base+'/middleware/errorHandler')
var readFile = require('./readFile')
var conn = mongoose.connection

Grid.mongo = mongoose.mongo

module.exports = function(req, res) {

  var form = new formidable.IncomingForm();
  var gfs = Grid(conn.db);
  var updatedFiles

  var cookies = cookie.parse(req.headers.cookie)
  var socket = global.sockets[cookies.io]

  if(!res.locals.authenticated) return res.error('you must be logged in to upload art work')

  form.parse(req)
/*  
    .on('progress', function(bytesReceived, bytesExpected) {
      if(socket) {
        socket.emit('progress', { 
          received : bytesReceived,
          expected : bytesExpected
        })
      }
    })
*/   
    .on('file', function(name, file) {
      
      var jewelMeta = decodeURI(req.params.meta)
      var ID = mongoose.Types.ObjectId()
      var fileMeta = { 
        _id: ID,
        filename: file.name,
        content_type: file.type
      }

      console.log(fileMeta)

      var writeStream = gfs.createWriteStream(fileMeta);
      fs.createReadStream(file.path).pipe(writeStream)
    
      writeStream.on('close', function() {
  
        
        
        //
  
      })
  
    })

}
