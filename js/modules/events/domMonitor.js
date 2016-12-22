/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/domMonitor',function(){
	
	if( typeof _engine.advanced._vars.lastTab === 'undefined' ) _engine.advanced._vars.lastTab = null;
	
	$( document ).on('click', '.dijitTabListWrapper .visible.dijitTab',function(){ 
	
		if( _engine.advanced._vars.lastTab !== this ){

			console.log( "Navigated" );
			console.log( "New:", this );

			_engine.advanced._vars.lastTab = this;
			
			_engine.events.tabEventHandler( this );
			
		}

	});
	
	/*
	
	if(typeof dojo.aspect === 'undefined') dojo.require("dojo.aspect");
	
	let mainTabs = dijit.registry.byId("app-sections-container-dc");

	dojo.aspect.after(mainTabs, "selectChild", function() {
		_engine.events.tabEventHandler( this.tablist._selectedTab );
		console.log( this );
	});
	
	let HRCTabs = dijit.registry.byId("HCRCASEAPPWorkspaceSection-stc");

	dojo.aspect.after(HRCTabs, "selectChild", function() {
		_engine.events.tabEventHandler( this.tablist._selectedTab );
		console.log( this );
	});
	
	*/
	
});