var sass = require('node-sass')
var fs = require('fs')

module.exports = function(req, res, next) {
  var path = 'public/stylesheets/'
  readDirectory(path, function(err) {
    if(!err) next()
  })

}

function readDirectory(path, cb) {

  fs.readdir(path, function(err, files) {
    if(err) return console.log('error reading directory'), process.exit(1)
    
    if(!files[0]) return;

    for(var a in files) {
      if(files[a] == 'input.scss') {
        sass.render({ file: path + 'input.scss', outputFile: path + 'output.css'}, function(err, result) {
          if(err) return console.log('sass issue', err), cb(true), process.exit(1)
          fs.writeFile(path + 'output.css', result.css.toString(), function(err) {
            if(err) return console.log('sass failed to save', err), process.exit(1)
            console.log('converting scss to css : DEV MODE')
          })
        })
      } else {
        var directory = path + files[a] + '/'
        try {
          fs.lstatSync(directory)
          readDirectory(directory)
        }
        catch(err) { return }
      }
    }
    if(cb) cb(false)
  });
}