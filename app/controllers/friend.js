var User = require("../models/user");
var Code = require('../models/code');
var app = require("../../app.js");
var _ = require('lodash');
var unit = require('../unit');
var errCode = require('../common/erroCode');

// 添加好友
function addFriend(req, res) {
  var params = req.body;
  User.findOne({
    phoneNum: params.phoneNum,
  }, function(err, mUser) {
    if (err) {
      console.log(err);
    }

    if (!mUser) {
      console.log('用户不存在');
      res.send(JSON.stringify(errCode.notFindUser))
    } else {

      User.findById(params.currentUserId, function(err, currentUser) {
        if (err) {
          console.log(err);
        }

        if(!currentUser) {
          console.log('当前操作用户不存在');
          res.send(JSON.stringify(errCode.notFindCurrentUser))
          return;
        }

        if (currentUser.friends.indexOf(params.friendId)) {
          console.log('该用户已是好友');
          res.send(JSON.stringify(errCode.hasBeenFriend));
          return;
        }

        currentUser.friends.push(params.friendId);
        console.log(currentUser);
        currentUser.save(function(err, user) {
          if (err) {
            console.log(err);
          } else { 
            res.send(JSON.stringify({
              code: 0,
              user: user,
            }));
          }
        })
      });
    }
  })
}

// 查询用户的所有好友
function findAllFriend(req, res) {
  var params = req.body;
  User.findOne({ phoneNum: params.phoneNum }, function(err, mUser) {
    if (err) {

    }
  });
}

function findOneFriend(req, res) {
  var id = req.params.id;

  User.findById(id, function(err, friend) {

    if (err) {
      console.log(err);
    }

    if (!friend) {

      res.send(err.notFindUser);
      return;
    }

    var successInfo = {
      code: 0,
      friend: friend,
    };

    res.send(JSON.stringify(successInfo));
  })
}

exports.addFriend = addFriend;
exports.findOneFriend = findOneFriend;