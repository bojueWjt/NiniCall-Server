var mongoose = require("mongoose");
var ChatHistoryMessageSchema = require("../schemas/chatHistoryMessage");

var ChatHistoryMessage = mongoose.model("ChatHistoryMessage",ChatHistoryMessageSchema);

module.exports = ChatHistoryMessage;