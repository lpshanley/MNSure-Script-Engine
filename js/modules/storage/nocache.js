_engine.module.define('storage/nocache',[],{

	data: { modal: {} },
	
	delete: function( toRemove ){ delete _engine.storage.nocache.data[toRemove]; },
	
	query: function( dataQuery ){
		
		let noCache = _engine.storage.nocache.data, response;
		
		if(typeof dataQuery === 'undefined') return noCache;

		dataQuery = dataQuery.replace(/\/|\.|\\|[|]/g,'.').split('.');

		$.each(dataQuery,function(key, value){

			if( value.trim() !== "" ){

				noCache = noCache[value];

				if( typeof noCache === 'undefined' ) return false;

			} else {

				return noCache;

			}

		});

		typeof noCache === 'undefined'?
			response = false:
			response = noCache;

		return response;
		
	},
	
	wipe: function(){ _engine.storage.nocache.data = {}; }
	
});