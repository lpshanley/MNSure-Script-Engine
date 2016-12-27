/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_setupClusters',function( modalTarget ){

	if( _engine.ui.modal._clustersActive( modalTarget ) ){
		
		console.log("working");
		
		/*
		var _subject = $( '[data-id='+modalTarget+'] .modal-content-container span.mns-input-group span:contains("SUBJECT")' );
		
		if( _subject.length == 1 ){
			
			_selectVal = $( _subject ).parent().find('select').val();
			
			_engine.ui.modal._changeActiveCluster( _selectVal );
			
		}
		*/
		
	}

});