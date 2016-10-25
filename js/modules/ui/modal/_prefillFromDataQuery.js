/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_prefillFromDataQuery',function( type, callback ){

	type = type.toLowerCase();

	var scope = 'current';

	if( type.indexOf("(") !== -1 ){
		scope = type.substring( type.lastIndexOf("(")+1,type.lastIndexOf(")") );
		type = type.substring( 0 ,type.lastIndexOf("(") );
	} else {

		_engine.debug.warn(`No scope defined in prefill call. Defaulting to current.`);

	}

	if( scope !== 'history' ){
		if( scope !== 'current' ){
			_engine.debug.warn(`Invalid use of prefill scope: ${ scope }. Using current instead.`);
			scope = 'current';
		}
	}

	var returnConstructor = function( dataObject ){

		let prefillString;

		var dataObjectLength = Object.getOwnPropertyNames( dataObject ).length;
		var isSingleObject = dataObjectLength === 1;
		var isAvailable = function( number ){
			var result;
			typeof dataObject[number][scope].evidence_unavailable === 'undefined' ?
				result = true :
				result = false;

			if( result === false ) prefillString += "n/a";

			return result;

		}

		switch( type ){
			case 'income':

					_engine.debug.warn('income prefill is in need of definition');

				break;
			case 'addresses':

				if( isSingleObject ){

					if( isAvailable('0') ){

						result = dataObject[0][scope];

						if( result.apt_suite !== "" ) prefillString += result.apt_suite + ", "; 
						if( result.street_1 !== "" ) prefillString += result.street_1 + ", "; 
						if( result.street_2 !== "" ) prefillString += result.street_2 + ", "; 
						if( result.city !== "" ) prefillString += result.city + ", "; 
						if( result.state !== "" ) prefillString += result.state + ", "; 
						if( result.zip !== "" ) prefillString += result.zip; 

					}

				} else if (dataObject.length > 1) {

					_engine.debug.info("NEED LOGIC FOR MULTIPLE ADDRESSES");

				}

				break;

			case 'service agency':

				if( isSingleObject ){

					if( isAvailable('0') ){

						result = dataObject[0][scope];

						if( result[0] !== "" ) prefillString += result[0];

					}

				} else if (dataObject.length > 1) {

					_engine.debug.info("NEED LOGIC FOR MULTIPLE ADDRESSES");

				}

				break;

			default:
				
				_engine.debug.info("The requested autofill type has no definitions.");
				
				break;
		}

		if(typeof callback === 'function') callback( prefillString );

	}

	_engine.storage.prefillCache.checkPrefillCache( type, function( evidenceFromCacheObj ){

		if( typeof evidenceFromCacheObj === 'undefined' ){

			_engine.debug.info(`Obtaining result set from via data query for request type: ${ type }`);

			_engine.tools.customApi.evidence.queryAndCache( type, function(results){

				returnConstructor( results );

			});

		} else {

			_engine.debug.info(`Obtaining result set from internal cache for request type: ${ type }`);

			returnConstructor( evidenceFromCacheObj );

		}

	});

});