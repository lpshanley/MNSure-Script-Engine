/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/scriptMenu/refresh',function(){

	_engine.ui.scriptMenu.destroy();

	_engine.ui.scriptMenu.build();
	
	
	$('#script-launcher, #script-launcher li').on('click',function( event ){

		_engine.events.handleClickEvent( this );

	});

});