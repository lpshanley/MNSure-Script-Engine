/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_button',function( _type ){

	_engine.debug.info( "- * [ _engine.ui.modal._button() ] function started with type: " + _type );

	switch( _type.toLowerCase() ){
		case "case notes":

			if( _engine.ui.modal._validateModal() ){

				_engine.ui.modal._storeParams();

				_engine.caseWork.note._completeNote();

				_engine.ui.modal.destroy();

			} else {

				_engine.debug.info("- * [ _engine.ui.modal._button( case notes ) ]: Invalid modal submission. Correct highlighted fields.");

			}

			break;
		case "queries":

			if( _engine.ui.modal._validateModal() ){

				_engine.ui.modal._storeParams();

				_engine.caseWork.unifiedSearch._finish();

				_engine.ui.modal.destroy();

			} else {

				_engine.debug.info("- * [ _engine.ui.modal._button( queries ) ]: Invalid modal submission. Correct highlighted fields.");

			}

			break;
		case "error":

			_engine.debug.error("- * Fail Reason: Modal Error [ _engine.ui.modal._button( error ) ]: Error modal. Unable to fetch proper template file.");

			_engine.ui.modal.destroy();

			break;
		case "close":

			_engine.ui.modal.destroy();

			break;
		default:
			_engine.debug.error("- * Fail Reason: Modal Error [ _engine.ui.modal._button( _type ) ]: Type error or type not found.");
			break;

	}

});