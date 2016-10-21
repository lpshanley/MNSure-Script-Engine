/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/_updateCacheInfo',function( object ){

	if( typeof object === 'object' ) object = JSON.stringify( object );

	var encodedObject = encodeURIComponent( object );

	window.localStorage.setItem( "mnsEngine_prefillCache", encodedObject );

});