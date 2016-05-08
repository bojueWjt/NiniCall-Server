var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({

  phoneNum: {
    type: String,
    unique: true,
  },
  code: String,
  meta: {
    updateAt: {
      type: Date,
      default: Date.now()
    },
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
});

CodeSchema.pre('save', function(next) {

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  next();
});

module.exports = CodeSchema;
