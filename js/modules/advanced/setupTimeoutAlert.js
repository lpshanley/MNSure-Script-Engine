/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/setupTimeoutAlert',function(){

	var tripTimer = 180000;

	_engine.debug.info('Session timeout notification set.');

	setTimeout(function(){
		if(confirm('You are about to be timed out. Would you like to attempt to refresh your session?')){
			
			window.location.reload();
			
		}
	}, _engine.advanced._sessionRemaining() - tripTimer);
	
});