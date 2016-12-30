/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/icFrame/contactTab/caseNoteModal/body/isEmpty',function(){
	
	let _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body(),
			returnVal = false,
			err = false;

	if( _modalBody && $( _modalBody ).text() === "" ) returnVal = true;
	else err = "Case note body object is returning undefined. Not loaded.";
	
	if( err ) _engine.debug.warn( `[ caseNoteModal.body.isEmpty() ]  ${ err }` );
	
	return returnVal;
	
});