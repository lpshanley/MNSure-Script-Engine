/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/topNotification',function( msg ){

	//Create Element
	var _span = $('<span>',{'html':msg});
	//Swap content
	$('div.center-box').html( _span );

});