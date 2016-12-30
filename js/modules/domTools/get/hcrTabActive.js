/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabActive',function(){
	
	let returnVal = curam.tab.getSelectedTab();
	
	if( _engine.domTools.test.mainTabType() !== 'HCR Cases and Outcomes' || returnVal === undefined ) returnVal = false;
	
	return returnVal;
	
});