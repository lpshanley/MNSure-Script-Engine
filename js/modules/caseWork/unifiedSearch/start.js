/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/unifiedSearch/start',function(){

	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){

		var _modalType = "queries";
		var _title = "Unified Search Query";

		var _url = _engine.advanced.baseUrl();
		_url += "views/queries/unified search.html"

		_engine.advanced.getView( _url );

		// Check every 100ms for info in local storage. Timeout after 2000ms.

		var _c = 0;

		var buildFrame = setInterval(function(){
			if(_c <= _engine.advanced._vars.iterations){

				if( _engine.storage.html.get() != false ){
					// Gather html for modal
					var _html = _engine.storage.html.get();

					if( $('<div>', {'html': _html }).find('div').hasClass('mns-error-modal') ){
						_title = "Error";
						_modalType = "error";
					}

					// Clear html storage
					_engine.storage.html.clear();

					//Build modal
					_engine.ui.modal.build( _title, _html, _modalType );

					clearInterval( buildFrame );

				}

				_c++;

			} else {
				_engine.debug.error("- * Fail Reason: [ _engine.caseWork.unifiedSearch.start() ]: Build frame html timed out.");	
				_engine.storage.html.clear();
				clearInterval( buildFrame );
			}
		}, _engine.advanced._vars.timeout);

		buildFrame;

	});

});