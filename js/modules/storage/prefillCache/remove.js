/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/remove',function( type ){

	if( typeof type === 'string' ){

		var cacheObject = _engine.storage.prefillCache.get();
		var item = cacheObject[ type ];

		if( typeof item !== 'undefined' ){

			delete cacheObject[ type ];

			_engine.storage.prefillCache._updateCacheInfo( cacheObject );

			return true;

		} else {

			return false;

		}

	} else {

		return false;

	}

});