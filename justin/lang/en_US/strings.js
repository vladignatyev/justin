exports.Strings = {
	HELLO_MSG: 	
		"\n ---------------------\n" +
		"/Justin socket server/\n" +
		"---------------------\n",
	STARTED_LISTENING_SOCKET:
		"Started Justin on unix socket ",
	STARTED_LISTENING_PORT:
		"Started Justin on port ",
	STARTED_CROSSDOMAIN: function (port) { 
		return "Started Crossdomain on port " + port;
	}
};

exports.ErrorStrings = {
	CROSSDOMAIN_SERVER_FAULT: "[ERROR] Unable to start crossdomain policy server. " +
			"If you don't use client written in Adobe Flash, you can turn off this message by setting POLICY: false " +
			"in configuration file.",
	PORT_IN_USE: function(port) { 
		return '[ERROR] Port ' + port + ' is already in use. Unable to bind.'
	},
	STORAGE_INITIALIZATION:
		"[ERROR] Unable to start server due to storage connection fail"	
};