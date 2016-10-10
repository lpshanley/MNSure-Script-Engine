_engine.tools.defineModule( "advanced",{
	
	extensionURL: function(){
		return $('script[data-scriptengine]').attr('data-chromeurl');
	}
	
});