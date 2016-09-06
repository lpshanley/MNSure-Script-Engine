/*   Script Engine Functions
---------------------------------------------*/

var _engine = {
	
	/* Core Functions
	===================*/

	//**************//
	//*   Search   *//
	//**************//
	
	search: {
		_person: function(){
			_engine.navigation.hcr();
			curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Person_search1","");
		},
		_case: function(){
			_engine.navigation.hcr();
			curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Case_search1",""); 
		}
	},
	
	//***************//
	//* DOM Toolbox *//
	//***************//
	
	domTools: {
		get: {
			mainTabList: function(){
				return $('#app-sections-container-dc_tablist > div.dijitTabListWrapper.dijitTabContainerTopNone.dijitAlignClient > div > div.visible');
			},
			mainTabActive: function(){
				return $('#app-sections-container-dc_tablist > div.dijitTabListWrapper.dijitTabContainerTopNone.dijitAlignClient > div > div.visible.dijitTabChecked.dijitChecked');
			},
			hcrTabList: function(){
				_engine.navigation.hcr();
				return $('[widgetid="HCRCASEAPPWorkspaceSection-stc_tablist"] div.dijitTabContainerTop-tabs div.dijitTab');
			},
			hcrTabActive: function(){
				_engine.navigation.hcr();
				return $('[widgetid="HCRCASEAPPWorkspaceSection-stc_tablist"] div.dijitTabContainerTop-tabs div.dijitTab.dijitTabChecked.dijitChecked');
			},
			hcrTabActiveFrame: function(){
				_engine.navigation.hcr();
				var _t = _engine.domTools.get.hcrTabActive();
				var _id = $( _t ).attr( 'widgetid' ).split('-')[1].split('_');
				var _f = _id[2] + "_" + _id[3] + "_" + _id[4] + "_" + _id[5];
				
				return $('[widgetid="'+_f+'"]');
			}
		},
		set: {
			
		}
	},
	
	//***************//
	//*     Nav     *//
	//***************//
	
	navigation: {
		//Nav functions fire only if the user is not already on the
		//screen they are trying to get to.
		hcr: function(){
			if( $( "[title='HCR Cases and Outcomes']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="HCR Cases and Outcomes"]')[0].click();
			}
		},
		home: function(){
			if( $( "[title='Home']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="Home"]')[0].click();
			}
		},
		inbox: function(){
			if( $( "[title='Inbox']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="Inbox"]')[0].click();
			}
		},
		calendar: function(){
			if( $( "[title='Calendar']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="Calendar"]')[0].click();
			}
		}
		
	},
	
	//***************//
	//* UI Building *//
	//***************//
	
	ui: {
		scriptMenu: {
			items: {
				'Searches' : {
					_events: "",
					_submenu: {
						"Person...": {
							_events: "search[_person]"
						},
						"Case...": {
							_events: "search[_case]"
						}
					}
				},
				'Case Notes': {
					_events:"",
					_submenu: {
						"1...": {
							_events: ""
						},
						"2...": {
							_events: ""
						},
						"3...": {
							_events: ""
						}
					}
				}
			},			
			build: function( menu ){ 
				
				/* Build menu */
				var nav = $('<ul>',{id: 'script-launcher-nav'});
				
				/* Attach built menu */
				$('#script-launcher').append( nav );
				
				$.each(menu, function(k,v){
				
					var navItem = $('<li>');
					var navLink = $('<a>',{text: k, onClick: '_engine.events.handleClickEvent("'+v._events+'")' });
					
					/* Attach anchor to list item */
					$( navItem ).append( navLink );
					/* Attach list item to list */
					$( '#script-launcher-nav' ).append( navItem )
					
					if(typeof v._submenu === "object"){
						
						/* Build Subnav Menu */
						var subnav = $('<ul>',{class: 'script-launcher-subnav'});
						
						/* Attach built menu */
						$( navItem ).append( subnav );
						
						$.each(v._submenu, function(k2,v2){ 
						
							var navItemSub = $('<li>');
							var navLinkSub = $('<a>',{text: k2, onClick: '_engine.events.handleClickEvent("'+v2._events+'")'});
						
							/* Attach anchor to list item */
							$( navItemSub ).append( navLinkSub );
							/* Attach list item to list */
							$( subnav ).append(navItemSub)
						
						});
					}
					
				});
			
			},
			destroy: function(){
				
				$('#script-launcher-nav').remove();
				
			} 
		}
	},
	
	//**************//
	//*   Events   *//
	//**************//
	//
	// - Dev Notes -
	//
	// This section is used to interpolate what operations should be
	// performed in the event that a button is clicked.
	//
	
	events: {
		handleClickEvent: function( e ){
			
			var eventLog = e.split('/');
			
			$.each(eventLog,function(k,v){
				
				var _f = v.substring( 0, v.lastIndexOf("[") )
				var _c = v.substring( v.lastIndexOf("[")+1,v.lastIndexOf("]") );

					/* Function Tree */
					
				switch( _f ){
						
						/* Navigation Functions */
					case "navigation":
						switch( _c ){
							case "hcr":
								_engine.navigation.hcr();
								break;
								
							case "":
								break;
							default:
								console.log("Error found in event handler. Could not translate '_c': "+_c);
						}
						break;
						
						/* Search Functions */
					case "search":
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
								console.log("Error found in event handler. Could not translate '_c': "+_c);
						}						
						break;
					
					case "":
						break;
					default:
						console.log("Error found in event handler. Could not translate '_f': "+_f);
				}
				
			});
			
			
		}
	}
	
}

/*   Script Engine Events
---------------------------------------------*/

	/* Scripts Main Button
	========================*/

	//********** Left Click **********//
	// Opens a small settings menu

	$('#script-launcher a').click(function(){
	
		console.log('SETTINGS MENU - NON FUNCTIONAL');
	
	});
	
	//********** Right Click **********//
	// Performs Quick Load of Searches
		
	$('#script-launcher a').contextmenu(function(e){
		
			// Prevent context menu pop-up
		e.preventDefault();
		
			// Open Case Search
		_engine.search._case();
		
			// Open Person Search
		_engine.search._person();
		
	});

/*   Onload
---------------------------------------------*/

_engine.ui.scriptMenu.build( _engine.ui.scriptMenu.items );