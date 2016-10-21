/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/global/onCaseScreen',function( callback ){

	_engine.domTools.test.hcrTabActiveIsIC(function( result ){

		if( result ){

			if(typeof callback === 'function') callback();

		} else {

			_engine.advanced.getView( "error/incorrect launch location.html" );

			// Check every 100ms for info in local storage.

			let _c = 0;

			let buildFrame = setInterval(function(){

				if(_c <= _engine.advanced._vars.iterations){

					if( _engine.storage.html.get() !== false ){
						// Gather html for modal
						var _html = _engine.storage.html.get();

						// Clear html storage
						_engine.storage.html.clear();

						//Build modal
						_engine.ui.modal.build( "Case Note Error - Incorrect Launch Screen", _html, "error" );

						clearInterval( buildFrame );

					}

					_c++;

				} else {
					_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( _note )]: Build frame html timed out.");
					_engine.storage.html.clear();
					clearInterval( buildFrame );
				}
			}, _engine.advanced._vars.timeout);

			buildFrame;

		}

	});

});