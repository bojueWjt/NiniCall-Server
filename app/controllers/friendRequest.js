var FriendRequest = require("../models/friendRequest");
var unit = require('../unit');
var User = require("../models/user");
var errCode = require('../common/erroCode');

function addFriendRequest(req, res) {
  var params = req.body;
  console.log(params);
  var currentUserId = params.currentUserId;
  var friendId = params.friendId;
  FriendRequest.find({
    from: currentUserId,
    to: friendId,
  }, function(err, friendRequests) {
    if (err) {
      console.log(err);

    }

    if (friendRequests.length) {
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
        friendRequest: mFriendRequest,
      });
    })
    
  })
  
}

function agreeFriendRequest(req, res) {
  const params = req.body;
  console.log(params);
  var id = params.id;
  FriendRequest.findById(id, function(err, friendRequest) {

    if(err) {
      console.log(err);
    }

    User.findById(friendRequest.to, function(err, toUser) {

      if(err) {
        console.log(err);
      }

      toUser.friends.push(friendRequest.from);
      toUser.save(function(err) {
        if(err) {
          console.log(err);
        }

        User.findById(friendRequest.from, function(err, fromUser) {

          if(err) {
            console.log(err);
          }

          fromUser.friends.push(friendRequest.to);
          fromUser.save(function(err) {

            if (err) {

              console.log(err);
            }

            FriendRequest.remove({
              _id: id
            }, function(err) {

              if (err) {
                console.log(err);
              }

              const serverResult = {
                code: 0,
                status: 'success',
                id: id,
              };

              res.send(JSON.stringify(serverResult));

              return 0;
            })

          })
        })
      });

    });

  })
}

exports.addFriendRequest = addFriendRequest;
exports.agreeFriendRequest = agreeFriendRequest;