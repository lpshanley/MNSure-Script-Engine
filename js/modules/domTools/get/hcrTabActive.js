/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabActive',function(){
	
	let returnVal = false;
	
	if( _engine.domTools.test.mainTabType() === 'HCR Cases and Outcomes')
		$.each(_engine.domTools.get.hcrTabList(),function(k,v){	if( $(v).hasClass('dijitChecked') ) returnVal = $(v)[0]; });
	
	return returnVal;
	
});