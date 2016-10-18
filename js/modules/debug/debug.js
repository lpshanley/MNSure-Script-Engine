_engine.module.define('debug/debug',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.debug("_engine.debug: " + msg);
	}
	
});