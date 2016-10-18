_engine.module.define('domTools/get/searches/inputQuery',function( _title ){
	
	return _engine.domTools.get.searches.advancedQuery( 'input[title="' + _title + '"]' );
	
});