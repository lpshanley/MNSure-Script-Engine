/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/handleClickEvent',['debug/info'],function( req ){
	
	req = _engine.tools.splitArg( req );
	
	let last = req.length - 1,
			module = [req[0] + "/" + req[1]],
			eventManager = _engine;
	
	_engine.module.require(module,function(){
		$.each(req,function(key,value){

			let param = '';

			if( value.indexOf("(") !== -1 ){

				param = value.substring(value.indexOf("(")+1,value.indexOf(")")); 
				value = value.substring(0,value.indexOf("(")); 

			}

			eventManager = eventManager[value];

			if( key === last ){

				if( typeof eventManager === 'function' ) eventManager(param);
				else{
					_engine.debug.info( eventManager, param );
				}

			}

		});
	});
});