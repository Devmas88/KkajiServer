KkajiServer.UserModel = OBJECT({

	preset : function() {
		'use strict';

		return KkajiServer.MODEL;
	},

	params : function() {
		'use strict';

		var
		
		// create valid data set
		createValidDataSet = {

			name : {
				notEmpty : true,
				size : {
					max : 255
				}
			},

			email : {
				notEmpty : true,
				size : {
					min : 5,
					max : 320
				},
				email : true
			},

			password : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				}
			},

			birthYear : {
				notEmpty : true,
				integer : true
			},

			birthMonth : {
				notEmpty : true,
				integer : true
			},

			birthDate : {
				notEmpty : true,
				integer : true
			},

			phoneNumber : {
				notEmpty : true,
				size : {
					min : 10,
					max : 11
				}
			},

			gender : {
				notEmpty : true,
				one : ['male', 'female']
			},
			
			countryCode : {
				notEmpty : true,
				size : {
					min : 2,
					max : 2
				}
			},

			loginCount : {
				notEmpty : true,
				integer : true
			},

			lastLoginTime : {
				date : true
			},

			android : {
				size : {
					max : 255
				}
			},

			ios : {
				size : {
					max : 255
				}
			},
			
			isPushOff : {
				bool : true
			},
			
			lockPassword : {
				size : 4
			},
			
			shareCount : {
				notEmpty : true,
				integer : true
			}
		},

		// update valid data set
		updateValidDataSet = COMBINE([createValidDataSet, {
			newPassword : {
				size : {
					min : 4,
					max : 20
				}
			}
		}]);

		return {
			name : 'User',
			initData : {
				loginCount : 0,
				shareCount : 0
			},
			methodConfig : {
				create : {
					valid : VALID(createValidDataSet)
				},
				update : {
					valid : VALID(updateValidDataSet),
					authKey : 'id',
					adminRole : KkajiServer.ROLE.HOSPITAL
				},
				remove : {
					role : KkajiServer.ROLE.SUPER_MANAGER
				}
			},
			loginValid : VALID({

				email : {
					notEmpty : true,
					size : {
						min : 5,
						max : 320
					},
					email : true
				},

				password : {
					notEmpty : true,
					size : {
						min : 4,
						max : 20
					}
				},

				android : {
					size : {
						max : 255
					}
				},

				ios : {
					size : {
						max : 255
					}
				}
			})
		};
	}
});