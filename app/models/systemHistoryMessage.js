var mongoose = require("mongoose");
var SystemHistoryMessageSchema = require("../schemas/systemHistoryMessage");

var SystemHistoryMessage = mongoose.model("SystemHistoryMessage",SystemHistoryMessageSchema);

module.exports = SystemHistoryMessage;