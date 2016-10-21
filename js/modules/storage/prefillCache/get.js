/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/get',function( type ){

	if(typeof window.localStorage.mnsEngine_prefillCache === 'undefined'){

		_engine.storage.prefillCache.init();

	}

	var cacheObject = $.parseJSON( decodeURIComponent( window.localStorage.mnsEngine_prefillCache ) );

	if( typeof type === 'string' ){
		return cacheObject[type];
	} else {
		return cacheObject;
	}

});