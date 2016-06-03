const connectUsers = [];
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
            content._id = userMessages._id;
            socketList[userId].emit(userMessages[i].eventName, content, function(data) {
              console.log(data);
            });
          }
        });

        socketList[userId].emit('chat message', {
          from: '574ff3eb2f5cab2582cb9e6c',
          to: '574ff4932f5cab2582cb9e6e',
          content: '今天天气不错',
        });

        socketList[userId].emit('chat message', {
          from: '574ff3eb2f5cab2582cb9e6c',
          to: '574ff4932f5cab2582cb9e6e',
          content: '天气不错',
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