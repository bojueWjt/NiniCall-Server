var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
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

  var user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){

    if(err) return next(err);

    bcrypt.hash(user.password,salt,function(err,hash){

      if(err) return next(err);

      user.password = hash;
      next()
    });

  });
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
    console.log(password);
    console.log(this.password);
    bcrypt.compare(password,this.password,function(err,isMatch){
      if(err) return cd(err);

      return cd(null,isMatch, this);
    })
  }
};

module.exports = UserSchema;