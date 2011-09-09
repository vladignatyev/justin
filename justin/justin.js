var c = require('./core/controller.js');

/**
 * Justin connection management singleton.
 * It manages connections and provide entry point for data processing loop.
 * */
var Justin = {
	/*Connections pool*/
	pool: new Array(),
	
	handleConnection: function (socket) {
		var connectionObj = new c.Connection(Justin, socket);
		socket.on('end', function(){
			Justin.closeConnection(connectionObj);
		});
		Justin.pool.push(connectionObj);
	},
	closeConnection: function (connection) {
		connection.socket.close();
		Justin.pool.splice(Justin.pool.indexOf(connection), 1);
	}
};

exports.Justin = Justin;

