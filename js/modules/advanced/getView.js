_engine.tools.defineModule( "advanced",{
	
	getView: function( _f ){
		var _html = null;
		var _c = _engine.advanced.currentCommit();
		chrome.runtime.sendMessage( _engine.advanced.extensionID(), { file: _f, commit: _c },
			function( response ){
				if( response == null ){
					_engine.advanced.getView( "error/error.html" );
				} else {
					_engine.storage.html.set( response );
				}
			}
		);
		return;
	}
	
});