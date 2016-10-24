/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/nocache/query',function( dataQuery ){

	dataQuery = dataQuery.replace(/\/|\.|\\|[|]/g,'.').split('.');
	
	let response = {}, noCache = _engine.storage.nocache.data;
	
	$.each(dataQuery,function(key, value){
		
		console.log( value );
		
		key === 0 ?
			response = noCache[value]:
			response = response[value];
		
		if( typeof response === 'undefined' ){
			console.log(false);
		}
		
	});
	
	return response;
	
});