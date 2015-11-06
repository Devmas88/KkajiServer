require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'kkaji',
        title : 'kkaji',
		webServerPort : 8999
	},
	NODE_CONFIG : {
		dbName : 'kkaji',
		Blog : {
			password : '111111'
		}
	}
});