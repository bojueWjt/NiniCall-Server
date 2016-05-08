var mongoose = require('mongoose');
var CodeSchema = require('../schemas/code');

var Code = mongoose.model('Code', CodeSchema);

module.exports = Code;