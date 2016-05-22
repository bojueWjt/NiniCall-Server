var User = require("../models/user");
var Code = require('../models/code');
var _ = require('lodash');
var unit = require('../unit');
var errCode = require('../common/erroCode');

function userSignup(req,res){

  var _user = req.body;

  console.log(req.body);
  console.log(_user);

  Code.findOne({phoneNum: _user.phoneNum}, function(err, code) {
    if (err) {
      console.log(err);
    }

    if (!code) {
      res.send(JSON.stringify(errCode.notCode));
    } else if (code.code == _user.code) {

      User.find({ phoneNum: _user.phoneNum}, function(err, user) {
        if (err) {
          console.log(err);
        }

        if (user.length != 0) {
          res.send(JSON.stringify(errCode.notMatch));
        }

        var newUser = new User(_user);

        newUser.save(function(err,user){

          if(err){

            console.log(err);
          }

          responseInfo = {
            code: 0,
            status: 'success',
          };

          res.send(JSON.stringify(responseInfo));

        });
      });

    }else {
      res.send(JSON.stringify(errCode.codeErr));
    }

  });
};

function userSignin(req,res){

  var user = req.body;
  console.log(user);
  User.findOne({phoneNum:user.phoneNum})
    .populate("friends", "username")
    .exec(function(err,mUser){
    console.log("ninininiinni");
    if(err){

      console.log(err);
    }

    if(!mUser){

      res.send(JSON.stringify(errCode.notMatch));

    }else{
      
      mUser.compare(user.password,function(err,isMatch){

        if(err){

          console.log(err);
        }

        if(isMatch){
          console.log(mUser);

          res.send(JSON.stringify({
            code: 0,
            status: 'success',
            user: mUser,
          }));
          console.log("the password is match");
        }else{

          res.send(JSON.stringify(errCode.notMatch));

          console.log("the password is not match");
        }
      });
    }
  });
}

function findOneUser(req, res) {
  var id = req.params.phoneNum;
  User.findOne({
    phoneNum: id,
  }, function(err, mUser) {
    if (err) {
      console.log(err);
    }
    
    if (!mUser) {
      console.log('用户不存在');

    }

    res.send(JSON.stringify({
      code: 0,
      user: mUser,
    }));
  })
}

function updateUser(req, res) {
  var user = req.body;
  User.findOne({
    phoneNum: user.phoneNum,
  }, function(err, mUser) {
    if (err) {
      console.log(err);
    }

    if (!mUser) {
      console.log('用户不存在');
      res.send(JSON.stringify(errCode.notFindUser))
    } else {

      const newUser = _.merge(mUser, user);
      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
        } else {

          res.send(JSON.stringify({
            code: 0,
            user: user,
          }));
        }
      })
    }
  })
}


function sendCode(req, res) {
  var phoneNum = req.params.phoneNum;
  const codeNum = parseInt(Math.random()*1000000);
  const code = {
    phoneNum: phoneNum,
    code: codeNum,
  };
  const content = '【NiniCall】您的验证码是' + codeNum + ',60秒内有效.若非本人操作请忽略此消息';
  console.log(code);
  unit.sendMessage(phoneNum, content, function() {
    Code.findOne({ phoneNum: code.phoneNum }, function(err, myCode) {

      if (err) {
        console.log(err)
      }

      if (!myCode) {
        const _code = new Code(code);
        _code.save(function(err, code) {
          if (err) {
            console.log(err);
          }
          res.send(JSON.stringify({
            code: 0,
            data: code,
          }));
        });
      } else {
        const newCode = _.merge(myCode, code);
        newCode.save(function(err, code) {
          if (err) {
            console.log(err);
          }
          res.send(JSON.stringify({
            code: 0,
            data: code,
          }))
        })
      }
    })
  });

}

exports.userSignup = userSignup;

exports.userSignin = userSignin;

exports.sendCode = sendCode;

exports.findOneUser = findOneUser;

exports.updateUser = updateUser;
