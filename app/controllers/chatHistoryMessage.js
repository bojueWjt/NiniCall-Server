var ChatHistoryMessage = require('../models/chatHistoryMessage');

function addChatHistoryMessage(eventName, data, to) {

  var _message = {
    eventName: eventName,
    content: JSON.stringify(data),
    to: to,
  };

  var newMessage = new ChatHistoryMessage(_message);
  newMessage.save(function(err) {

    if (err) {

      console.log(err);
    }

    return true;
  });
}

function removeChatHistoryMessage(req, res) {
  var params = req.body;
  var id = params.id;
  console.log(req.body);
  ChatHistoryMessage.remove({_id: id}, function(err, chatMessages) {

    if (err) {
      console.log(err);
    }

    var successInfo = {
      code: 0,
      status: 'success',
    };

    res.send(JSON.stringify(successInfo));
  });

}


function findMessageByUserId(id, cb) {

  return ChatHistoryMessage.findByToUserId(id, function(err, userMessages) {

    if (err) {
      console.log(err);
    }

    cb(userMessages);
  });

}

exports.findMessageByUserId = findMessageByUserId;
exports.addChatHistoryMessage = addChatHistoryMessage;
exports.removeChatHistoryMessage = removeChatHistoryMessage;