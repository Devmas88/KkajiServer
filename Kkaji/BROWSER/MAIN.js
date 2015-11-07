Kkaji.MAIN = METHOD({
	
	run : function() {
		'use strict';
		
		Kkaji.MATCH_VIEW({
			uri : '',
			target : Kkaji.List
		});
		
		Kkaji.MATCH_VIEW({
			uri : ['form', 'form/{articleId}'],
			target : Kkaji.Form
		});
		
		Kkaji.MATCH_VIEW({
			uri : 'setting',
			target : Kkaji.Setting
		});
	}
});
