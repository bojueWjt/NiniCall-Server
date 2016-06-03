var sio = require('socket.io');
var systemSocket = require('./systemMessage');
var chatSocket = require('./chat');

function Socket(server) {
  var io = sio.listen(server);
  console.log('socketConfig');
  systemSocket(io);
  chatSocket(io);
}

module.exports = Socket;