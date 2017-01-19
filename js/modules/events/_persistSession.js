/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/_persistSession',function( loading ){

	let tab = _engine.domTools.get.hcrTabActive();
	
	setTimeout(function(){
	
		_engine.search._case(function(){ 
			_engine.tools.closeTabHCR( _engine.domTools.get.hcrTabListTypeQuery('Case Search') );
		});

		if( tab ) tab.click();
	
	}, 100);
	
});