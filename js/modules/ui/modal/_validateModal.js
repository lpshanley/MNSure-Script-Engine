/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_validateModal',function( modalId ){

	let _invalidFields = 0,
			required = '[data-id='+modalId+'] div.mns-modal-template ',
			returnVal = false;
	
	_engine.ui.modal._clustersActive( modalId ) ?
		required += '> .mns-input-group.required, div.mns-modal-template > .input-cluster-active > .required' :
		required += '.required';

	$.each( $( required ) , function( k,v ){ 

		if( $( v ).find('input').val() === "" ){

			$( v ).addClass("input-error");

			++_invalidFields;

		} 
		else $( v ).removeClass("input-error");

	});

	if( _invalidFields === 0 ) returnVal = true;
	
	return returnVal;

});