/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/_attachTasks',function( id, input ){
	
	console.log( $("[data-id='"+id+"']") );
	
	_engine.advanced.getView('merlin/card-template.html',function( template ){ 
		
		_engine.storage.nocache.data.modal[id].tasklist = {};
		
		let card;
		
		$.each(input,function(task,config){
			
			card = $.parseHTML( template );
			
			let taskID = _engine.advanced.generateId()
			
			_engine.storage.nocache.data.modal[id].tasklist[taskID] = {
				title: 'TITLE',
				complete: false,
				action: null
			};
			
			$.each(config,function(k,v){ _engine.storage.nocache.data.modal[id].tasklist[taskID][k] = v });
			
			$( card ).attr( 'data-task', taskID );
			$( card ).find('.card-title').text( _engine.storage.nocache.data.modal[id].tasklist[taskID].title );
			
			console.log( $( card ) );
			
			$('[data-id="'+id+'"] [data-role="task-list"]').append( $( card ) );
			
		});
		
		console.log( _engine.storage.nocache.data.modal[id] );
		
	});
	
});