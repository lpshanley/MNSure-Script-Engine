/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('navigation/icTabs/icTabNavi',function( naviText, callback ){
	
	let err = false;
	
	if( _engine.domTools.test.hcrTabType() === 'Integrated Case' ){
		
		let tab = $.grep( _engine.domTools.get.icFrame.icTabList(),function( n ){ 
			return dijit.registry.byNode( n ).label.toLowerCase() === naviText.toLowerCase(); 
		});
		
		tab.length === 0 ?
			tab = false :
			tab = dijit.registry.byNode( tab[0] );
		
		if( tab ){
			if( _engine.domTools.get.icFrame.icTabActive()[0] !== $( tab.domNode )[0] ){
				
				tab.domNode.click();
				
				let count = 0;
				
				let nav = setInterval(function(){
					if( count <= _engine.advanced._vars.iterations){
						
						if( _engine.domTools.get.icFrame.icTabActiveFrame().length > 0 ){
							
							let iFrame = _engine.domTools.get.icFrame.icTabActiveFrame()[0];
							
							console.log( $( iFrame ).find('div.title h2').text() );
							
							
							
						}
						
						count++;
					}
					else clearInterval( nav );
				}, _engine.advanced._vars.timeout);
				
			}
			else err = 'Already on requested tab';
		}
		else err = 'Could not find requested tab';
		
		
		
	}
	
	/*
		_counter = 0;
		var _nav = setInterval(function(){
			if(_counter <= _engine.advanced._vars.iterations){
				var _src = $( _engine.domTools.get.hcrTabFrame() ).find('.content-area-container iframe').attr('src');

					if( typeof _src != "undefined" && _src.split("?")[0].split("/")[1].split("_")[1].split(".")[0].replace("Page",'').toLowerCase() == pageValidation ){

						var _id = $( _engine.domTools.get.hcrTabFrame() ).find('.content-area-container iframe').contents().find('body').attr('id');

						if( typeof _id != "undefined" && _id.split("_")[ _id.split("_").length - 1 ].toLowerCase() == pageValidation ){

							switch( pageValidation ){
								case "dashboard":
									if( $( _engine.domTools.get.icFrame.icTabActiveFrame()[0] ).find('td:has("a")').length > 1 ){

										_engine.debug.info("========== Completed navigation to " + naviText + " [ attempt: " + _counter + " ] ==========");

										if( typeof callback == 'function' ){
											callback( _engine.domTools.get.icFrame.icTabActiveFrame()[0] );
										}

										clearInterval(_nav);

									}
									break;
								default:

									_engine.debug.info("========== Completed navigation to " + naviText + " [ attempt: " + _counter + " ] ==========");

									if( typeof callback == 'function' ){
										callback( _engine.domTools.get.icFrame.icTabActiveFrame()[0] );
									}

									clearInterval(_nav);

									break;

							}

						}

					}

					++_counter;

				} else {

					_engine.debug.error("- * Fail Reason: []: Failed to navigate to " + naviText + " tab. You are either not on an integrated case tab or your requested navigation was invalid.");	

					clearInterval(_nav);

				}

			} else {

				_engine.debug.error("- * Fail Reason: []: Failed to navigate to " + naviText + " tab. Navigation timed out.");	

				clearInterval(_nav);

			}

		},_engine.advanced._vars.timeout);

		_nav;

*/
});