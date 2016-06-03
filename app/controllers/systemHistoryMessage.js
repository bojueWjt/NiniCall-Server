var SystemHistoryMessage = require('../models/systemHistoryMessage');

function addSystemHistoryMessage(eventName, data, to) {

  var _message = {
    eventName: eventName,
    content: JSON.stringify(data),
    to: to,
  };

  var newMessage = new SystemHistoryMessage(_message);
  newMessage.save(function(err) {

    if (err) {

      console.log(err);
    }

    return true;
  });
}

function removeSystemHistoryMessage() {


}

function findAll(cb) {
  return SystemHistoryMessage.fetch(cb);
}


function findMessageByUserId(id, cb) {

  return SystemHistoryMessage.findByToUserId(id, function(err, userMessages) {

    if (err) {
      console.log(err);
    }

    cb(userMessages);
  });

}

exports.findMessageByUserId = findMessageByUserId;
exports.addSystemHistoryMessage = addSystemHistoryMessage;
exports.findAll = findAll;