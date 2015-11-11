KkajiServer.Layout = CLASS(function(cls) {
	'use strict';

	var
	
	// base color
	baseColor = '#828282',
	
	// content
	content,
	
	// get base color.
	getBaseColor,
	
	// get content.
	getContent;
	
	cls.getBaseColor = getBaseColor = function() {
		return baseColor;
	};

	cls.getContent = getContent = function() {
		return content;
	};

	return {

		preset : function() {
			return VIEW;
		},

		init : function(inner, self, params) {

			var
			// button style
			buttonStyle = {
				width : 100,
				padding : '10px 0',
				flt : 'left',
				display : 'block',
				textDecoration : 'none'
			},
			
			// auth store
			authStore = KkajiServer.STORE('authStore'),
			
			// menu
			menu,
			
			// menu buttons
			userButton, eventButton, noticeButton, analyticsButton,

			// wrapper
			wrapper = DIV({
				c : [

				// content
				content = DIV({
					style : {
						backgroundColor : '#fff',
						color : '#555555',
						fontSize : 12
					}
				}),

				// footer
				DIV({
					style : {
						backgroundColor : '#828282',
						color : '#fff',
						padding : 20,
						textAlign : 'center'
					},
					c : '© 2015 Humanscape'
				})]
			}).appendTo(BODY);
			
			inner.on('uriChange', function(uri) {
				
				if (authStore.get('role') === KkajiServer.ROLE.HUMANSCAPE) {
					baseColor = '#2eb99b';
				} else {
					baseColor = '#828282';
				}
				
				if (uri === '' || uri === 'login') {
					
					if (menu !== undefined) {
						menu.remove();
						menu = undefined;
					}
					
				} else if (menu === undefined) {
					
					menu = DIV({
						c : [DIV({
							style : {
								backgroundColor : '#828282',
								padding : 15,
								textAlign : 'center',
								fontSize : 20
							},
							c : [SPAN({
								style : {
									fontWeight : 'bold'
								},
								c : '까지어드민'
							}), IMG({
								style : {
									flt : 'left',
									width : 130
								},
								src : ''//KkajiServer.R('logo/top-logo.png')
							}), DIV({
								style : {
									flt : 'right',
									textAlign : 'right',
									paddingTop : 3,
									fontSize : 14,
									width : 145
								},
								c : [A({
									style : {
										marginLeft : 20
									},
									c : '로그아웃',
									on : {
										tap : function() {
											
											var
											// is humanscape
											isHumanscape = authStore.get('role') === KkajiServer.ROLE.HUMANSCAPE;
											
											authStore.remove('role');
											authStore.remove('rootPassword');
											
											if (isHumanscape === true) {
												KkajiServer.GO('humanscape/login');
											} else {
												KkajiServer.GO('login');
											}
										}
									}
								})]
							}), CLEAR_BOTH()]
						}), UUI.PANEL({
							style : {
								textAlign : 'center',
								backgroundColor : '#cbcaca',
								color : '#000',
								fontWeight : 'bold'
							},
							contentStyle : {
								width : authStore.get('role') === KkajiServer.ROLE.HUMANSCAPE ? 700 : authStore.get('isSuperManager') === true ? 600 : 400,
								margin : 'auto'
							},
							c : [userButton = A({
								style : buttonStyle,
								c : '회원 명단',
								on : {
									tap : function() {
										KkajiServer.GO('user/list');
									}
								}
							}), eventButton = A({
								style : buttonStyle,
								c : '이벤트',
								on : {
									tap : function() {
										KkajiServer.GO('event/list');
									}
								}
							}), noticeButton = A({
								style : buttonStyle,
								c : '공지사항',
								on : {
									tap : function() {
										KkajiServer.GO('notice/list');
									}
								}
							}), analyticsButton = A({
								style : buttonStyle,
								c : '분석',
								on : {
									tap : function() {
										KkajiServer.GO('analytics/analytics');
									}
								}
							}),CLEAR_BOTH()]
						})]
					}).prependTo(wrapper);
				}
				
				// 인증 관련 처리
				if (authStore.get('role') === undefined) {
					
					if (uri !== 'admin/login' && uri !== 'humanscape/login') {
						if (uri === 'humanscape') {
							KkajiServer.GO('humanscape/login');
						} else {
							KkajiServer.GO('admin/login');
						}
					}
					
				} else {
					
					if (uri === '') {
						KkajiServer.GO('user/list');
					}
					
					if (authStore.get('rootPassword') !== undefined) {
						
						KkajiServer.ROOM('HumanscapeAuthRoom').send({
							methodName : 'auth',
							data : {
								password : authStore.get('rootPassword')
							}
						});
						
					}
				}
				
				if (menu !== undefined) {
				
					if (URI_MATCHER('user/**').check(uri).checkIsMatched() === true) {
						
						userButton.addStyle({
							color : baseColor,
							borderBottom : '2px solid ' + baseColor
						});
						
					} else {
						
						userButton.addStyle({
							color : '#000',
							borderBottom : 'none'
						});
					}
					
					if (URI_MATCHER('event/**').check(uri).checkIsMatched() === true) {
						eventButton.addStyle({
							color : baseColor,
							borderBottom : '2px solid ' + baseColor
						});
					} else {
						eventButton.addStyle({
							color : '#000',
							borderBottom : 'none'
						});
					}

					if (URI_MATCHER('notice/**').check(uri).checkIsMatched() === true) {
						noticeButton.addStyle({
							color : baseColor,
							borderBottom : '2px solid ' + baseColor
						});
					} else {
						noticeButton.addStyle({
							color : '#000',
							borderBottom : 'none'
						});
					}
					
					if (URI_MATCHER('analytics/**').check(uri).checkIsMatched() === true) {
						analyticsButton.addStyle({
							color : baseColor,
							borderBottom : '2px solid ' + baseColor
						});
					} else {
						analyticsButton.addStyle({
							color : '#000',
							borderBottom : 'none'
						});
					}
				}
			});

			inner.on('close', function() {
				wrapper.remove();
			});
		}
	};
});
