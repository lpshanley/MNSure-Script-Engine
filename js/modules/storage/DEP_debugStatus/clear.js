/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/debugStatus/clear',function(){

	localStorage.removeItem( "mnsEngine_debugStatus" );

});