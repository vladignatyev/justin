exports.Configuration = {
		LISTEN_PORT: 						8124,
		LISTEN_SOCKET: 						'',
		LOCALE: 							'en_US',
		RESTART_TIMEOUT: 					1000,
		
		/**
		 * Adobe Flash crossdomain policy settings 
		 * */
		Flash: {
			POLICY: 						true,
			POLICY_FILEPATH: 				'',
			POLICY_PORT: 					843,
			POLICY_HOST: 					'localhost'
		}
};

exports.Storage = {
	DRIVER: 'memcached',
	HOST: 'localhost',
	PORT: '11211',
	LOGIN: '',
	PASSWORD: ''	
}; 