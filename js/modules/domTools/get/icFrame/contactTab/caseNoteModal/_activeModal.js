_engine.module.define('domTools/get/icFrame/contactTab/caseNoteModal/_activeModal',function(){
	
	var _modalFrame = $('iframe[title="Modal Frame - New Note"].curam-active-modal');

	if( typeof _modalFrame[0] != "undefined" ){

		var _bodyFrame = $( _modalFrame ).contents().find('iframe.cke_wysiwyg_frame');

		//Modal is open
		if ( typeof _bodyFrame[0] != 'undefined' ){

			//Modal is loaded
			_engine.debug.info("- * [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open and fully loaded.");
			return _modalFrame;

		} else {
			_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open but not fully loaded.");
			return false;
		}
	} else {
		_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Unable to target an open case note modal.");
		return false;
	}
	
});