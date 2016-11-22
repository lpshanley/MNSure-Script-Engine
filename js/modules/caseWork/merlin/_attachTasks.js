/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/_attachTasks',function( id, input ){
	
	_engine.advanced.getView('merlin/card-template.html',function( template ){ 
		
		_engine.storage.nocache.data.modal[id].tasklist = {};
		
		$.each(input,function(task,config){
			
			console.log( task, config);
			
		});
		
	});
	
});