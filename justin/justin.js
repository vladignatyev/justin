/**
 * Prototype, that does all the job
 * */
function Connection (justin, socket) {
	this.socket = socket;
	this.justin = justin;
	this.master = null;

	var instance = this;
	
	this.setMaster = function (masterConnection) {
		if (this.master !== masterConnection) {
			if (this.master != null) {
				this.master.socket.removeListener('data', this.handleData);
			}
			
			this.master = masterConnection;
			
			if (masterConnection != null) {
				this.master.socket.on('data', this.handleData);
			}
		}
	};
	
	this.handleData = function (dataBuffer) {
		instance.socket.write(dataBuffer);
	};
};

/**
 * Justin connection management singleton.
 * */
var Justin = {
	/*Connections pool*/
	connections: [],
	
	handleConnection: function (socket) {
		var connectionObj = new Connection(Justin, socket);
		connectionObj.setMaster(Justin.connections[0]);	// the first will rule the world
		socket.on('end', function(){
			Justin.closeConnection(connectionObj);
		});
		Justin.connections.push(connectionObj);
	},
	
	closeConnection: function (connection) {
		connection.socket.end();
		Justin.connections.splice(Justin.connections.indexOf(connection), 1);
		Justin.connections.forEach (function(connectionObj, index, connections){
			// If master died, reset master to first connection in connection pool.
			// I know it's bad solution, but for simplicity be this way.
			connectionObj.setMaster(Justin.connections[0]);	
		});
	}
};

exports.Justin = Justin;
