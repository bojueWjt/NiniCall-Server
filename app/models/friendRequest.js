var mongoose = require("mongoose");
var FriendRequestSchema = require("../schemas/friendRequest");

var FriendRequest = mongoose.model("FriendRequest",FriendRequestSchema);

module.exports = FriendRequest;