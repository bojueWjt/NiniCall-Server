const socketList = {};
const chatHistoryMessage = require('../controllers/chatHistoryMessage') ;

function chatSocket(io) {
  io.of('/chat')
    .on('connection', function(socket) {

      var userId = '';

      socket.on('new user connect', function(data) {
        userId = data.userId;
        // if (socketList[userId]) {
        //   return;
        // }
        socketList[userId] = socket;
        chatHistoryMessage.
        findMessageByUserId(userId, function(userMessages) {
          for(var len = userMessages.length, i = 0; i < len ; i++) {
            const content =  JSON.parse(userMessages[i].content);
            content.isHistoryMessage = true;
            content._id = userMessages[i]._id;
            socketList[userId].emit(userMessages[i].eventName, content, function(data) {
              console.log(data);
            });
          }
        });
      });

      socket.on('chat message', function(data) {
        var to = data.to;
        var from = data.from;
        var content = data.content;

        if (socketList[to]) {
          socketList[to].emit('chat message', {
            from: from,
            content: content,
          });
        } else {
          chatHistoryMessage.addChatHistoryMessage('chat message', data, to);
        }
      });

      socket.on('disconnect', function() {
        if (socketList[userId]) {
          delete socketList[userId];
        }
      });
    });
}

module.exports = chatSocket;