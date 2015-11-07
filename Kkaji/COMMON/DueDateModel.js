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
			
			title : {
				notEmpty : true,
				size : {
					max : 255
				}
			},
			
			content : {
				notEmpty : true,
				size : {
					max : 10000
				}
			},

			comment : {
				name : {
					size : {
						max : 255
					}
				},
				size : {
					max : 1000
				}
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