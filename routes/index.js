var express = require('express');
var router = express.Router();

var user = require('../app/controllers/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/signup', user.userSignup);

router.post('/user/signin', user.userSignin);

router.get('/user/getCode/:phoneNum', user.sendCode);

module.exports = router;
