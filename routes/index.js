var express = require('express');
var router = express.Router();

var user = require('../app/controllers/user');
var friend = require('../app/controllers/friend');
var chatMessage = require('../app/controllers/chatHistoryMessage');
var systemHistoryMessage = require('../app/controllers/systemHistoryMessage');
var friendRequest = require('../app/controllers/friendRequest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/signup', user.userSignup);

router.post('/user/signin', user.userSignin);

router.post('/user/update', user.updateUser);

router.post('/user/addFriend', friendRequest.addFriendRequest);

router.post('/friendRequest/agree', friendRequest.agreeFriendRequest)

router.post('/chatMessage/delete', chatMessage.removeChatHistoryMessage);

router.get('/user/getCode/:phoneNum', user.sendCode);

router.post('/historyMessage/delete', systemHistoryMessage.removeSystemHistoryMessage);

router.get('/user/findOne/:id', friend.findOneFriend)

router.get('/user/findUser/:phoneNum', user.findOneUser);

module.exports = router;
