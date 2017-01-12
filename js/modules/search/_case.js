/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('search/_case',function(){
	
	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
		
		let searchTab = _engine.domTools.get.hcrTabListTypeQuery("Case Search");
		
		if( searchTab ) _engine.tools.closeTabHCR( searchTab );
		
		curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Case_search1",""); 
		
	});
	
});