/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/customApi/evidence/queryAndCache',function(type, callback){
	
	_engine.tools.customApi.evidence.parsedQuery( type ,function( results, type ){

		var evidenceObject = {};

		evidenceObject[type] = results;

		_engine.storage.prefillCache.add( evidenceObject );
		
		if( typeof _engine.storage.nocache.data.caseData.prefill === 'undefined' ) _engine.storage.nocache.data.caseData.prefill = {};
		
		_engine.storage.nocache.data.caseData.prefill[type] = results;

		if( typeof callback === 'function') callback( results );

	});
	
});