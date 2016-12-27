/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/personhomeFrame/personhomeTabList',function(){
	
	if(typeof curam.tab.getSelectedTab().params.tabDescriptor.tabID !== 'undefined'){
		if(curam.tab.getSelectedTab().params.tabDescriptor.tabID === 'PersonHome'){
			return $( '#'+curam.tab.getSelectedTab().id + ' div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible' );
		}
	}
	else{
		_engine.debug.warn("[personhomeTabList] Attemping to gather tab list, curam tab params unavailable.");
	}
	
});