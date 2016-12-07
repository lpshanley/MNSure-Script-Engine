/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/_persistSession',function( loading ){
	
	let mainTab, subTab;
	
	if( typeof loading === 'undefined' ) loading = false;
	
	if( loading === false ){
		
		if( $( _engine.domTools.get.mainTabActive() ).find('.tabLabel').text() === 'HCR Cases and Outcomes' ){
			
			mainTab = $( _engine.domTools.get.mainTabList() ).index( $( _engine.domTools.get.mainTabActive() ) );
			subTab = $( _engine.domTools.get.hcrTabList() ).index( $( _engine.domTools.get.hcrTabActive() ) );
			
			window.sessionStorage.mnsEngine_persistTabs = mainTab + "|" + subTab;
			
			window.location.reload();
			
		}
		
	} else {
		
		if( typeof window.sessionStorage.mnsEngine_persistTabs ){
			
			let tabs = window.sessionStorage.mnsEngine_persistTabs.split('|');
			
			console.log( tabs );
			
			_engine.domTools.get.mainTabList()[tabs[0]].click();
			_engine.domTools.get.hcrTabList()[tabs[1]].click();
			
			delete window.sessionStorage.mnsEngine_persistTabs;
			
		}
	}
	
});