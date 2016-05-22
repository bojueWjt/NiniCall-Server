var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var FriendRequest = new mongoose.Schema({
  name:String,
  from: {
    type: ObjectId,
    ref: 'User',
  },
  to: {
    type: ObjectId,
    ref: 'User',
  },
  // 0 未接收 1 已接收 2 已同意 3 已拒绝
  status: Number,
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

FriendRequest.pre("save",function(next){

  if(this.isNew){

    this.meta.createAt = this.meta.updateAt = Date.now();
    this.status = 0;
  }else{

    this.meta.updateAt = Date.now();
  }

  next();
});

FriendRequest.statics = {

  fetch:function(cd){

    return 	this.find({})
      .sort("meta.updateAt")
      .exec(cd);
  },
  findById:function(id,cd){
    return this.findOne({_id:id})
      .exec(cd);
  }
};


module.exports = FriendRequest;