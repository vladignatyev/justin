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
