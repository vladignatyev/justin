var c = require('./core/controller.js');
var topic = require('./core/topic.js');

/**
 * Justin connection management singleton.
 * It manages connections and provide entry point for data processing loop.
 * */
var Justin = {
	/*Connections pool*/
	connections: [],
	
	/*Opened topics*/
	topics: [],
	
	storage: null,
	
	setStorage: function (storage) {
		this.storage = storage;
	},
	
	createTopic: function () {
		new topic.Topic()
	},
	
	findTopic: function () {
		
	},
	
	handleConnection: function (socket) {
		var connectionObj = new c.Connection(Justin, socket);
		socket.on('end', function(){
			Justin.closeConnection(connectionObj);
		});
		Justin.connections.push(connectionObj);
		console.log(Justin.connections);
		console.log(Justin);
	},
	
	closeConnection: function (connection) {
		connection.socket.close();
		Justin.connections.splice(Justin.pool.indexOf(connection), 1);
	}
};

exports.Justin = Justin;

