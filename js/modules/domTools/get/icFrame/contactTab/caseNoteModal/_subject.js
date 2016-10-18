_engine.module.define('domTools/get/icFrame/contactTab/caseNoteModal/_subject',function(){

	var _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();

	if( _activeModal !== false ){

		return $( _activeModal ).contents().find('input[title="Subject Mandatory"]');

	}
	
});