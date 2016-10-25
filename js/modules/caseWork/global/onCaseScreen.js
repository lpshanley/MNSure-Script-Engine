/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/global/onCaseScreen',function( callback, showModal ){

	_engine.domTools.test.hcrTabActiveIsIC(function( result ){
	
		if( result ){
		
			if(typeof callback === 'function') callback();
			
		} else {
			
			if( typeof showModal === 'undefined' ) showModal = false;
			
			if( showModal ){
			
				_engine.advanced.getView( "error/incorrect launch location.html",function(template){

					_engine.ui.modal.build( "Case Note Error - Incorrect Launch Screen", template, "error" );

				});
				
			}
			
		}
		
	});

});