/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/integratedCase/interfaceAlteration',function(){
	
	let tabParams = curam.tab.getSelectedTab();
	
	console.log( tabParams );
	
	switch( tabParams.tabDescriptor.tabID ){
		case 'HCRIntegratedCase':
			
			tabParams.onLoadDeferred.then(function(){ 
			
				_engine.ui.integratedCase.reorderTab('eligibility','elections');
			
			});
			
			break;
		default:
			_engine.debug.info(`[interfaceAlterations] No alterations set for tab type: ${ tabParams.tabDescriptor.tabID }`);
			break;
		
	}
	
});