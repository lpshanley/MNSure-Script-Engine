_engine.module.define('domTools/get/searches/searchResultsQuery',function(){
	
	return _engine.domTools.get.searches.advancedQuery("table[summary='Search Results. Press INSERT + ESC to update list contents'] tbody tr:not('.list-details-row')");
	
});