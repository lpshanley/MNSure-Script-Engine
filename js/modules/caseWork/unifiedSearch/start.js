/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/unifiedSearch/start',function(){

	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
		
		_engine.advanced.getView( "queries/unified search.html",function(template){

			_engine.ui.modal.build( "Unified Search Query", template, "queries" );

		});

	});

});