var express = require('express');
var router = express.Router();

var user = require('../app/controllers/user');
var friend = require('../app/controllers/friend');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/signup', user.userSignup);

router.post('/user/signin', user.userSignin);

router.post('/user/update', user.updateUser);

router.post('/user/addFriend', friend.addFriend);

router.get('/user/getCode/:phoneNum', user.sendCode);

router.get('/user/findUser/:phoneNum', user.findOneUser);

module.exports = router;
