var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);


linkSchema.pre('save', function(next){
  bcrypt.hash(this.password, null, null, function(err, hash) {
    this.password = hash;
    next();
  });
});

User.prototype.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      if(err){return callback(err);}
      callback(isMatch);
    });
};

