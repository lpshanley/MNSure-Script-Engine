/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/tabEventHandler',function( tab ){

	let tabScope = $( tab ).attr('widgetid').split('-')[0];
	
	let contentId = dijit.registry.byNode( tab )._curamPageId;
	
	console.log( $('#'+contentId+' iframe') );
	
	switch( tabScope ){
		case "HCRCASEAPPWorkspaceSection":
			
			
			
			_engine.caseWork.caseData.maintainNocache();
			_engine.ui.integratedCase.interfaceAlteration();
			
			console.log('HCR')
			
			break;
		case 'app':
			
			switch($(tab)[0].innerText.trim() ){
				case 'HCR Cases and Outcomes':
					
					_engine.caseWork.caseData.maintainNocache();
					_engine.ui.integratedCase.interfaceAlteration();
					
					break;
				default:
					break;
			}
			
			break;
		case 'HCRIntegratedCase':
			
			_engine.caseWork.caseData.maintainNocache();
			
			break;
		default:
			break;
	}
	
});