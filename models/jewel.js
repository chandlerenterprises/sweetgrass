var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GFS = mongoose.model("GFS", new Schema({}, {strict: false}), "fs.files" );

var userSchema = new Schema({
  title : String,
  description : String,
  price : Number,
  tags : [{
    ref : {
      type: Schema.Types.ObjectId,
      ref: 'tag'
    }
  }],
  images : [{ 
    ref: {
      type: Schema.Types.ObjectId,
      ref: 'GFS'
    }
  }]
});

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;