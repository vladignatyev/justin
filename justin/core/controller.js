var sig = require('./md5.js');

function Connection (justin, socket) {
	this.socket = socket;
	this.justin = justin;
	
	this.verifySignature = function (buffer) {
		return true;
	};
	
	var connectionObj = this;
	
	this.handleData = function (buffer) {
		this.write(sig.md5(sig.strToRaw(buffer.toString('ascii'))));
		
		if (!connectionObj.verifySignature (buffer)) {
			connectionObj.justin.closeConnection(this);
		}
	};
	
	this.socket.on('data', this.handleData);
};

exports.Connection = Connection;