module.exports = function(gfs, files, buffers, idx, readStream, multiple, cb) {
  
  var options = {
    _id : files[idx].ref, 
    description : files[idx].description,
    buffer : []
  }
  
  var localIdx = ( multiple ? idx : 0 )
  
  readStream = gfs.createReadStream({ _id : options._id });
  buffers.push(options)
  
  readStream.on("data", function (chunk) {
    buffers[localIdx].buffer.push(chunk)
  })
  
  readStream.on("end", function () {
    buffers[localIdx].buffer = Buffer.concat(buffers[localIdx].buffer).toString('base64');
    localIdx = ++localIdx
    
    if(localIdx !== files.length && multiple) return module.exports(gfs, files, buffers, localIdx, false, true, cb)
    else return cb(buffers)
  })
 
}