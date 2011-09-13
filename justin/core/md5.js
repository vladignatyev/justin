function hash(buffer) {
	var crypto = require('crypto');
	var hash = crypto.createHash('md5').update(buffer);
	return new Buffer(hash.digest('binary'));
}

exports.hash = hash;