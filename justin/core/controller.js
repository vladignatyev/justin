var sig = require('./md5.js');
var EventEmitter = require('events').EventEmitter;

var random = require('./random.js');
var protocol = require('./protocol.js');

function Connection (justin, socket) {
	var instance = this;
	this.socket = socket;
	this.justin = justin;
	
	this.packetProvider = new protocol.PacketProvider();
	this.packetParser = new protocol.PacketParser();
	
	this.connectionUnique = random.get();
	
	this.handleDataPacket = function (pktData) {
//		if (!instance.verifySignature(sign, parsedData)) {
//			instance.justin.closeConnection(instance);
//		}
	};
	
	this.init = function () {
		this.packetParser.on('clientData', this.handleDataPacket);
		this.packetParser.on('clientCommand', this.handleDataPacket);
		this.packetParser.on('clientHandshake', this.handleDataPacket);
		
		this.socket.write(instance.packetProvider.getServerHandshake(this.connectionUnique));
	};
	
	this.init();
};

exports.Connection = Connection;

