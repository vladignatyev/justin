var sig = require('./md5.js');
var EventEmitter = require('events').EventEmitter;

function Connection (justin, socket) {
	var instance = this;
	
	/**
	 * Emitter for package accepting events
	 * */
	this.emitter = new EventEmitter();
	
	this.socket = socket;
	this.justin = justin;
	
	this.verifySignature = function (sign, pkgData) {
		return true;
	};
	
	this.handleData = function (buffer) {
		this.write(sig.md5(sig.strToRaw(buffer.toString('ascii'))));
	};
	
	this.handlePackage = function (sign, pkgData) {
		if (!instance.verifySignature(sign, pkgData)) {
			instance.justin.closeConnection(instance);
		}
	}
	
	this.socket.on('data', this.handleData);
	this.emitter.on('packageAccepted', this.handlePackage);
};

exports.Connection = Connection;

