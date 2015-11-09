Kkaji.DueDateModel = OBJECT({

	preset : function() {
		'use strict';

		return Kkaji.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {

			userId : {
				notEmpty : true,
				id : true
			},

			category : {
				notEmpty : true,
				one : ['schedule', 'coupone', 'sale', 'trip', 'deadline', 'event', 'ect']
			},
			
			title : {
				notEmpty : true,
				size : {
					max : 255
				}
			},
			
			content : {
				size : {
					max : 10000
				}
			},

			startDate : {
				date : true
			},

			endDate : {
				date : true
			},

			isPush : {
				bool : true
			},

			files : {
				array : true,
				each : {
					data : true,
					detail : {
						fileId : {
							notEmpty : true,
							id : true
						},
						fileName : {
							notEmpty : true,
							size : {
								max : 1024
							}
						},
						fileSize : {
							notEmpty : true,
							integer : true
						},
						fileType : {
							size : {
								max : 255
							}
						}
					}
				}
			},

			type : {
				notEmpty : true,
				one : ['interval', 'deadline']
			}
		};

		return {
			name : 'DueDate',
			methodConfig : {
				create : {
					valid : VALID(validDataSet),
					role : 'USER'
				},
				update : {
					valid : VALID(validDataSet),
					role : 'USER'
				},
				remove : {
					role : 'USER'
				}
			}
		};
	}
});