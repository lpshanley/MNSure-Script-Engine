/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/_attachTasks',function( id, input ){
	
	_engine.advanced.getView('merlin/card-template.html',function( template ){ 
		
		_engine.storage.nocache.data.modal[id].tasklist = {};
		
		$.each(input,function(task,config){
			
			let taskID = _engine.advanced.generateId()
			
			_engine.storage.nocache.data.modal[id].tasklist[taskID] = {
				title: 'TITLE',
				complete: false,
				action: null
			};
			
			$.each(config,function(k,v){ _engine.storage.nocache.data.modal[id].tasklist[taskID][k] = v });
			
			let card = $.parseHTML( template );
			
			$(card).find('.card-title').text( _engine.storage.nocache.data.modal[id].tasklist[taskID].title );
			
			$('[data-id="'+id+'"] [data-role="task-list"]').append( card );
			
		});
		
		console.log( _engine.storage.nocache.data.modal[id] );
		
	});
	
});