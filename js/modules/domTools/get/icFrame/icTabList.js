/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/icTabList',function(){
	
	if(typeof curam.tab.getSelectedTab().params.tabDescriptor.tabID !== 'undefined'){
		if(curam.tab.getSelectedTab().params.tabDescriptor.tabID === 'HCRIntegratedCase'){
			var _tp = _engine.domTools.get.hcrTabFrame();
			return $( _tp ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible');
		}
	}
	else{
		_engine.debug.warn("[icTabList] Attemping to gather tab list, curam tab params unavailable.");
	}
	
});