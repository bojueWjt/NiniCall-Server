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

function removeSystemHistoryMessage(req, res) {
  var params = req.body;
  var id = params.id;
  console.log(req.body);
  SystemHistoryMessage.remove({_id: id}, function(err, chatMessages) {

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
exports.removeSystemHistoryMessage = removeSystemHistoryMessage;