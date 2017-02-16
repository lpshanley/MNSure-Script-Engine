_engine.module.define('advanced/modals', ['ui/modal', 'storage/nocache'], {
	
	error: function( msg ){
		
		if( !msg || typeof(msg) !== 'string' ) msg = 'Error message not defined.';
		
		_engine.ui.modal.build({
			buttons:['close'],
			title:'Error...',
			text: msg
		},function( props ){
			_engine.storage.nocache.data.modal[props.id].role = 'error';
		});
	}
	
});