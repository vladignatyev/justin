var c = require('./core/controller.js');

var Justin = {
	/*Connections pool*/
	pool: new Array(),
	
	handleConnection: function (socket) {
		Justin.pool.push(new c.Connection(Justin, socket));
	},
	closeConnection: function (connection) {
		connection.socket.close();
		Justin.pool.splice(Justin.pool.indexOf(connection), 1);
	}
};

exports.Justin = Justin;

