/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_validateModal',function( modalId ){

	var _invalidFields = 0;
	var required;
	
	if( _engine.ui.modal._clustersActive() ){
		required = $('[data-id='+modalId+'] sdiv.mns-modal-template > .mns-input-group.required, div.mns-modal-template > .input-cluster-active > .required');
	} else {
		required = $('[data-id='+modalId+'] div.mns-modal-template .required');
	}

	$.each( required,function( k,v ){ 

		if( $( v ).find('input').val() === "" ){

			$( v ).addClass("input-error");

			++_invalidFields;

		} else {

			$( v ).removeClass("input-error");

		}

	});

	if( _invalidFields === 0 ){
		return true;
	} else {
		return false;
	}

});