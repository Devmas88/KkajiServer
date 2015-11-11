KkajiServer('Notice').List = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// table td style
		tableTDStyle = {
			padding : '8px 0',
			textAlign : 'center',
			border : '1px solid #ccc'
		},
		
		// table name style
		tableNameStyle = COMBINE([tableTDStyle, {
			backgroundColor : '#e8e8e8',
			fontWeight : 'bold',
			cursor : 'normal'
		}]),

		// wrapper
		wrapper;
		
		inner.on('paramsChange', function(params) {

			var
			// page
			page = params.page,
			
			// count dom
			countDom,
			
			// list
			list,

			// search
			search,

			// query
			query,

			// filter
			filter,
			
			// page list
			pageList;
			
			if (wrapper !== undefined) {
				wrapper.remove();
			}

			// wrapper
			wrapper = DIV({
				style : {
					width : 800,
					margin : 'auto',
					padding : '30px 0'
				},
				c : [
				// search form
				FORM({
					style : {
						flt : 'left'
					},
					c : [UUI.FULL_SELECT({
						style : {
							backgroundColor : '#e8e8e8',
							flt : 'left',
							padding : 9,
							width : 70
						},
						name : 'search',
						options : OPTION({
							c : '제목',
							value : 'title'
						})
					}), UUI.FULL_INPUT({
						style : {
							marginLeft : 15,
							border : '1px solid #ccc',
							width : 200,
							padding : 9,
							flt : 'left'
						},
						name : 'query',
						placeholder : '검색어'
					}), UUI.FULL_SUBMIT({
						style : {
							flt : 'left',
							backgroundColor : KkajiServer.Layout.getBaseColor(),
							color : '#fff',
							width : 100
						},
						value : '검색'
					}), CLEAR_BOTH()],
					on : {
						submit : function(e, form) {

							search = form.getData().search;
							query = form.getData().query;

							//검색을 하기전 데이터 초기화가 필요.
							filter = {};

							loadPage();
						}
					}
				}),
				
				UUI.BUTTON({
					style : {
						flt : 'right',
						backgroundColor : '#F16420',
						color : '#fff',
						padding : '10px 30px'
					},
					title : '글쓰기',
					on : {
						tap : function() {
							KkajiServer.GO('service/form');
						}
					}
				}),

				countDom = DIV({
					style : {
						flt : 'right',
						marginTop : 10,
						marginRight : 15
					}
				}),
				
				CLEAR_BOTH(),
				
				// list
				list = UUI.TABLE({
					style : {
						width : 800,
						marginTop : 20
					},
					c : TR({
						c : [TD({
							style : tableNameStyle,
							c : '제목'
						}), TD({
							style : tableNameStyle,
							c : '날짜'
						}), TD({
							style : tableNameStyle,
							c : '언어'
						}), TD({
							style : tableNameStyle,
							c : '수정'
						}), TD({
							style : tableNameStyle,
							c : '삭제'
						})]
					})
				}),

				// page list
				pageList = DIV({
					style : {
						marginTop : 10
					}
				})]
			}).appendTo(KkajiServer.Layout.getContent());
		
			var loadPage = RAR(function() {

				if (search !== undefined) {
					if (query.length === 0) {
						// 검색어의 길이가 0이면 아무것도 하지마라.
						filter[search] = undefined;
					}
					else {
						if (search === 'gender') {
							filter[search] = query;
						} else {
							filter[search] = {
								$regex : '.*' + query + '.*'
							};
						}
					}
				}

				
				list.removeAllTRs();
				countDom.empty();
				pageList.empty();

				KkajiServer.ServiceModel.find({
					filter : filter,
					start : (page - 1) * 20,
					count : 20
				}, EACH(function(serviceData) {
					
					var
					// create cal
					createCal = CALENDAR(serviceData.createTime),
					
					// content dom
					contentDom;
					
					list.addTR({
						key : serviceData.id,
						tr : TR({
							c : [TD({
								style : COMBINE([tableTDStyle, {
									textAlign : 'left',
									paddingLeft : 10,
									paddingRight : 10
								}]),
								c : serviceData.title
							}), TD({
								style : tableTDStyle,
								c : createCal.getYear() + '.' + (createCal.getMonth() < 10 ? '0' + createCal.getMonth() : createCal.getMonth()) + '.' + (createCal.getDate() < 10 ? '0' + createCal.getDate() : createCal.getDate())
							}), TD({
								style : tableTDStyle,
								c : KkajiServer.COUNTRY_NAMES[serviceData.countryCode]
							}), TD({
								style : tableTDStyle,
								c : UUI.IMG_BUTTON({
									img : IMG({
										src : KkajiServer.R('icon/modify.png')
									}),
									on : {
										tap : function() {
											KkajiServer.GO('service/form/' + serviceData.id);
										}
									}
								})
							}), TD({
								style : tableTDStyle,
								c : UUI.IMG_BUTTON({
									img : IMG({
										src : KkajiServer.R('icon/trash.png')
									}),
									on : {
										tap : function() {
											if (confirm('정말 삭제하시겠습니까?') === true) {
												KkajiServer.ServiceModel.remove(serviceData.id, function() {
													REFRESH();
												});
											}
										}
									}
								})
							})],
							on : {
								tap : function(e, tr) {
									
									if (contentDom === undefined) {
										
										tr.after(contentDom = TR({
											c : TD({
												style : {
													padding : 10,
													border : '1px solid #ccc'
												},
												colspan : 7,
												c : P({
													c : serviceData.content
												})
											})
										}));
										
									} else {
										contentDom.remove();
										contentDom = undefined;
									}
								}
							}
						})
					});
				}));

				KkajiServer.ServiceModel.count({
					filter : filter
				}, function(count) {
					
					countDom.append('총 등록 서비스 수 : ' + count + '개');
					
					// count / 20 부분을 유의해서 적용해야함 페이지별로 count 파악 후 적용하길 / news/list/의 경로 변경하기
					// 이전 nav
					REPEAT(Math.ceil(count / 20), function(pageNumber) {

						pageList.append(A({
							style : {
									marginRight : 15,
									marginLeft : 15,
									fontWeight : 'bold',
	                                textAlign: 'center',
	                                flt: 'left'},
							c : (pageNumber === 0 ? '' : pageNumber + 1 == page ? ' < 이전페이지 ' : ''),
							on : {
								tap : function() {
									KkajiServer.GO('service/list/' + (pageNumber));
								}
							}
						}));
					});

					//전체 nav가 10개 미만일 경우
					if((count / 20) <= 9){
						REPEAT(Math.ceil(count / 20), function(pageNumber) {
							pageList.append(A({
								style : pageNumber + 1 == page ? {
									marginRight : 15,
									marginLeft : 15,
									fontSize : 15,
									fontWeight : 'bold',
									textAlign: 'center',
									flt: 'left',
									color : '#3468a2',
					                borderBottom : '1px solid #326699'
								} : {marginRight : 15,
									marginLeft : 15,
									textAlign: 'center',
									flt: 'left',
									fontSize : 15},
								c : pageNumber + 1,
								on : {
									tap : function() {
										KkajiServer.GO('service/list/' + (pageNumber + 1));
									}
								}
							}));
						});
					}

					//전체 nav가 10개 이상일 경우
					if((count / 20) > 9){
						//최초 접속 or 페이지 5개 이하를 선택했을 경우
						if(page === undefined || page < 6) {
							REPEAT(Math.ceil(10), function(pageNumber) {
							
								pageList.append(A({
									style : pageNumber + 1 == page ? {
										marginRight : 15,
										marginLeft : 15,
										fontSize : 15,
										fontWeight : 'bold',
										textAlign: 'center',
										flt: 'left',
										color : '#3468a2',
						                borderBottom : '1px solid #326699'

									} : {marginRight : 15,
										marginLeft : 15,
										textAlign: 'center',
										flt: 'left',
										fontSize : 15},
									c : pageNumber + 1,
									on : {
										tap : function() {
											KkajiServer.GO('service/list/' + (pageNumber + 1));
										}
									}
								}));
							});
						}
						//페이지 6이상 선택시 자기 페이지를 중심으로 좌우 4 / 6 개씩 생성된다.
						else if(page > 5){
							REPEAT(Math.ceil(count / 20), function(pageNumber) {
							if( (pageNumber - 4 <= page) && (pageNumber + 5 >= page) )
								pageList.append(A({
									style : pageNumber + 1 == page ? {
										marginRight : 15,
										marginLeft : 15,
										fontSize : 15,
										fontWeight : 'bold',
										textAlign: 'center',
										flt: 'left',
										color : '#3468a2',
						                borderBottom : '1px solid #326699'
									} : {marginRight : 15,
										marginLeft : 15,
										textAlign: 'center',
										flt: 'left',
										fontSize : 15},
									c : pageNumber + 1,
									on : {
										tap : function() {
											KkajiServer.GO('service/list/' + (pageNumber + 1));
										}
									}
								}));
							});
						}
					}

					// 다음 nav
					REPEAT(Math.ceil(count / 20), function(pageNumber) {
						pageList.append(A({
							style : {
									marginRight : 15,
									marginLeft : 15,
									fontWeight : 'bold',
	                                textAlign: 'center',
	                                flt: 'left'},
							c : ((pageNumber === 0 && page ===undefined && (count / 20) > 1) ? ' 다음페이지 > ' : ((pageNumber +1) >= (count / 20) ? '' : pageNumber + 1 == page ? ' 다음페이지 > ' : '')),
							on : {
								tap : function() {console.log(count /20)									
									KkajiServer.GO('service/list/' + (pageNumber + 2));	
								}
							}
						}));
					});
				});
			});
		});
		inner.on('close', function() {
			wrapper.remove();
		});
	}
});