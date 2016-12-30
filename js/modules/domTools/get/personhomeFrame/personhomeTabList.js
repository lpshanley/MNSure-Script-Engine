/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/personhomeFrame/personhomeTabList',function(){
	
	let tab = curam.tab.getSelectedTab();
	
	if( typeof tab.params.tabDescriptor.tabID !== 'undefined' ){
		if( tab.params.tabDescriptor.tabID === 'PersonHome' ){
			return $( '#' + tab.id + ' div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible' );
		}
	}
	else{
		_engine.debug.warn("[personhomeTabList] Attemping to gather tab list, curam tab params unavailable.");
	}
	
});