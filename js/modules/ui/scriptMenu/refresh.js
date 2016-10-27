/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/scriptMenu/refresh',function(){

	_engine.ui.scriptMenu.destroy();

	_engine.ui.scriptMenu.build();

	$('#script-launcher-nav li').on('click',function( e ){ 

		var _event = $(this).children('a').attr('data-click');

		_engine.events.handleClickEvent( _event );

	});

});