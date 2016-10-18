_engine.module.define('debug/log',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.log("_engine.debug: " + msg);
	}
	
});