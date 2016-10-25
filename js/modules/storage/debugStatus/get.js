/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/debugStatus/get',function(){

	if( typeof window.localStorage.mnsEngine_debugStatus === 'undefined' ){
		_engine.storage.mnsEngine_debugStatus = false;
	}

	return String( window.localStorage.mnsEngine_debugStatus.toLowerCase() ) == "true";

});