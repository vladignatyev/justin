/**
 * Prototype, that does all the job
 * */
function Connection (justin, socket) {
	var instance = this;
	
	this.socket = socket;
	this.justin = justin;
	
	this.master = null;
	
	this.setMaster = function (masterConnection) {
		if (this.master != masterConnection) {
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
		var thisConnection = instance;
		var data = dataBuffer;
		
		instance.justin.connections.forEach(function(connection, i, connections){
			if (connection != thisConnection) {
				connection.socket.write(data);
			}
		});
	};
};

/**
 * Justin connection management singleton.
 * It manages connections and provide entry point for data processing loop.
 * */
var Justin = {
	/*Connections pool*/
	connections: [],
	
	handleConnection: function (socket) {
		var connectionObj = new Connection(this, socket);
		socket.on('end', function(){
			Justin.closeConnection(connectionObj);
		});
		Justin.connections.push(connectionObj);
		
		connectionObj.setMaster(Justin.connections[0]);	// the first will rule the world
	},
	
	closeConnection: function (connection) {
		connection.socket.end();
		Justin.connections.splice(Justin.pool.indexOf(connection), 1);
	}
};

exports.Justin = Justin;

