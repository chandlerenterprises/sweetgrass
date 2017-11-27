
module.exports = function(io) {
  
  global.sockets = {}
  
  io.on('connection', function (socket) {
    
    global.sockets[socket.id] = socket
    
    socket.emit('news', { hello: 'world' });
    
    socket.on('my other event', function (data) {
      console.log(data);
    });
    
  });
  
}