/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_setupAutoComplete',function(){
	
	var _fields = $('.mns-modal-template > .mns-input-group');
		//Push additional clusters if clustering is active
	if( _engine.ui.modal._clustersActive() ){
		
		var _clusterFields = $('.mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');
		
		$.each(_clusterFields,function(k,v){ _fields.push(v); });
	
	}

	$.each( _fields, function(k,v){
		
		if( $( v ).find('input').length !== 0 ){
			
			var input = $( v ).find('input')[0];
			
			if( typeof $( input ).attr('data-autoComplete') !== 'undefined' ){
				
				//Process prefill on field(s)
				
				var _autoComplete = $( input ).attr('data-prefill').toLowerCase();
				
				var _autoCompleteType = _prefill.split("|")[0];
				var _autoCompleteValue = _prefill.split("|")[1];
				
				switch( _autoCompleteType ){
					case "participants":
						switch( _autoCompleteValue ){
							case "name":
								
								console.log('FOUND');
								
								break;
							default:
								break;
						}
						break;
					default:
						_engine.debug.warn("unrecognised prefill type of: [ '" +_prefill+ " ']");
						break;
				}
			}
		}
	});

});