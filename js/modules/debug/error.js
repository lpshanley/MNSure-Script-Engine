_engine.module.define('debug/error',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.error("_engine.debug: " + msg);
	}
	
});