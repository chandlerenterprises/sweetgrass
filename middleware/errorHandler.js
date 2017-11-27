var fs = require('fs')

exports.mongo = function(mongoError) {
  if(mongoError) {
    fs.appendFile('message.txt', mongoError, function(err) {
      if (err) console.log('mongo error failed to save')
      process.exit(1);
    });
  }
}