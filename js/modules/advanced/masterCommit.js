_engine.tools.defineModule( "advanced",{

	masterCommit: function(){
		return $('script[data-scriptengine]').attr('data-master');
	}
	
});