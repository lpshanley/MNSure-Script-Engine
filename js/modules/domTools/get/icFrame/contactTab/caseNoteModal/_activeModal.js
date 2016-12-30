/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/contactTab/caseNoteModal/_activeModal',function( logErr ){
	
	let returnVal = false,
			errMsg = null;
	
	if( typeof logErr !== 'boolean' ) logErr = true;
	
	var _modalFrame = $('iframe[title="Modal Frame - New Note"].curam-active-modal');

	if( typeof _modalFrame[0] != "undefined" ){
		
		var _bodyFrame = $( _modalFrame ).contents().find('iframe.cke_wysiwyg_frame');
		
		if ( typeof _bodyFrame[0] !== 'undefined' ){
			
			var _modalBody = $( _bodyFrame ).contents().find('body');
			
			if( _modalBody.length > 0 ) returnVal = _modalFrame;
			else errMsg = "Modal is open but not fully loaded";
			
		} 
		else errMsg = "Modal is open but not fully loaded";
	} 
	else errMsg = "Unable to target an open case note modal";
	
	if( logErr ) _engine.debug.warn( `[ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ] ${ errMsg }` );
	
});