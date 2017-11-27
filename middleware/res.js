module.exports = function(req, res, next) {

  res['error'] = function(msg, data) {
    return this.send({
      success: false,
      error: msg,
      data: data
    });
  };
  
  res['success'] = function(msg, data) {
    return this.send({
      success: true,
      msg: msg,
      data: data
    });
  };

  next();

}