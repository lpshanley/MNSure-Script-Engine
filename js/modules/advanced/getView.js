_engine.module.define('advanced/getView',function( _f ){
	
	var _html = null;

	var _c = _engine.storage.config.get('commit.current');

	var extId = _engine.storage.config.get('extension.id');

	chrome.runtime.sendMessage( extId, { file: _f, commit: _c },
		function( response ){
			if( response == null ){
				_engine.advanced.getView( "error/error.html" );
			} else {
				_engine.storage.html.set( response );
			}
		}
	);
	
	return;

});