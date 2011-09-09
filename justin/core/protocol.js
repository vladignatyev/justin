var utils = require('../utils/utils.js');

var PacketConsts = {
	PACKET_START_CHUNK: [0xFF,0x7F],
	SIGN_START_CHUNK:   [0x3F,0x1F],
	DATA_START_CHUNK:   [0x0F,0x07]
};

function PacketProvider () {
	this.provideRawPacket = function (pubSig, data) {
		var dataArray = [];
		var md5Hash = require('md5.js').md5(data);
		var buffer = new Buffer();
	};
}

function PacketData () {
	
}

function PacketParser () {
	this.getPacketFromData = function () {
		
	};
}

exports.PacketProvider = PacketProvider;