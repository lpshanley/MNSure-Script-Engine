/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/tabWatcher',function( tab ){

	let tabScope = $( tab ).attr('widgetid').split('-')[0];
	
	console.log( tabScope );
	
});

