_engine.tools.defineModule( "advanced",{
	
	currentCommit: function(){
		if( _engine.storage.betaStatus.get() ){
			return _engine.advanced.betaCommit();
		} else {
			return _engine.advanced.masterCommit();
		}
	}
	
});