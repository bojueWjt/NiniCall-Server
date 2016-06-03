var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var ChatHistoryMessage = new mongoose.Schema({
  to: {
    type: ObjectId,
    ref: 'User'
  },
  content: String,
  eventName: String,
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
});

ChatHistoryMessage.pre("save",function(next){

  if(this.isNew){

    this.meta.createAt = this.meta.updateAt = Date.now();
    this.status = 0;
  }else{

    this.meta.updateAt = Date.now();
  }

  next();
});

ChatHistoryMessage.statics = {

  fetch:function(cd){

    return 	this.find({})
      .sort("meta.updateAt")
      .exec(cd);
  },
  findById:function(id,cd){
    return this.findOne({_id:id})
      .exec(cd);
  },
  findByToUserId: function(id, cd){
    return this.find({
      to: id
    }).sort("meta.createAt")
      .exec(cd)
  }
};


module.exports = ChatHistoryMessage;