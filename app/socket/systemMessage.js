var connectUsers = [];
var socketList = {};
var systemHistoryMessage = require('../controllers/systemHistoryMessage');
var unit = require('../unit');

function sendHistoryMessage(socket ,userId) {
  systemhistoryMessage.findMessageByUserId();
}

function systemMessage(io) {
  io.of('/system').
  on('connection', function(socket) {
    const socketId = socket.id;
    var userId = '';

    socket.on('message', function(data) {
      socket.emit('message', { content: data.content });
    });

    socket.on('new user connect', function(data) {
      console.log('new user connect');
      userId = data.userId;
      // if (socketList[userId]) {
      //   return;
      // }
      socketList[userId] = socket;
      socket.join(userId);
      systemHistoryMessage.
      findMessageByUserId(userId, function(userMessages) {
        for(var len = userMessages.length, i = 0; i < len ; i++) {
          var content = JSON.parse(userMessages[i].content);
          content.isHistoryMessage = true;
          content._id = userMessages[i]._id;
          socketList[userId].emit(userMessages[i].eventName, content);
        }
      });
    });


    socket.on('disconnect', function() {
      console.log('call from disconnect' + userId);
      if (socketList[userId]) {
         console.log('delete socket');
      }
    });


    socket.on('new friend request', function (data) {
      console.log('new friend request');
      var to = data.to;
      var from = data.from;
      var username = data.username;

      if (socketList[to]) {
        socketList[to].emit('new friend request', {
          from: from,
          username: username,
        });
      } else {
        systemHistoryMessage.addSystemHistoryMessage('new friend request', data, to);
      }
    });
  })
}

module.exports = systemMessage;
