/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/destroy',function( id ){
	
	$('[data-id="'+id+'"]').remove();
	
	delete _engine.storage.nocache.data.merlin.id;

});