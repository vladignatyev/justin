exports.Strings = {
	HELLO_MSG: 	
		"\n ---------------------\n" +
		"/Justin socket server/\n" +
		"---------------------\n",
	STARTED_LISTENING_SOCKET:
		"Started listening on unix socket ",
	STARTED_LISTENING_PORT:
		"Started listening on port ",
	PORT_IN_USE: function(port) { 
		return '[ERROR] Port ' + port + ' is already in use. Unable to bind.'
	},
	STORAGE_INITIALIZATION_ERROR:
		"unable to start server due to storage connection fail"
};