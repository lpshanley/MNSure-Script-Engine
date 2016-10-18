_engine.module.define('debug/info',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.info("_engine.debug: " + msg); 
	}
	
});