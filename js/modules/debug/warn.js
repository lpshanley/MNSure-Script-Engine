_engine.module.define('debug/warn',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.warn("_engine.debug: " + msg);
	}
	
});