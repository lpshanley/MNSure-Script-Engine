/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/handleClickEvent',function( req ){
	
	console.log( _engine.tools.stringToQuery( req ) );

	
	/*
	var eventLog = e.split('/');
	
	$.each(eventLog,function(k,v){

		var _f = v.substring( 0, v.lastIndexOf("[") );

		var _c, _sc;

		if( v.indexOf("(") == -1 ){
			_c = v.substring( v.lastIndexOf("[")+1,v.lastIndexOf("]") );
			_sc = null;
		} else
		{
			_c = v.substring( v.lastIndexOf("[")+1,v.lastIndexOf("(") );
			_sc = v.substring( v.lastIndexOf("(")+1,v.lastIndexOf(")") );
		}

			/* Function Tree */

	//	switch( _f ){

				/* Navigation Functions */
	//		case "navigation":
	//			switch( _c ){
		//			case "hcr":
		//				_engine.navigation.mainTabs.mainTabNavi('hcr');
	//					break;

	//				case "":
	//					break;
	//				default:
	//					_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
	//					break;
	//			}
	//			break;

				/* Search Functions */
	/*		case "search":
				switch( _c ){
					case "_person":
						_engine.search._person();
						break;
					case "_case":
						_engine.search._case();
						break;

					case "":
						break;
					default:
						_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						break;
				}
				break;

			case "caseWork":
				switch( _c ){
					case "writeNote":
						_engine.caseWork.note.write( _sc );
						break;

					case "unifiedSearch":

						_engine.caseWork.unifiedSearch.start();
						break;

					case "":
						break;
					default:
						_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						break;
				}
				break;

			case "ui":
				switch( _c ){
					case "modalButton":
						_engine.ui.modal._button( _sc );
						break;
					case "":
						break;
					default:
						_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						break;
				}

				break;

			case "tools":
				switch( _c ){
					case "getInfo":

						_engine.debug.info("- * Perform info grab type: " + _sc);

						break;
					default:
						_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						break;
				}

				break;
			case "":
				break;
			default:
				_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_f': "+_f);
		}

	});
*/
});