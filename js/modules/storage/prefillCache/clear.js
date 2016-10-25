/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/clear',function(){
	
	if( typeof _engine.storage.nocache.data.caseData.prefill !== 'undefined' ){
		delete _engine.storage.nocache.data.caseData.prefill;
	}

});