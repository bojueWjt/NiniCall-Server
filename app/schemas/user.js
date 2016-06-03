var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({

  username: String,
  phoneNum: {
    type: Number,
    unique: true,
  },
  friends: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  password:String,
  //0 nomal
  //>50 super admin
  role:{
    type: Number,
    default: 0
  },
  local: String,
  motto: String,
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    upDateAt:{
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre("save",function(next){

  if(this.isNew){

    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{

    this.meta.updateAt = Date.now();
  }
  next();
});

UserSchema.statics = {

  fetch:function(cd){

    this.find({}).
    sort("meta.updateAt").
    exec(cd);
  },
  findById:function(id,cd){

    this.findOne({_id:id}).
    exec(cd);
  }
};

UserSchema.methods = {

  compare:function(password,cd){
    var isMatch = false;

    if (this.password === password) {

      isMatch = true;
    }

    return cd(null, isMatch, this);
  }
};

module.exports = UserSchema;