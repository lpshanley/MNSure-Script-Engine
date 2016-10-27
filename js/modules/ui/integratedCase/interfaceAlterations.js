/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/integratedCase/interfaceAlteration',function( target, insertAfter ){
	
	_engine.domTools.test.hcrTabActiveIsIC(function(result){ 
		
		if( result ){
			
			_engine.ui.integratedCase.reorderTab('eligibility','elections');
			
		}
		
	});
	
});