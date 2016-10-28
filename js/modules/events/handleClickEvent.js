/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/handleClickEvent',function( req ){
	
	req = _engine.tools.stringToQuery( req );
	
	let last = req.length - 1;
	
	let eventManager = _engine;
	
	$.each(req,function(key,value){
		
		let param = '';
		
		if( value.indexOf("(") !== -1 ){
			
			param = value.substring(value.indexOf("(")+1,value.indexOf(")")); 
			value = value.substring(0,value.indexOf("(")); 
			
			console.log(`Value: ${value}`);
			console.log(`Param: ${param}`);
			
		}
		
		eventManager = eventManager[value];
		
		console.log( typeof eventManager );
		
		if( key === last ){
			
			if( typeof eventManager === 'function' ) eventManager(param);
			else{
				_engine.debug.info( eventManager, param );
			}
			
		}
	
	});

});