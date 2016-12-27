/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/tabEventHandler',function( tab ){
	
	if( typeof $( tab ).attr('widgetid') !== "undefined" ){
		
		let tabScope = $( tab ).attr('widgetid').split('-')[0];
		
		console.log( tabScope );
		
		switch( tabScope ){
			case "HCRCASEAPPWorkspaceSection":
				
				let contentSelector = "#"+dijit.registry.byNode( tab )._curamPageId;
				let tabParams = dijit.registry.byNode( $( contentSelector )[0] );
				
				switch( tabParams.tabDescriptor.tabID ){
					case 'PersonHome':
						
						_engine.caseWork.caseData.maintainNocache();
						
						break;
					case 'HCRIntegratedCase':
						
						_engine.caseWork.caseData.maintainNocache();
						_engine.ui.integratedCase.interfaceAlteration();
						
						break;
					default:
						_engine.debug.info(`[tabEventHandler] Undefined tabID: ${tabParams.tabDescriptor.tabID}` );
						
				}
				
				break;
			case 'app':
					
				switch($(tab)[0].innerText.trim() ){
					case 'HCR Cases and Outcomes':
						
						if(typeof curam.tab.getSelectedTab() !== 'undefined' ){
							
							_engine.caseWork.caseData.maintainNocache();
							_engine.ui.integratedCase.interfaceAlteration();
							
						}
							
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
		
	}
	
});