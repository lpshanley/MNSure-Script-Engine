/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/note/write',function( _note ){
	
	console.log('test');
	/*
	_engine.caseWork.global.onCaseScreen(function(){

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
			_engine.advanced.getView( _noteLocation, function( template ){
				
				_engine.ui.modal.build( _note, template, _modalType );
				
			});

		} else {
			_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( note )]: A valid note type must be specified to run this command.")
		}
	
	}, true);
	*/
});