KkajiServer.MAIN = METHOD({
	
	run : function() {
		'use strict';
		
		// 레이아웃 설정
		KkajiServer.MATCH_VIEW({
			uri : '**',
			target : KkajiServer.Layout
		});

		// 로그인
		KkajiServer.MATCH_VIEW({
			uri : '',
			target : KkajiServer.Admin.Login
		});
		
		// 유저 리스트
		KkajiServer.MATCH_VIEW({
			uri : ['user/list', 'user/list/{page}'],
			target : KkajiServer.User.List
		});
		
		// 이벤트 리스트
		KkajiServer.MATCH_VIEW({
			uri : ['event', 'event/list'],
			target : KkajiServer.Event.List
		});

		// 이벤트 폼
		KkajiServer.MATCH_VIEW({
			uri : ['event/form', 'event/form/{eventId}'],
			target : KkajiServer.Event.Form
		});

		// 이벤트 상세보기
		KkajiServer.MATCH_VIEW({
			uri : ['event/detail', 'event/detail/{eventId}'],
			target : KkajiServer.Event.Detail
		});

		// 공지사항 리스트
		KkajiServer.MATCH_VIEW({
			uri : ['notice/list', 'notice/list/{page}'],
			target : KkajiServer.Notice.List
		});

		// 공지사항 폼
		KkajiServer.MATCH_VIEW({
			uri : ['notice/form', 'notice/form/{noticeId}'],
			target : KkajiServer.Notice.Form
		});

		// 분석 툴
		KkajiServer.MATCH_VIEW({
			uri : 'analytics',
			target : KkajiServer.Analytics.Analytics
		});
	}
});
