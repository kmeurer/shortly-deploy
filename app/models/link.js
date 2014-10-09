var crypto = require('crypto');
var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: { type: Date, default: Date.now }
});




// convert to .pre form

var Link = mongoose.model('Link', urlSchema);

Link.pre('save', function(next){
    var shasum = crypto.createHash('sha1');
    shasum.update(url);
    this.code = shasum.digest('hex').slice(0, 5);
    next();
});
