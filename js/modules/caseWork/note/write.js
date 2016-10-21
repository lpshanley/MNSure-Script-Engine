/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/note/write',function( _note ){

	_engine.domTools.test.hcrTabActiveIsIC(function( result ){

		if( result ){

			// Define extra vars
			var _noteLocation = null;
			var _modalType = null;

			// Grab an array of elements that are defined in the menu as available case notes
			var _noteArray = $('#script-launcher > ul > li:contains("Case Notes") ul li');

			// Create the container array to compare against
			var _validNotes = [];

			// Iterate over element array
			$.each(_noteArray,function(k,v){

				// Grab the text only without the "..." from the case note elements and push to second array
				_validNotes.push( $( v ).text().replace(/[.]/g,"").toLowerCase() );

			});

			// Check if the requested case note type is in the list of valid case notes
			if( $.inArray( _note.toLowerCase(), _validNotes) > -1 ){

				// If its a valid request set the modal type to case notes
				_modalType = "case notes";

				// Set the location to the dir that stores the html
				_noteLocation = _modalType + "/" + _note.toLowerCase() + ".html";

			}

			// If the request was invalid then error out the request as invalid
			if( _noteLocation != null ){

				// Gathers HTML for view and stores to local storage
				_engine.advanced.getView( _noteLocation );

				// Check every 100ms for info in local storage.

				let _c = 0;

				let buildFrame = setInterval(function(){
					if(_c <= _engine.advanced._vars.iterations){

						if( _engine.storage.html.get() !== false ){
							// Gather html for modal
							var _html = _engine.storage.html.get();

							if( $('<div>', {'html': _engine.storage.html.get() }).find('div').hasClass('mns-error-modal') ){
								_note = "Error";
								_modalType = "error";
							}

							// Clear html storage
							_engine.storage.html.clear();

							//Build modal
							_engine.ui.modal.build( _note, _html, _modalType );

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

			} else {
				_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( note )]: A valid note type must be specified to run this command.")
			}

		} else {

			_engine.advanced.getView( "error/case note incorrect location.html" );

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