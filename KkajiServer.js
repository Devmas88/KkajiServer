require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'KkajiServer',
        title : 'Kkaji',
		webServerPort : 8999
	},
	NODE_CONFIG : {
		dbName : 'KkajiServer',
		Blog : {
			password : '111111'
		}
	}
});