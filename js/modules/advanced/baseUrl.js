_engine.tools.defineModule( "advanced",{

	baseUrl: function(){
		var _commit = _engine.advanced.currentCommit();
		var _url = "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/" + _commit + "/";
		return _url;
	}
	
});