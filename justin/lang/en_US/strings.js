exports.Strings = {
	HELLO_MSG: 	
		"\n ---------------------\n" +
		"/Justin socket server/\n" +
		"---------------------\n",
	STARTED_LISTENING_SOCKET:
		"Started listening on unix socket ",
	STARTED_LISTENING_PORT:
		"Started listening on port "	
};

exports.ErrorStrings = {
	CROSSDOMAIN_SERVER_FAULT: "Unable to start crossdomain policy server. " +
			"If you don't use client written in Adobe Flash, you can turn off this message by setting POLICY: false" +
			"in configuration file.",
	PORT_IN_USE: function(port) { 
		return '[ERROR] Port ' + port + ' is already in use. Unable to bind.'
	},
	STORAGE_INITIALIZATION:
		"unable to start server due to storage connection fail"	
};