/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('search/_person',function(){
	
	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
		
		let searchTab = _engine.domTools.get.hcrTabListTypeQuery("Person Search"),
				tabID;
		
		if( searchTab ) _engine.tools.closeTabHCR( searchTab );
		
		curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Person_search1","");
		
		searchTab = _engine.domTools.get.hcrTabListTypeQuery("Person Search");
		
		tabID = $( searchTab ).attr('widgetid').replace('HCRCASEAPPWorkspaceSection-stc_tablist_','');
		
		_engine.advanced.waitForSelector('#' + tabID + ' iframe',function( frame ){
			console.log( frame );
		});
		
	});
	
});