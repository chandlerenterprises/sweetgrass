var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GFS = mongoose.model("GFS", new Schema({}, {strict: false}), "fs.files" );

var userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  ip: String,
  shoppingCart : [{ 
    ref: {
      type: Schema.Types.ObjectId,
      ref: 'jewel'
    }
  }]
});

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;