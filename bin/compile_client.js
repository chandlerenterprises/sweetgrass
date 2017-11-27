var browserify = require('browserify');
var sass = require('node-sass');
var fs = require('fs');
var path = require('path');
var pleeease = require('pleeease');
var exorcist = require('exorcist');

// Browserify
browserify(
  'client/js/main.js',
  {
    debug: true
  }
)
.transform(
  {
    global: true,
    sourcemap: true
  },
  'uglifyify'
)
.bundle()
.pipe(
  exorcist('public/js/main.min.js.map')
)
.pipe(
  fs.createWriteStream('public/js/main.min.js')
);


// SASS
sass.render(
  {
    file: 'client/scss/styles.scss',
    outFile: 'client/scss/styles.scss.map',
    sourceMap: true,
    sourceMapEmbed: true,
    sourceMapContents: true,
    outputStyle: 'compressed',
  },
  function(err, result) {
    if(err) {
      console.error(err);
      process.exit(1);
    }
    
    pleeease
    .process(
      result.css,
      {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: true,
        mqpacker: true
      }
    )
    .then(function(css) {
      fs.writeFileSync('public/css/styles.min.css', css);
    });
  }
);