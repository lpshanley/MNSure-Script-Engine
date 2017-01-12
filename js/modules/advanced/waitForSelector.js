/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/waitForSelector',function( selector, callback ){
	
	let count = 0;
	
	let interval = setInterval(function(){
		
		if( count < _engine.advanced._vars.iterations ){
			
			if( $( selector ).length > 0 ){
				
				if(typeof callback === 'function') callback( $( selector ) );
				
				clearInterval( interval );
				
			}
			
			++count;
			
		}
		else {
			
			_engine.debug.error('[waitForSelector] Could not locate requested dom element before timeout')
			
			clearInterval( interval );
			
		} 
		
	}, _engine.advanced._vars.timeout);
	
	interval;
	
});