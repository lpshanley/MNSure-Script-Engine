/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/domMonitor',function(){

	if(typeof dojo.aspect === 'undefined') dojo.require("dojo.aspect");
	
	let mainTabs = dijit.registry.byId("app-sections-container-dc");

	dojo.aspect.after(tabContainer1, "selectChild", function() {
		console.log("Main Tab Changed");        
	});
	
	var HRCTabs = dijit.registry.byId("HCRCASEAPPWorkspaceSection-stc");

	dojo.aspect.after(tabContainer1, "selectChild", function() {
		console.log("HCR Tab Changed");        
	});
	
});