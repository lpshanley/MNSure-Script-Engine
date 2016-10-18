_engine.module.define('debug/toggle',function(){
	
	_engine.storage.debugStatus.set( !_engine.storage.debugStatus.get() );
	console.debug("_engine.debug: Debugging status changed to - " + _engine.storage.debugStatus.get() );
	
});