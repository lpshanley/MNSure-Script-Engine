/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/unifiedSearch/_finish',function( modalId, params ){
	
	if( typeof params === 'undefined' ) params = _engine.storage.nocache.data.modal[modalId].data.params;
	
	$.each( params, function( k, v ){

		let input = v.value.trim().replace(/[^\w\s]| +(?= )/g,'');
			
		if( $.isNumeric( input.replace(/[^0-9]/g,'') ) ){
			input = input.replace(/[^0-9]/g,'');
			
			if( [8].indexOf( input.length ) > -1 ){
				//Case Search
				
			}
			else if( [9,10].indexOf( input.length ) > -1 ){
				//Person Search
				
			}
			else {
				// Invalid input handler
			}
			
		}
		
	});
	
	/*

	$.each( _engine.storage.modalParams.get(),function(k,v){
			if( _input.length === 8 ){

				// Case Number

				let _tabToClose = _engine.domTools.get.hcrTabListTypeQuery("Case Search");
				_engine.tools.closeTabHCR( _tabToClose );

				_engine.search._case();

				_c2 = 0;

				let _openSearch = setInterval(function(){
					_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
					if(_c2 <= _engine.advanced._vars.iterations){
						if( _engine.domTools.test.searches.windowLoaded() ){

							_engine.domTools.set.searches.fieldFill("Reference",_input);

							_engine.tools.selectSearchResult();

							clearInterval( _openSearch );
						}
						++_c2;
					} else {
						clearInterval( _openSearch );
					}
				}, _engine.advanced._vars.timeout);
				_openSearch;

			} else if ( _input.length === 9 || _input.length === 10 ){
				// SSN or MNS ID

				let _tabToClose = _engine.domTools.get.hcrTabListTypeQuery("Person Search");
				_engine.tools.closeTabHCR( _tabToClose );

				_engine.search._person();

				_c2 = 0;

				let _openSearch = setInterval(function(){
					_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
					if(_c2 <= _engine.advanced._vars.iterations){
						if( _engine.domTools.test.searches.windowLoaded() ){

							_engine.domTools.set.searches.fieldFill("Reference",_input);

							_engine.tools.selectSearchResult();

							clearInterval( _openSearch );
						}
						++_c2;
					} else {
						clearInterval( _openSearch );
					}
				}, _engine.advanced._vars.timeout);
				_openSearch;

			} else {

				//Not a valid input -> Error msg needed here.

			}

		} else {
			// Name

			_engine.search._person();

			var _name = _input.replace(/\|/g,' ').replace(' ','|').split('|');

			if( _name.length > 1 ){

				_c2 = 0;

				var _openSearch = setInterval(function(){
					_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
					if(_c2 <= _engine.advanced._vars.iterations){
						if( _engine.domTools.test.searches.windowLoaded() ){

							_engine.domTools.set.searches.fieldFill("First Name",_name[0]);

							_engine.domTools.set.searches.fieldFill("Last Name",_name[1]);

							_engine.tools.selectSearchResult();

							clearInterval( _openSearch );
						}
						++_c2;
					} else {
						clearInterval( _openSearch );
					}
				}, _engine.advanced._vars.timeout);
				_openSearch;

			} else {

				_c2 = 0;

				let _openSearch = setInterval(function(){
					_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
					if(_c2 <= _engine.advanced._vars.iterations){
						if( _engine.domTools.test.searches.windowLoaded() ){

							_engine.domTools.set.searches.fieldFill("First Name",_name[0]);

							clearInterval( _openSearch );
						}
						++_c2;
					} else {
						clearInterval( _openSearch );
					}
				}, _engine.advanced._vars.timeout);
				_openSearch;

			}

		}

	});

	*/
});