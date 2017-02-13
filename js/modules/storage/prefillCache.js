_engine.module.define('storage/prefillCache',['storage/nocache'],{
	
	add: function( object ){
		
		if( typeof object === 'string' ) object = $.parseJSON( object );

		if( typeof object !== 'undefined' ){

			if( typeof _engine.storage.nocache.data.caseData.prefill === 'undefined' ) _engine.storage.nocache.data.caseData.prefill = {};

			var cacheProps = Object.getOwnPropertyNames( _engine.storage.nocache.data.caseData.prefill );

			var objectProps = Object.getOwnPropertyNames( object );

			$.each(objectProps, function(k,v){

				if( cacheProps.indexOf( v ) !== -1 ) _engine.storage.prefillCache.remove( v );

				_engine.storage.nocache.data.caseData.prefill[v] = object[v];

			});

		} else {

			return false;

		}
		
	},
	
	checkPrefillCache: function( type, callback ){
		
		let cacheObject = _engine.storage.prefillCache.get();

		let cacheProps = Object.getOwnPropertyNames( cacheObject );

		if( cacheProps.indexOf( type ) !== -1 ){

			if( typeof callback === 'function' ){ callback( cacheObject[ type ] ); }
			else return true;

		} else {

			if( typeof callback === 'function' ){ callback( undefined ); }
			else return false;

		}
		
	},
	
	clear: function(){
		
		let obj = _engine.storage.nocache.data;

		if(typeof obj !== 'undefined' ){

			obj = obj.caseData;

			if(typeof obj !== 'undefined' )

				obj = obj.prefill;

				if( typeof obj !== 'undefined' ){

					delete _engine.storage.nocache.data.caseData.prefill;

				}
		}
		
	},
	
	get: function( type ){
		
		let cacheObject = _engine.storage.nocache.query('caseData.prefill'), response;
	
		if( cacheObject !== false ){
			if( typeof type === 'string' ){
				response = cacheObject[type];
			}
			else {
				response = cacheObject;
			}
		}
		else {
			response = false;
		}

		return response;
		
	},
	
	remove: function( type ){
		
		if( typeof type === 'string' ){

			delete _engine.storage.nocache.data.caseData.prefill[ type ];

			return true;

		} else {

			return false;
		
		}
		
	}
	
});