exports.Configuration = {
		UNIQUE:					'you need to change this salt to random value',
		LISTEN_PORT: 			8124,
		LISTEN_SOCKET: 			'',
		LOCALE: 				'en_US',
		RESTART_TIMEOUT: 		1000
};

exports.Storage = {
	DRIVER: 'memcached',
	HOST: 'localhost',
	PORT: '11211',
	LOGIN: '',
	PASSWORD: ''	
}; 