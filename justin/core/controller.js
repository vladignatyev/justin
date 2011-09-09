var sig = require('./md5.js');
var EventEmitter = require('events').EventEmitter;

function Connection (justin, socket) {
	var instance = this;
	
	/**
	 * Emitter for package accepting events
	 * */
	this.emitter = new EventEmitter();
	
	/**
	 * Array of unparsed packets
	 * */
	this.packets = [];
	
	this.socket = socket;
	this.justin = justin;
	
	this.handleData = function (buffer) {
		this.write(sig.md5(sig.strToRaw(buffer.toString('ascii'))));
	};
	
	this.handlePacket = function (sign, pktData) {
		
		if (!instance.verifySignature(sign, parsedData)) {
			instance.justin.closeConnection(instance);
		}
	};
	
	this.verifySignature = function (sign, pktData) {
		return true;
	};
	
	this.socket.on('data', this.handleData);
	this.emitter.on('packageAccepted', this.handlePacket);
};

exports.Connection = Connection;

