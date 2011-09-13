Buffer.prototype.merge = function (B) {
	var newLength = B.length + this.length;
	var result = new Buffer(newLength);
	
	var l = this.length;
	for (var i = 0; i < l; i++)
		result[i] = this[i];
	
	for (var j = l; j < newLength; j++)
		result[j] = B[j - this.length];
	
	return result;	
};

/**
 * Returns new Buffer, created from octets, provided by integer number
 * */
exports.bufferFromNumber = function (number) {
	return new Buffer([ (number & 0xFF000000) >> 24,
                 (number & 0x00FF0000) >> 16,
                 (number & 0x0000FF00) >> 8,
                 (number & 0x000000FF)]);
};

Buffer.prototype.lengthBuffer = function (B) {
	var l = this.length;
	return exports.bufferFromNumber(l);
};
