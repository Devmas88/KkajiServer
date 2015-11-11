KkajiServer('Admin').Login = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// auth store
		authStore = KkajiServer.STORE('authStore'),
		
		// wrapper
		wrapper = DIV({
			style : {
				display : 'none',
				width : 250,
				margin : 'auto',
				padding : '100px 0'
			},
			c : [IMG({
				style : {
					display : 'block',
					margin : 'auto'
				},
				src : ''//KkajiServer.R('logo/hospital.png')
			}), UUI.VALID_FORM({
				style : {
					marginTop : 50
				},
				c : [TABLE({
					c : [TR({
						style : {
							height : 35
						},
						c : [TD({
							style : {
								width : 80
							},
							c : '아이디'
						}), TD({
							c : UUI.FULL_INPUT({
								style : {
									border : '1px solid #9F9E9F'
								},
								name : 'username'
							})
						})]
					}), TR({
						style : {
							height : 35
						},
						c : [TD({
							c : '비밀번호'
						}), TD({
							c : UUI.FULL_INPUT({
								style : {
									border : '1px solid #9F9E9F'
								},
								type : 'password',
								name : 'password'
							})
						})]
					}), TR({
						style : {
							height : 35
						},
						c : [TD(), TD({
							c : [UUI.FULL_CHECKBOX({
								label : '로그인 유지',
								name : 'isRememberMe'
							})]
						})]
					})]
				}), UUI.FULL_SUBMIT({
					style : {
						marginTop : 10,
						backgroundColor : '#0f4e74',
						color : '#fff',
						fontWeight : 'bold',
						padding : '15px 0',
						fontSize : 14
					},
					value : '로그인'
				})],
				on : {
					submit : function(e, form) {
						
						KkajiServer.HospitalManagerModel.login(form.getData(), {
							notValid : function() {
								alert('맞지 않는 비밀번호입니다. 아이디와 비밀번호를 확인해주세요.');
							},
							success : function(hospitalManagerData) {
								
								authStore.save({
									name : 'role',
									value : KkajiServer.ROLE.HOSPITAL,
									isToSession : true
								});
								
								KkajiServer.GO('user/list');
							}
						});
					}
				}
			})]
		}).appendTo(KkajiServer.Layout.getContent());
		
		inner.on('close', function() {
			wrapper.remove();
		});
	}
});