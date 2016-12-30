/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabListTypeQuery',function( _queryType ){

	let returnVal = false;

	$.each( _engine.domTools.get.hcrTabList(), function( k, v ){
		
		let tabType = _engine.domTools.test.hcrTabType( $( v ) ).split('|')[0];
		
		/*
		
		var _tabType = _engine.domTools.test.hcrTabType( $( v ) );
		
		if( _tabType.split("|").length == 2 && _queryType.toLowerCase() == "pdc" ){

			_tabType = _tabType.split("|")[0].trim;

		}

		if( _tabType.toLowerCase() == _queryType.toLowerCase() ){

			_returnArray.push( v );

		}
		*/
		
	});

	return returnVal;
	
});