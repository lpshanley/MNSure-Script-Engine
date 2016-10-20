/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/_curamCreatedObject/get',function(){

	return $.parseJSON( $.parseJSON( window.localStorage.__default_curam_selected_tab ) );

});