/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/add',function( object ){

	if( typeof object === 'string' ) object = $.parseJSON( object );

	if( typeof object !== 'undefined' ){

		var cacheObject = _engine.storage.prefillCache.get();

		var cacheProps = Object.getOwnPropertyNames( cacheObject );

		var objectProps = Object.getOwnPropertyNames( object );

		$.each(objectProps, function(k,v){

			if( cacheProps.indexOf( v ) !== -1 ) _engine.storage.prefillCache.remove( v );

			cacheObject[v] = object[v];

		});

		_engine.storage.prefillCache._updateCacheInfo( cacheObject );

	} else {

		return false;

	}

});