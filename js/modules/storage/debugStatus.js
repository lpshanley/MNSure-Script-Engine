_engine.module.define('storage/debugStatus',[],{
	
	get: function(){
		
		if( typeof window.localStorage.mnsEngine_debugStatus === 'undefined' ){
			window.localStorage.mnsEngine_debugStatus = false;
		}
		
		return String( window.localStorage.mnsEngine_debugStatus.toLowerCase() ) == "true";
		
	},
	
	set: function( _status ){
		
		window.localStorage.setItem( "mnsEngine_debugStatus", _status );
		
	},
	
	clear: function(){
		
		localStorage.removeItem( "mnsEngine_debugStatus" );
		
	}
	
});