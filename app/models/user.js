var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      console.log("THIS IS THE PASSWORD", this.password);
      if(err){return callback(err);}
      callback(isMatch);
    });
};

userSchema.pre('save', function(next){
  bcrypt.hash(this.password, null, null, function(err, hash) {
    this.password = hash;
    next();
  });
});

module.exports = User;
