var User = require("../models/user");
var FriendRequest = require("../models/friendRequest");
var Code = require('../models/code');
var _ = require('lodash');
var unit = require('../unit');
var errCode = require('../common/erroCode');

function addFriendRequest(currentUserId, friendId) {
  FriendRequest.find({
    from: currentUserId,
    to: friendId,
  }, function(err, friendRequests) {
    if (err) {
      console.log(err);
    }

    if (friendRequests) {
      console.log(friendRequests);
      res.send(errCode.hasThisRequest);
      return errCode.hasThisRequest;
    }

    const _friendRequest = {
      from: currentUserId,
      to: friendId,
    };

    const newFriendRequest = new FriendRequest(_friendRequest);
    newFriendRequest.save(function(err, mFriendRequest) {

      if (err) {
        console.log(err);
      }

      res.send({
        code: 0,
        status: 'success',
      });

      return {
        code: 0,
        status: 'success',
      }
    })
    
  })
  
}

exports.addFriendRequest = addFriendRequest;