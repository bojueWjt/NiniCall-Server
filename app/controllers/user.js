var User = require("../models/user");
var Code = require('../models/code');
var app = require("../../app.js");
var _ = require('underscore');


function signin(req,res){

  res.render("signin",{
    title:"登陆页面"
  });
};

function signup(req,res){

  res.render("signup",{
    title:"注册页面"
  });
};

function userSignup(req,res){

  var _user = req.body;

  console.log(req.body);
  console.log(_user);

  Code.findOne({phoneNum: _user.phoneNum}, function(err, code) {
    if (err) {
      console.log(err);
    }

    if (!code) {
      res.send(JSON.stringify({
        code: 1001,
        errorMessage: '清先获取验证码',
      }));
    } else if (code.code == _user.code) {

      User.find({ phoneNum: _user.phoneNum}, function(err, user) {
        if (err) {
          console.log(err);
        }

        if (user.length != 0) {
          res.send(JSON.stringify({
            code: 1002,
            errorMessage: '该手机已经被注册',
          }));
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
      res.send(JSON.stringify({
        code: 1003,
        errorMessage: '验证码不正确',
      }));
    }

  });
};

function userSignin(req,res){

  var user = req.body;
  console.log(user);
  User.findOne({phoneNum:user.phoneNum},function(err,mUser){

    if(err){

      console.log(err);
    }

    if(!mUser){

      res.send(JSON.stringify({
        code: 2001,
        errorMessage: '账号或密码不正确',
      }));

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

          res.send(JSON.stringify({
            code: 2001,
            errorMessage: '账号或密码不正确',
          }));

          console.log("the password is not match");
        }
      });
    }
  });
}

function logout(req,res){

  delete req.session.user;
  app.publicMethod.deleteUser();

  res.redirect("/");
}

function signinRequired(req,res,next){

  if(!req.session.user){
    return res.redirect("/signin");
  }

  next();
};

function adminRequired(req,res,next){

  var role = req.session.user.role;
  if(role <= 10 || !role){

    return res.redirect("/");
  }

  next();
};


function sendCode(req, res, next) {
  var phoneNum = req.params.phoneNum;
  const codeNum = parseInt(Math.random()*1000000);
  const code = {
    phoneNum,
    code: codeNum,
  };
  console.log(req.params);

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
      const newCode = _.extend(myCode, code);
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
}

exports.signin = signin;

exports.signup = signup;

exports.userSignup = userSignup;

exports.userSignin = userSignin;

exports.logout = logout;

exports.signinRequired = signinRequired;

exports.adminRequired = adminRequired;

exports.sendCode = sendCode;