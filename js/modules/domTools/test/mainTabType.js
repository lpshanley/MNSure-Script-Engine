/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/mainTabType',function( callback ){

	let label = dijit.registry.byNode( _engine.domTools.get.mainTabActive() ).label;
	
	if( typeof callback === 'function' ) callback( label );
	else return label;
	
});