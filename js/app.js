/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

// 
//     __  ____   _______    _____           _       __     ______            _          
//    /  |/  / | / / ___/   / ___/__________(_)___  / /_   / ____/___  ____ _(_)___  ___ 
//   / /|_/ /  |/ /\__ \    \__ \/ ___/ ___/ / __ \/ __/  / __/ / __ \/ __ `/ / __ \/ _ \
//  / /  / / /|  /___/ /   ___/ / /__/ /  / / /_/ / /_   / /___/ / / / /_/ / / / / /  __/
// /_/  /_/_/ |_//____/   /____/\___/_/  /_/ .___/\__/  /_____/_/ /_/\__, /_/_/ /_/\___/ 
//                                        /_/                       /____/              
// 

var _engine = {

	//**************//
	//*   Search   *//
	//**************//
	
	search: { 
		 
		/* [Search] Opens a new person search
		/********************************************************************/
		
		_person: function(){
			_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
				curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Person_search1","");
			});
		},
		
		/* [Search] Opens a new case search
		/********************************************************************/
		
		_case: function(){
			_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
				curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Case_search1",""); 
			});
		}
		
	},
	
	//***************//
	//* DOM Toolbox *//
	//***************//
	
	domTools: {
		
		/* [DOM Toolbox] Performs the gathering of specific elements
		/********************************************************************/
		
		get: {
			
				/* Returns an array of the top level tabs ( Home, 
				|* HCR Cases and Outcomes, Inbox, and Calendar )
				\*----------------------------------------------------------*/
			mainTabList: function(){
				return $('#app-sections-container-dc_tablist > div.dijitTabListWrapper.dijitTabContainerTopNone.dijitAlignClient > div > div.visible');
			},
			
				/* Returns the tab in the top level that is presently 
				|* selected
				\*----------------------------------------------------------*/
			mainTabActive: function(){
				return $('#app-sections-container-dc_tablist > div.dijitTabListWrapper.dijitTabContainerTopNone.dijitAlignClient > div > div.visible.dijitTabChecked.dijitChecked')[0];
			},
			
				/* Returns an array of the tabs that are currently 
				|* open on the HCR Cases and Outcomes screen.
				\*----------------------------------------------------------*/
			hcrTabList: function(){
				return $('[widgetid="HCRCASEAPPWorkspaceSection-stc_tablist"] div.dijitTabContainerTop-tabs div.dijitTab');
			},
			
				/* Returns an array of the tabs that are currently 
				|* open based on a specified tab type
				\*----------------------------------------------------------*/
			
			hcrTabListTypeQuery: function( _queryType ){
				
				_engine.debug.info("Starting tab list query");
				
				var _openTabs = _engine.domTools.get.hcrTabList();
				
				var _returnArray = [];
			
				$.each( _openTabs, function( k, v ){
					
					var _tabType = _engine.domTools.test.hcrTabType( $( v ) );
					
					if(_tabType == false){
						_tabType = "Person Page";
					}
					
					if( _tabType.split("|").length == 2 && _queryType.toLowerCase() == "pdc" ){
						
						_tabType = _tabType.split("|")[0].trim;
						
					}
					
					_engine.debug.info("Comparing query type [ '"+ _queryType.toLowerCase() +"' ] to tab type [ '"+ _tabType.toLowerCase() +"' ]");
					
					if( _tabType.toLowerCase() == _queryType.toLowerCase() ){
						
						_engine.debug.info("Type matched. Added to array.");
						
						_returnArray.push( v );
						
					}

					
				});
				
				_engine.debug.info("Completed tab list query.");
					
				return _returnArray;
			
			},
			
				/* Returns the tab that is currently the focus on the
				|* HCR Cases and Outcomes screen.
				\*----------------------------------------------------------*/
			hcrTabActive: function(){
				return $('[widgetid="HCRCASEAPPWorkspaceSection-stc_tablist"] div.dijitTabContainerTop-tabs div.dijitTab.dijitTabChecked.dijitChecked')[0];
			},
			
				/* Returns the iFrame for the tab that is currently the
				|* focus on the HCR Cases and Outcomes screen.
				|* This can be thought of as the wrapper for the tabs
				|* content.
				\*----------------------------------------------------------*/
			hcrTabFrame: function( _tab ){
				
				typeof _tab == 'undefined' ? 
					_tab = _engine.domTools.get.hcrTabActive() : 
					typeof _tab[0] != 'undefined' ?
						_tab = _tab[0]:
						_tab = _tab;
				
				var _id = $( _tab ).attr( 'widgetid' ).split('-')[1].split('_');
				var _f = _id[2] + "_" + _id[3] + "_" + _id[4] + "_" + _id[5];
				
				return $('[widgetid="'+_f+'"]')[0];
				
			},
			
				/* These functions get elements that are contained inside the 
				|* iFrame returned from '_engine.domTools.get.hcrTabFrame()' 
				\*----------------------------------------------------------*/
			icFrame: {
				
					/* This returns an array of tabs that are available on the 
					|* currently focused icFrame ( Home, Evidence, Participants, 
					|* Assessments, Services, etc... )
					\*----------------------------------------------------------*/
				icTabList: function(){

					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabFrame();
						return $( _tp ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible');
					} else {
						_engine.caseWork.caseSelection();
					}
				},
				
					/* This returns the tab that is currently the focused tab 
					|* of the open Integrated case. ( Home, Evidence, Participants, 
					|* Assessments, Services, etc... )
					\*----------------------------------------------------------*/
				icTabActive: function(){

					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabFrame();
						return $( _tp ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible.dijitTabChecked.dijitChecked');
					} else {
						_engine.caseWork.caseSelection();
					}
				},
				
					/* This returns the left hand sub menu of screens that have 
					|* one. Example: 'Contact Tab' - [Notes, Attachements, 
					|* Meeting Minutes, Communications]
					\*----------------------------------------------------------*/
				icTabActiveSubMenu: function(){

					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabFrame();
						return $( _tp ).find('div.dijitStackContainer-child.dijitVisible');
					}
				},
				
					/* Returns the frame that is from the currently focused tab
					|* on the currently focused IC Tab [This is the lower portion
					|* of the currently open IC Tab.]
					\*----------------------------------------------------------*/
				icTabActiveFrame: function(){

					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabFrame();
						
						return $( _tp ).find('.content-area-container iframe').contents().find('body');
					}
				},
				
					/* Returns elements that are a subset of the home tab
					|* on an IC Case
					\*----------------------------------------------------------*/
				homeTab: {
					
						/* Returns an array of the cases that display on the Home Tab
						\*----------------------------------------------------------*/
					cases: function(){

						if(_engine.domTools.test.hcrTabActiveIsIC()){
							var _tp = _engine.domTools.get.icFrame.icTabActiveFrame();
							return $( _tp ).find('#content > div:nth-child(6)');
						}
					}
				},
				contactTab: {
					caseNoteModal:{
						_activeModal: function(){
							
							var _modalFrame = $('iframe[title="Modal Frame - New Note"].curam-active-modal');
							
							if( typeof _modalFrame[0] != "undefined" ){
								
								var _bodyFrame = $( _modalFrame ).contents().find('iframe.cke_wysiwyg_frame');
								
								//Modal is open
								if ( typeof _bodyFrame[0] != 'undefined' ){
									
									//Modal is loaded
									_engine.debug.info("- * [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open and fully loaded.");
									return _modalFrame;
									
								} else {
									_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open but not fully loaded.");
									return false;
								}
							} else {
								_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Unable to target an open case note modal.");
								return false;
							}
						},
						_subject: function(){
							
							var _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();
							
							if( _activeModal != false ){
								
								return $( _activeModal ).contents().find('input[title="Subject Mandatory"]');
								
							}
						},
						_body: function(){
							
							var _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();
							
							if( _activeModal != false ){
								
								return $( _activeModal ).contents().find('iframe.cke_wysiwyg_frame').contents().find('body');
								
							} else {
								
								return false;
								
							}
						}
					}
				}
			},
			
			/* These get elements on the searches screens 
			\*----------------------------------------------------------*/
				
			searches: {
				
				inputQuery: function( _title ){
					
					return _engine.domTools.get.searches.advancedQuery( 'input[title="' + _title + '"]' );
					
				},
				
				advancedQuery: function( _query ){
					
					var screenType = _engine.domTools.test.hcrTabType();
					
					if( screenType == "Case Search" || screenType == "Person Search" ){
						
						var _frame = $( _engine.domTools.get.hcrTabFrame() );
						
						var _result = $( _frame ).find('iframe').contents().find( _query );
						
						if( _result.length > 0 ){
							
							return _result;
							
						} else {
							
							_engine.debug.warn("- * [ _engine.domTools.get.searches.advancedQuery( _query ) ] Could not find requested field: " + _query);
							
							return false;
							
						}
						
					} else {
						
						_engine.debug.warn("- * [ _engine.domTools.get.searches.advancedQuery( _query ) ] You must be on a search page to use this dom query.");

						return false;
						
					}
					
				},
				
				searchResultsQuery: function (){
					return _engine.domTools.get.searches.advancedQuery("table[summary='Search Results. Press INSERT + ESC to update list contents'] tbody tr:not('.list-details-row')");
				}
				
			}
			
		},
		
		/* [DOM Toolbox] Used to change DOM elements, usualy various inputs.
		/********************************************************************/
		
		set:{
			icFrame: {
				contactTab: {
					caseNoteModal:{
						subject: function( _s ){
							
							_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.subject() ] Started | Input: " + _s);
							
							if(typeof _engine.domTools.get.icFrame.contactTab.caseNoteModal._subject() != 'undefined'){
								
								_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.subject() ] Located modal subject");
								
								_engine.domTools.get.icFrame.contactTab.caseNoteModal._subject().val( _s );
								
							} else {
								_engine.debug.warn("- * Fail Reason: [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.subject() ]: Could not add line. Subject returning 'undefined'.")
							}
							
							_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.subject() ] Complete");
							
						},
						body: {
							addLine: function( _s ){
								
								_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Started | Input: " + _s);
								
								var _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body();
								
								if(typeof $( _modalBody ) != 'undefined'){
									
									_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Located modal body");

									//Wrap input in div tags
									var line = $('<div>',{'html':_s});
									
									//Check if body is empty
									
									if(_engine.domTools.test.icFrame.contactTab.caseNoteModal.body.isEmpty()){
										
										_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Body empty. Writing Line.");
										
										//If empty, set first line
										
										$( _modalBody ).html( line );
										
									} else {
										
										_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Body not empty. Writing Line.");
										
										//If not empty, add to body
										$( _modalBody ).append( line );

									}
									
								} else {
									_engine.debug.warn("- * Fail Reason: [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ]: Could not add line. Body returning 'undefined'.")
								}
								
								_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Complete");
								
							}
						}
					}
				}
			},
			
			searches: {
				
				fieldFill: function( _field, _value ){
					
					var _f = _engine.domTools.get.searches.inputQuery( _field );
					
					if( _f != false ){
						
						$( _f ).val( _value );
						
					}
					
				}
				
			}
			
		},
		
		/* [DOM Toolbox] Performs logic operations and comparisons on DOM
		/********************************************************************/
		
		test: {
			
			mainTabType: function( callback ){
	
				var activeTab = _engine.domTools.get.mainTabActive();
				
				var activeTabLabel = $( activeTab )[0].innerText.trim();
				
				if( typeof callback === 'function' ) callback( activeTabLabel );
				else return activeTabLabel;
				
			},
			
			hcrTabActiveIsIC: function( callback ){
				
				var result = false;
				
				var mainTabType = _engine.domTools.test.mainTabType();
				
				if( mainTabType === 'HCR Cases and Outcomes' ){
					
					var hcrTabType = _engine.domTools.test.hcrTabType();
					
					if( hcrTabType === 'Integrated Case' ){
						
						result = true;
						
					} else {
						
						_engine.debug.warn(`You are not on an integrated case. Current tab type is: ${ hcrTabType }.`);
						
					}
					
				} else {
					
					_engine.debug.warn(`Current HCR Tab can only be determined if on the HCR Cases and Outcomes screen. Current main tab is: ${ mainTabType }`);
					
				}
				
				if( typeof callback === 'function' ) callback( result );				
				else return result;
				
			},
			hcrTabType: function( _tab ){
				
				if( _engine.domTools.get.hcrTabList().length > 0 ){
				
					typeof _tab == 'undefined' ? 
						_tab = _engine.domTools.get.hcrTabActive() : 
						typeof _tab[0] != 'undefined' ?
							_tab = _tab[0] :
							_tab = _tab;
					
					if ( _tab.innerText.match(/\d+/g) == null ){
						// Titles without numbers
							
							//Titles Containg Search
						if ( _tab.innerText.indexOf("Search") != -1 ){
							
								// Case Search
							if ( _tab.innerText.indexOf("Case") != -1 ){
								return "Case Search";
								// Person Search
							} else if( _tab.innerText.indexOf("Person") != -1 ){
								return "Person Search";
							} else if( _tab.innerText.indexOf("Employer") != -1 ){
								return "Employer Search";
							} else if( _tab.innerText.indexOf("All Participants") != -1 ){
								return "All Participants Search";
							} else if( _tab.innerText.indexOf("Application") != -1 ){
								return "Application Search";
							} else if( _tab.innerText.indexOf("Investigation") != -1 ){
								return "Investigation Search";
							} else if( _tab.innerText.indexOf("Incident") != -1 ){
								return "Incident Search";
							} else if( _tab.innerText.indexOf("Educational Institute") != -1 ){
								return "Educational Institute Search";
							} else if( _tab.innerText.indexOf("External Party") != -1 ){
								return "External Party Search";
							} else if( _tab.innerText.indexOf("Utility") != -1 ){
								return "Utility Search";
							} else if( _tab.innerText.indexOf("External Party Office") != -1 ){
								return "External Party Office Search";
							}
						
						} else if( _tab.innerText.indexOf("My Applications") != -1 ){
							return "My Applications";
						} else if( _tab.innerText.indexOf("My Items of Interest") != -1 ){
							return "My Items of Interest";
						} else if( _tab.innerText.indexOf("My Cases") != -1 ){
							return "My Cases";
						} else if( _tab.innerText.indexOf("My Recently Approved Cases") != -1 ){
							return "My Recently Approved Cases";
						} else if( _tab.innerText.indexOf("Cases Recently Assigned to Me") != -1 ){
							return "Cases Recently Assigned to Me";
						}	else if( _tab.innerText.indexOf("Recently Viewed Cases") != -1 ){
							return "Recently Viewed Cases";
						}	else if( _tab.innerText.indexOf("My Service Plans") != -1 ){
							return "My Service Plans";
							
							
							//Person Page
							
						} else {
							
							_tabFrame = $( _engine.domTools.get.hcrTabFrame( _tab ) ).find('iframe.detailsPanelFrame');
							
							if( _tabFrame.length == 0 ){
								
								_returnTab = _engine.domTools.get.hcrTabActive();
								_tab.click();
								_returnTab.click();

								return "Person Page";

								
							} else if( _tabFrame.length > 0 ){ 
								
								if( $( _tabFrame ).attr('src').split("/")[1].split(".")[0].replace("TabDetailsPage", "").toLowerCase() == "person_home" ){
							
									return "Person Page";
									
								}
								
								//UNDEFINED
							} else {
								
								_engine.debug.info("- * UNDEFINED ( w/o numbers )");
							
								return "UNDEFINED";
								
							}
							
						} 
						
					} else {
						// Titles with numbers
						
							// Titles containing "Insurance Affordability"
						if( _tab.innerText.indexOf("Insurance Affordability") != -1 ){
								// Integrated Case Screen
							if( _tab.innerText.indexOf("Insurance Affordability") == 0 ){
								return  "Integrated Case";
								// Evidence Screen
							} else if( _tab.innerText.indexOf("Insurance Affordability") > 0 ) {
								return  "Evidence|" + _tab.innerText.split("-")[0].trim() ;
							}
						} else if ( $.inArray( _tab.innerText.replace(/[0-9]/g,"").trim().toLowerCase(), ["medical assistance", "minnesotacare", "unassisted qualified health plan", "insurance assistance"] ) != -1 ) {
							
							return "PDC|" + _tab.innerText.replace(/[0-9]/g,"").trim();
							
						} else {
							
							_engine.debug.info("- * UNDEFINED ( w/numbers )");
							return "UNDEFINED";
							
						}
						
					}
					
				} else {
					
					_engine.debug.warn("- * There are no open tabs that are available to test.");
					
					return "UNDEFINED";
					
				}
					
			},
			icFrame: {
				contactTab: {
					caseNoteModal:{
						body: {
							isEmpty: function(){
								
								var _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body();
								
								if( _modalBody != false ){
									if( $( _modalBody ).text() == ""){
										return true;
									} else {
										return false;
									}
								} else {
									_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.icFrame.contactTab.caseNoteModal.body.isEmpty() ]: Case note body object is returning undefined. Not loaded.")
									return undefined;
								}
							}
						}
					}
				},
				onTab: function( _t ){
					var current_tab = _engine.domTools.get.icFrame.icTabActive().text().replace("Close Tab", "").trim().toLowerCase();
					if( _t.toLowerCase() == current_tab ){
						return true;
					} else {
						return false;
					}
				}
			},
			searches: {
				windowLoaded: function(){
					
					var _screenType = _engine.domTools.test.hcrTabType();
					
					if( _screenType == "Person Search" || _screenType == "Case Search" ){
					
						var _searchFrame = _engine.domTools.get.hcrTabFrame();
						
						if( typeof _searchFrame != "undefined" ){
							
							var _searchBody = $( _searchFrame ).find('iframe').contents().find('input');
							
							
							//Search is open
							if ( typeof _searchBody[0] != 'undefined' ){
								
								if( _engine.domTools.get.searches.advancedQuery(".action-set a:contains('Search')").length > 0 ){
								
									//Search is loaded
									_engine.debug.info("- * [ _engine.domTools.test.searches.windowLoaded() ] Search is open and fully loaded.");
									return true;
								
								} else {
									
									_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Search is open but not fully loaded.");
									return false;
									
								}
								
							} else {
								
								_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Search is open but not fully loaded.");
								return false;
								
							}
						} else {
							
							_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Unable to target search.");
							return false;
							
						}
					
					} else {
						
						_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Not on a valid search screen.");
						return false;
						
					}
					
				}
			}			
		}
	},
	
	//***************//
	//*     Nav     *//
	//***************//
	
	navigation: {
		
		mainTabs: {
			
			mainTabNavi: function( tab, callback ){
				
				tab = tab.toLowerCase();
				
				let navTitle = "";
				
				if(tab === "hcr") tab = "hcr cases and outcomes";
				
				switch( tab ){
					case "home":
						navTitle = "Home";
						break;
					case "hcr cases and outcomes":
						navTitle = "HCR Cases and Outcomes";
						break;
					case "inbox":
						navTitle = "Inbox";
						break;
					case "calendar":
						navTitle = "Calendar";
						break;
					default:
						break;		
				}
				
				if( navTitle != _engine.domTools.get.mainTabActive().innerText.trim() ){
					
					$(`[title='${navTitle}']`)[0].click();
					
				}
				
				if(typeof callback === 'function') callback();
				
			}
		
		},
		
		/* [Nav] Performs navigation on the tabs in the hcr tab
		/********************************************************************/
		
		hcrTabs: {
			
			hcrTabNavi: function( tabTitle, callback ){
				
				_engine.debug.info('=================== Starting HCR Tab Navigation. ===================');
				
				_engine.debug.info('- * Gathering return tab information.');
				var returnTab = _engine.domTools.get.hcrTabActive();
				
				_engine.debug.info('- * Gathering list of open tabs.');
				var openTabs = _engine.domTools.get.hcrTabList();
				
				_engine.debug.info('- * Iterating over list of tabs.');
				$.each(openTabs, function(k,v){
					
					if( v.innerText.trim() == tabTitle ){
						
						_engine.debug.info('- * Navigating match found - selecting match.');
						
						$(v).click();
						
						_engine.debug.info('- * Gathering frame of new window.');			
						var tabFrame = _engine.domTools.get.hcrTabFrame();
						
						if(typeof callback == 'function'){
							_engine.debug.info('=================== Comleted HCR Tab Navigation. ===================');
							callback( _engine.domTools.get.hcrTabFrame(), returnTab );
						}
						
					};
					
				});
			
			}
			
		},
		
		/* [Nav] Performs navigation on the sub tabs when on a case
		/********************************************************************/
		
		icTabs: {
			
			icTabNavi: function( naviText, callback ){
				
				if( _engine.domTools.test.hcrTabType() == 'Integrated Case' ){

					naviText = naviText.toLowerCase();
					var pageValidation = null;
					
					switch( naviText ){
						case "home":
							pageValidation = "home";
							pageNavigation = _engine.navigation.icTabs.icNavCore("Home");
							break;
						case "evidence":
							pageValidation = "dashboard";
							pageNavigation = _engine.navigation.icTabs.icNavCore("EvidenceFolder");
							break;
						case "participants":
							pageValidation = "listcasemember";
							pageNavigation = _engine.navigation.icTabs.icNavCore("ParticipantFolder");
							break;
						case "assessments":
							pageValidation = "listassessment";
							pageNavigation = _engine.navigation.icTabs.icNavCore("Assessments");
							break;
						case "services":
							pageValidation = "listservicedeliveries";
							pageNavigation = _engine.navigation.icTabs.icNavCore("Services");
							break;
						case "referrals":
							pageValidation = "listreferrals";
							pageNavigation = _engine.navigation.icTabs.icNavCore("Referrals");
							break;
						case "contact":
							pageValidation = "listnote";
							pageNavigation = _engine.navigation.icTabs.icNavCore("ContactFolder");
							break;
						case "tasks":
							pageValidation = "listtask";
							pageNavigation = _engine.navigation.icTabs.icNavCore("Tasks");
							break;
						case "issues and proceedings":
							pageValidation = "listinvestigation";
							pageNavigation = _engine.navigation.icTabs.icNavCore("IssuesAndProceedings");
							break;
						case "administration":
							pageValidation = "listcontest";
							pageNavigation = _engine.navigation.icTabs.icNavCore("AdminFolder");
							break;
						case "elections":
							pageValidation = "listcasemembersforelections";
							pageNavigation = _engine.navigation.icTabs.icNavCore("ElectionsFolder");
							break;
						default:
							pageValidation = "";
							pageNavigation = false;
							break;
					}
					

					// Timeout Counter
					_counter = 0;

					_engine.debug.info("========== Attempting to navigate to " + naviText + " ==========");
					
					// Run a max of 2500ms
					var _nav = setInterval(function(){
						
						if(_counter <= _engine.advanced._vars.iterations){
							
							_engine.debug.info("- * Navigation attempt: " + _counter);
							
							if( pageNavigation != false){
							
								var _src = $( _engine.domTools.get.hcrTabFrame() ).find('.content-area-container iframe').attr('src');

								if( typeof _src != "undefined" && _src.split("?")[0].split("/")[1].split("_")[1].split(".")[0].replace("Page",'').toLowerCase() == pageValidation ){

									var _id = $( _engine.domTools.get.hcrTabFrame() ).find('.content-area-container iframe').contents().find('body').attr('id');
									
									if( typeof _id != "undefined" && _id.split("_")[ _id.split("_").length - 1 ].toLowerCase() == pageValidation ){
										
										/* Extra screen specific validations */
										
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
				
				} else {
					
					_engine.debug.warn("- * The IC Tab navigation function must be run from an Integrated Case Tab.")
					
					_engine.caseWork.caseSelection();
					return false;
					
				}
				
			},
			
			icNavCore: function( _t ){
				var _tl = _engine.domTools.get.icFrame.icTabList();
				$.each( _tl, function( k, v ){
					_tabID = $( v ).attr('widgetid').split('-');
					if( $.inArray( _t, _tabID ) > -1 ){
						if(!$( _engine.domTools.get.icFrame.icTabList()[k] ).hasClass('dijitTabChecked')){
							_engine.domTools.get.icFrame.icTabList()[k].click();
						}
						return false;
					}
				});
			}
			
		}
		
	},
	
	//***************//
	//*     UI      *//
	//***************//
	
	ui: {
		
		/* [UI] Makes AJAX request for menu structure and builds menu
		/********************************************************************/
		
		scriptMenu: {
			build: function(){
				
				var menu = null;
				
				var _url = _engine.advanced.baseUrl();
				
				if( _engine.beta.betaURL() ){
					var filePath = "json/beta script menu.json";
				} else {
					var filePath = "json/release script menu.json";
				}
				
				$.ajax({
					dataType: "json",
					url: _url + filePath,
					async: false,
					success: function( data ){
					
						menu = data;
					
					}
				});
				
				if( menu != null ){
				
					/* Build menu */
					var nav = $('<ul>',{id: 'script-launcher-nav'});
					
					/* Attach built menu */
					$('#script-launcher').append( nav );
					
					$.each(menu, function(k,v){
					
						var navItem = $('<li>');
						var navLink = $('<a>',{text: k, 'data-click': v._events });
						
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
								var navLinkSub = $('<a>',{text: k2, 'data-click': v2._events });
							
								/* Attach anchor to list item */
								$( navItemSub ).append( navLinkSub );
								/* Attach list item to list */
								$( subnav ).append(navItemSub)
							
							});
						}
						
					});
				
				}
			
			},
			destroy: function(){
				
				$('#script-launcher-nav').remove();
				
			},
			refresh: function(){
				
				_engine.ui.scriptMenu.destroy();
				
				_engine.ui.scriptMenu.build();
				
				$('#script-launcher-nav li').on('click',function( e ){ 

					var _event = $(this).children('a').attr('data-click');
					
					_engine.events.handleClickEvent( _event );

				});
				
			}
		},
		
		/* [UI] Performs all actions related to custom modals
		/********************************************************************/		
		
		modal: {
			build: function( title, layout, type ){

					//Add modal class to body
				$('body').addClass('modal');
			
					//Greyed out layout background
				var overlay = $('<div>',{'class':'modal-overlay'});
				$('body').append( overlay );
				
					//Modal Wrapper Div
				var contentWrapper = $('<div>',{'class':'modal-content-wrapper dijitDialog'});
				$('div.modal-overlay').append( contentWrapper );
				
					//Title Bar
				var titlebar = $('<div>',{'class':'dijitDialogTitleBar modal-titlebar'});
				$('div.modal-content-wrapper').append( titlebar );
				
					//Title text in title bar
				var dialogTitle = $('<span>',{'class':'dijitDialogTitle','text':title});
				$('div.modal-titlebar').append( dialogTitle );
				
					//Close X on title bar
				var closeButton = $('<span>',{'class':'dijitDialogCloseIcon', 'onClick':'_engine.events.handleClickEvent("ui[modalButton(close)]")'});
				$('div.modal-titlebar').append( closeButton );
				
					//Wapper for the layout from the view template
				var modalContentContainer = $('<div>',{'class': 'modal-content-container'});
				$( 'div.modal-content-wrapper' ).append( modalContentContainer );
				
					//Load view template into wrapper
				$('div.modal-content-container').append( layout );
				
					//Modal footer - Wrapper
				var mnsModalFooter = $('<div>', {id:'mns-modal-actions', 'class':'actions-panel'});
				
					//Modal footer - Button Container
				var mnsModalFooterButtonContainer = $('<div>', {'class':'action-set center'});
				
					//Button Text
				var _submit = "Submit"
				var _type = type;
				
					//Modal footer - Button Anchor
				var mnsModalFooterSubmitButton = $('<a>', {'onClick':'_engine.events.handleClickEvent("ui[modalButton('+_type+')]")', 'html':'<span class="left-corner"><span class="right-corner"><span class="middle">'+ _submit +'</span></span></span>'});
				
					//Modal footer - Filler Span
				var mnsModalFooterFiller = $('<span>', {'class':'filler'});

					//Button Text
				var _cancel = "Cancel"
				
					//Modal footer - Button Anchor
				var mnsModalFooterCancelButton = $('<a>', {'onClick':'_engine.events.handleClickEvent("ui[modalButton(close)]")', 'html':'<span class="left-corner"><span class="right-corner"><span class="middle">'+ _cancel +'</span></span></span>'});
				
					//Add footer to modal
				$( 'div.modal-content-wrapper' ).append( mnsModalFooter );
				
					//Add button container
				$( '#mns-modal-actions' ).append( mnsModalFooterButtonContainer );
				
					//Add submit button
				$( '#mns-modal-actions div.action-set' ).append( mnsModalFooterSubmitButton );
				
					//Add filler
				$( '#mns-modal-actions div.action-set' ).append( mnsModalFooterFiller );
				
					//Add cancel button
				$( '#mns-modal-actions div.action-set' ).append( mnsModalFooterCancelButton );
				
				_engine.ui.modal._setupClusters();
				
				_engine.ui.modal._watch();
				
				$('.modal-content-wrapper').draggable({ handle: 'div.modal-titlebar' });
				
			},
			destroy: function(){
				
				_engine.ui.modal._unwatch();
				
				$('div.modal-overlay').remove();
				
				$('body').removeClass('modal');
				
				_engine.storage.prefillCache.clear();
				
			},
			_storeParams: function(){
				
				var _fields = $('.mns-modal-template > .mns-input-group');
				
					//Push additional clusters if clustering is active
				if( _engine.ui.modal._clustersActive() ){
					
					_clusterFields = $('.mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');
					
					$.each(_clusterFields,function(k,v){
						
						_fields.push(v);
						
					});
					
				}
				
				var _fieldCount = $('.mns-modal-template > .mns-input-group').length;
				
				var _allParams = "";
				
				var _params = "";
				
				$.each(_fields,function(k,v){
					
					//Start Object
					_params += "{";
					
					//Cleaning up descriptor
					var _descriptor = '';
					if($( v ).find( '.mns-input-descriptor' ).length > 0){
						_descriptor = $( v ).find( '.mns-input-descriptor' ).text();
					}
					
					_params += '"descriptor":"' + _descriptor + '",';
					
					//Cleaning up label
					var _label = '';
					if($( v ).find( '.mns-input-label' ).length > 0){
						_label = $( v ).find( '.mns-input-label' ).text().replace(": ", "");
					}
					
					_params += '"label":"' + _label + '",';
					
					//Cleaning up input text
					var _input = '';
					
					if($( v ).find( 'input, select' ).length > 0){
						//Preform storage action based on input type
						switch( $( v ).find( 'input, select' ).attr("type") ){
							case "text":
								var _input = $( v ).find( 'input' ).val().toString();
								_input = _input.replace(/"/g,'&quot;')
								_input = _input.replace('"','\"');
								break;
							case "select":
								var _input = $( v ).find( 'select' ).val().replace(/"/g,'&quot;');
								_input = _input.replace('"','\"');
								break;
							case "date":
								var _date = $( v ).find( 'input' ).val().split("-");
								if( _date.length == 3 ){
									_input = _date[1] + "/" + _date[2] + "/" + _date[0];
								} else {
									_input = "";
								}
								break;
							default:
								var _input = "";
								break;
						}
					}
					_params += '"value":"'+ _input +'"';
					

					_params += "},";
					
						//If there is a descriptor AND an input and the input is blank -> dont log the descriptor
					if( _descriptor != "" && $( v ).find( 'input, select' ).length > 0 && _input == "" ){
						_params = "";
					}
			
					_allParams += _params;
					
					_params = "";
					
				});

				_allParams = '[' + _allParams + ']';
				
				_allParams = _allParams.replace(",]","]");
				
				//Place objects into an array
				_engine.storage.modalParams.set( _allParams );
				
				return;
				
			},
			_button:function( _type ){
				
				_engine.debug.info( "- * [ _engine.ui.modal._button() ] function started with type: " + _type );
				
				switch( _type.toLowerCase() ){
					case "case notes":
						
						if( _engine.ui.modal._validateModal() ){
							
							_engine.ui.modal._storeParams();
						
							_engine.caseWork.note._completeNote();
							
							_engine.ui.modal.destroy();
						
						} else {
							
							_engine.debug.info("- * [ _engine.ui.modal._button( case notes ) ]: Invalid modal submission. Correct highlighted fields.");
							
						}

						break;
					case "queries":
					
						if( _engine.ui.modal._validateModal() ){
							
							_engine.ui.modal._storeParams();
						
							_engine.caseWork.unifiedSearch._finish();
							
							_engine.ui.modal.destroy();
						
						} else {
							
							_engine.debug.info("- * [ _engine.ui.modal._button( queries ) ]: Invalid modal submission. Correct highlighted fields.");
							
						}
					
						break;
					case "error":
						
						_engine.debug.error("- * Fail Reason: Modal Error [ _engine.ui.modal._button( error ) ]: Error modal. Unable to fetch proper template file.");
						
						_engine.ui.modal.destroy();
						
						break;
					case "close":
						
						_engine.ui.modal.destroy();
						
						break;
					default:
						_engine.debug.error("- * Fail Reason: Modal Error [ _engine.ui.modal._button( _type ) ]: Type error or type not found.");
						break;
					
				}
				
			},
			_validateModal: function(){
				
				var _invalidFields = 0;
				
				if( _engine.ui.modal._clustersActive() ){
					var required = $('div.mns-modal-template > .mns-input-group.required, div.mns-modal-template > .input-cluster-active > .required');
				} else {
					var required = $('div.mns-modal-template .required');
				}
				
				$.each( required,function( k,v ){ 

					if( $( v ).find('input').val() == "" ){
					
						$( v ).addClass("input-error");
						
						++_invalidFields;
					
					} else {
					
						$( v ).removeClass("input-error");
					
					}
					
				});

				if( _invalidFields == 0 ){
					return true;
				} else {
					return false;
				}
				
			},
			_watch: function(){
				
				$('.mns-modal-template span.mns-input-group:has("input") input').focus();
				
				$('.mns-modal-template').keypress(function(e){ 
					
					switch( e.keyCode ){
						// Pressed the Enter Key
						case 13:
							//Is the form able to be submitted?
							if( $('.mns-modal-template').hasClass('submit-form') ){
								//Are you in a textarea trying to submit?
								if( !$( document.activeElement ).is('textarea') ){
								
									$('#mns-modal-actions a:contains("Submit")').click();
								
								}
							}
							break;
						default:
							break;
					}

				});
				
				//Process onLoad Prefill
				_engine.ui.modal._processPrefill();
				
				if( _engine.ui.modal._clustersActive() ){
					
					var _subject = $( '.modal-content-container span.mns-input-group span:contains("SUBJECT")' );
					
					if( _subject.length == 1 ){
						
						var _select = $( _subject ).parent().find('select');
					
						$( _select ).on('change',function(){
							
							_selectVal = $( _subject ).parent().find('select').val();
							
							_engine.ui.modal._changeActiveCluster( _selectVal );
							
							//Process dynamic Prefill on subject change
							_engine.ui.modal._processPrefill();
							
						});
					
					}
				
				}		
				
			},
			_unwatch: function(){
				
				$('.mns-modal-template').off('keypress');
				
				$( '.modal-content-container span.mns-input-group span:contains("SUBJECT")' ).parent().find('select').off('change');
				
			},
			_setupClusters(){

				if( _engine.ui.modal._clustersActive() ){
					
					var _subject = $( '.modal-content-container span.mns-input-group span:contains("SUBJECT")' );
					
					if( _subject.length == 1 ){
						
						_selectVal = $( _subject ).parent().find('select').val();
					
						_engine.ui.modal._changeActiveCluster( _selectVal );
						
					}
					
				}
				
			},
			_changeActiveCluster: function( subjectValue ){
				
				if( _engine.ui.modal._clustersActive() ){
					
					var _activeCluster = $('span.mns-input-cluster.input-cluster-active');
					
					if( _activeCluster.length == 1 ){
						$( _activeCluster ).removeClass('input-cluster-active');
					}
					
					var _clusters = $('span.mns-input-cluster');
					
					$.each(_clusters,function(k,v){
						
						var _clusterTitle = $(v).attr('data-cluster-title');
						
						if( _clusterTitle == subjectValue ){
							
							$( v ).addClass( 'input-cluster-active' );
							
						}
						
					});
					
				}
				
			},
			_clustersActive: function(){
				
				_modal = $('div.mns-modal-template');
				
				if( _modal.length == 1 ){
					
					var _clustersEnabled = $( _modal ).attr('data-input-clusters');

					_clustersEnabled == "true" ? _clustersEnabled = true : _clustersEnabled = false;
				
					return _clustersEnabled;
					
				}

			},
			_processPrefill: function(){
				
				var _fields = $('.mns-modal-template > .mns-input-group');

					//Push additional clusters if clustering is active
				if( _engine.ui.modal._clustersActive() ){
					
					_clusterFields = $('.mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');
					
					$.each(_clusterFields,function(k,v){
						
						_fields.push(v);
						
					});
					
				}

				$.each( _fields, function(k,v){
						
					if( $( v ).find('input').length !== 0 ){
						
						var input = $( v ).find('input')[0];
						
						if( typeof $( input ).attr('data-prefill') !== 'undefined' ){
							
							//Process prefill on field(s)
							
							var _prefill = $( input ).attr('data-prefill').toLowerCase();

							var _prefillType = _prefill.split("|")[0];
							var _prefillValue = _prefill.split("|")[1];
							
							switch( _prefillType ){
								case "date":
									switch( _prefillValue ){
										case "today":
											
											var d = new Date();
											
											var prefillDate = d.toISOString().split('T')[0];
											
											$( v ).find('input').val( prefillDate );
											
											break;
										default:
											break;
									}
									break;
								case "evidence":
									if( _prefillValue != "" ){
										
										_engine.ui.modal._prefillFromDataQuery(_prefillValue,function( prefillString ){
											$( v ).find('input').val( prefillString );
										});
										
									}							
									break;
								default:
									_engine.debug.warn("unrecognised prefill type of: [ '" +_prefill+ " ']");
									break;
							}
						
						}
						
					}
					
				});
				
			},
			_prefillFromDataQuery: function(type, callback ){
				
				type = type.toLowerCase();
				
				var scope = 'current';

				if( type.indexOf("(") !== -1 ){
					var scope = type.substring( type.lastIndexOf("(")+1,type.lastIndexOf(")") );
					var type = type.substring( 0 ,type.lastIndexOf("(") );
				} else {
					
					_engine.debug.warn(`No scope defined in prefill call. Defaulting to current.`);
					
				}

				if( scope !== 'history' ){
					if( scope !== 'current' ){
						
						_engine.debug.warn(`Invalid use of prefill scope: ${ scope }. Using current instead.`);
						
						scope = 'current';
						
					}
				}
				
				var builtQueries = Object.getOwnPropertyNames( _engine.advanced._vars.queryDefinitions );
				
				if( builtQueries.indexOf( type ) !== -1 ){
					
					var returnConstructor = function( dataObject ){
						
						var dataObjectLength = Object.getOwnPropertyNames( dataObject ).length;
						var isSingleObject = dataObjectLength === 1;
						var isAvailable = function( number ){
							var result;	
							typeof dataObject[number][scope]['evidence_unavailable'] === 'undefined' ?
								result = true :
								result = false;
							
							if( result === false ) prefillString += "n/a";
							
							return result;
							
						}
						
						var prefillString = "";
						
						switch( type ){
							case 'income':
								
									_engine.debug.warn('income prefill is in need of definition');
								
								break;
							case 'address':
								
								if( isSingleObject ){
									
									if( isAvailable('0') ){
									
										result = dataObject[0][scope];
										
										if( result.apt_suite != "" ) prefillString += result.apt_suite + ", "; 
										if( result.street_1 != "" ) prefillString += result.street_1 + ", "; 
										if( result.street_2 != "" ) prefillString += result.street_2 + ", "; 
										if( result.city != "" ) prefillString += result.city + ", "; 
										if( result.state != "" ) prefillString += result.state + ", "; 
										if( result.zip != "" ) prefillString += result.zip; 
										
									}
									
								} else if (dataObject.length > 1) {
									
									_engine.debug.info("NEED LOGIC FOR MULTIPLE ADDRESSES");
									
								}
								
								break;
								
							case 'service agency':
								
								if( isSingleObject ){
									
									if( isAvailable('0') ){
							
										result = dataObject[0][scope];
										
										if( result[0] != "" ) prefillString += result[0];
									
									}
									
								} else if (dataObject.length > 1) {
									
									_engine.debug.info("NEED LOGIC FOR MULTIPLE ADDRESSES");
									
								}
								
								break;
								
							default:
								break;
						}
						
						if(typeof callback === 'function') callback( prefillString );
					
					}
					
					_engine.storage.prefillCache.checkPrefillCache( type, function( evidenceFromCacheObj ){

						if( typeof evidenceFromCacheObj === 'undefined' ){
						
							_engine.debug.info(`Obtaining result set from via data query for request type: ${ type }`);
							
							_engine.tools.customApi.evidence.queryAndCache( type, function(results){
							
								returnConstructor( results );
							
							});
						
						} else {
						
							_engine.debug.info(`Obtaining result set from internal cache for request type: ${ type }`);
						
							returnConstructor( evidenceFromCacheObj );
						
						}
						
					});

				} else {
					
					_engine.debug.error(`No query return strategy exists for request type of: ${ type }. Correct type or build new strategy.`);
					
				}
				
			}
		},
		
		/* [UI] Edits the text in the custom notification window
		/********************************************************************/
		
		topNotification: function( msg ){
			
			//Create Element
			var _span = $('<span>',{'html':msg});
			//Swap content
			$('div.center-box').html( _span );
			
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
		
		/* [Events] Runs on program startup
		/********************************************************************/
		
		_startUp: function() {
			
			if( !_engine.storage.engineStatus.get() ){
				
				var _t = ["Script Library: Loading.","Script Library: Loading..","Script Library: Loading...","Script Library: Loading&nbsp...","Script Library: Loading&nbsp;&nbsp...","Script Library: Loading&nbsp;&nbsp;&nbsp;...","Script Library: Loading&nbsp;&nbsp;&nbsp;&nbsp;..","Script Library: Loading&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.","Script Library: Loading"];

				var _ele = document.getElementsByClassName('center-box')[0];

				_ele.innerHTML = "";

				var _span = document.createElement('span');

				_span.id = "mns-scripts-loading";

				_ele.appendChild( _span );

				var _loadSpan = document.getElementById("mns-scripts-loading");
					
				var counter = 0;
					
				var _loading = setInterval(function(){

					_loadSpan.innerHTML = _t[counter];
					
					++counter;
					
					if(counter == _t.length){
						counter = 0;
					}

				}, _engine.advanced._vars.timeout);

				_loading;
			
				setTimeout(function(){
					
					_engine.tools.loadAddons.run( _engine.tools.loadAddons.libraries );
					
					/* Loaded
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
					
					
					clearInterval( _loading );
					
					if( _engine.beta.betaURL() ){
						
						_engine.beta.enableBeta();
						
					} else {
						
						_engine.beta.enableRelease();
						
					}
					
					//Build out menu
					_engine.ui.scriptMenu.refresh();
					
					_engine.storage.engineStatus.set( true );
				
				},2000);
			
			} else {
				
				_engine.tools.loadAddons.run( _engine.tools.loadAddons.libraries );
				
				//Build menu again if repo is updated
				_engine.ui.scriptMenu.refresh();
				
			}

		},
		
		/* [Events] Converts click events into useable sets of functions
		/********************************************************************/
		
		handleClickEvent: function( e ){
			
			var eventLog = e.split('/');
			
			$.each(eventLog,function(k,v){
				
				var _f = v.substring( 0, v.lastIndexOf("[") )
				if( v.indexOf("(") == -1 ){
					var _c = v.substring( v.lastIndexOf("[")+1,v.lastIndexOf("]") );
					var _sc = null;
				} else
				{
					var _c = v.substring( v.lastIndexOf("[")+1,v.lastIndexOf("(") );
					var _sc = v.substring( v.lastIndexOf("(")+1,v.lastIndexOf(")") );
				}

					/* Function Tree */
					
				switch( _f ){
						
						/* Navigation Functions */
					case "navigation":
						switch( _c ){
							case "hcr":
								_engine.navigation.mainTabs.mainTabNavi('hcr');
								break;
								
							case "":
								break;
							default:
								_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
								break;
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
			
			
		}
	},
	
	//*************//
	//* Case Work *//
	//*************//
	
	caseWork: {
		
		/* [Case Work] Contains feature set for writing case notes
		/********************************************************************/
		
		note: {
			write: function( _note ){
				
				_engine.domTools.test.hcrTabActiveIsIC(function( result ){
					
					if( result ){
					
						// Define extra vars
						var _noteLocation = null;
						var _modalType = null;
						
						// Grab an array of elements that are defined in the menu as available case notes
						var _noteArray = $('#script-launcher > ul > li:contains("Case Notes") ul li');
						
						// Create the container array to compare against
						var _validNotes = [];

						// Iterate over element array
						$.each(_noteArray,function(k,v){
							
							// Grab the text only without the "..." from the case note elements and push to second array
							_validNotes.push( $( v ).text().replace(/[.]/g,"").toLowerCase() );

						});

						// Check if the requested case note type is in the list of valid case notes
						if( $.inArray( _note.toLowerCase(), _validNotes) > -1 ){
							
							// If its a valid request set the modal type to case notes
							_modalType = "case notes";
							
							// Set the location to the dir that stores the html
							_noteLocation = _modalType + "/" + _note.toLowerCase() + ".html";
							
						}

						// If the request was invalid then error out the request as invalid
						if( _noteLocation != null ){
							
							// Gathers HTML for view and stores to local storage
							_engine.advanced.getView( _noteLocation );

							// Check every 100ms for info in local storage.
							
							var _c = 0;
							
							var buildFrame = setInterval(function(){
								if(_c <= _engine.advanced._vars.iterations){
									
									if( _engine.storage.html.get() != false ){
										// Gather html for modal
										var _html = _engine.storage.html.get();
										
										if( $('<div>', {'html': _engine.storage.html.get() }).find('div').hasClass('mns-error-modal') ){
											_note = "Error";
											_modalType = "error";
										}
										
										// Clear html storage
										_engine.storage.html.clear();
										
										//Build modal
										_engine.ui.modal.build( _note, _html, _modalType );
										
										clearInterval( buildFrame );
										
									}
									
									_c++;
									
								} else {
									_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( _note )]: Build frame html timed out.");	
									_engine.storage.html.clear();
									clearInterval( buildFrame );
								}
							}, _engine.advanced._vars.timeout);
							
							buildFrame;

						} else {
							_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( note )]: A valid note type must be specified to run this command.")
						}
					
					} else {
						
						_engine.advanced.getView( "error/case note incorrect location.html" );

						// Check every 100ms for info in local storage.
						
						var _c = 0;
						
						var buildFrame = setInterval(function(){
							
							if(_c <= _engine.advanced._vars.iterations){
								
								if( _engine.storage.html.get() != false ){
									// Gather html for modal
									var _html = _engine.storage.html.get();
									
									// Clear html storage
									_engine.storage.html.clear();
									
									//Build modal
									_engine.ui.modal.build( "Case Note Error - Incorrect Launch Screen", _html, "error" );
									
									clearInterval( buildFrame );
									
								}
								
								_c++;
								
							} else {
								_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( _note )]: Build frame html timed out.");	
								_engine.storage.html.clear();
								clearInterval( buildFrame );
							}
						}, _engine.advanced._vars.timeout);
						
						buildFrame;
						
					}
				
				});
				
			},			
			_completeNote: function(){
				
				_engine.navigation.icTabs.icTabNavi("contact",function( contactFrame ){
					
					$( contactFrame ).find('a[title="New"]')[0].click();
					
					_engine.debug.info("- * Clicked new case note");
					
					//OPEN MODAL COUNTER
					_count1 = 0;

					var _openModal = setInterval(function(){
						
						//Setup loop to test for the modal being open
						
						_engine.debug.info("- * Attempting to target modal window [ attempt: "+ _count1 +" ]");
						
						if(_count1 <= _engine.advanced._vars.iterations){
							
							// _openModal interval has not timed out
							
							if(_engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() != false){
								
								_engine.debug.info("- * Targeted modal");
								
								//Gather Params now that window is open
								
								//Start param gather counter
								_count2 = 0;

								var _gatherParams = setInterval(function(){
									
									//Setup loop to gather modal params
									
									if( _count2 <= _engine.advanced._vars.iterations ){
										
										_engine.debug.info("- * Attempting to gather params [ attempt: "+ _count2 +" ]");
										
										if( _engine.storage.modalParams.get() != false ){
											
											//Perform actions on the stored params
											
											_engine.debug.info("- * Params Gathered");
											
											$.each( _engine.storage.modalParams.get(),function(k,v){
												if( v.descriptor.toLowerCase() == "subject" ){
													
													_engine.debug.info("- * SUBJECT: [ " + v.value + " ]");
													
													_engine.domTools.set.icFrame.contactTab.caseNoteModal.subject( v.value );
													
												} else {
													
													var line = "";
													
													if( v.descriptor != "" && v.value == "" ){
														line += v.descriptor;
													} else if( v.descriptor == "" && v.value != "" ){
														line += v.value;
													} else if( v.descriptor != "" && v.value != "" ){
														line += v.descriptor + ": " + v.value;
													}
													
													_engine.debug.info("- * BODY: [ " + line + " ]");
													
													_engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine( line );
													
												}
												
											});
											
											_engine.debug.info("- * Clearing params");
											
											_engine.storage.modalParams.clear();
											
											clearInterval( _gatherParams );
										
										}
										
										++_count2;
										
									} else {
										
										_engine.debug.info("- * Fail Reason: Error [_engine.caseWork.note._completeNote()]: Failed to gather params.");							
										clearInterval( _gatherParams );
										
									}

								}, _engine.advanced._vars.timeout);

								_gatherParams;
								
								//Clear wrapping interval to escape it
								clearInterval( _openModal );
								
							}
							
							//Modal window is not yet open advance counter
							
							++_count1;
							
						} else {
							
							//_openModal Interval has timed out clear interval
							
							_engine.debug.error("- * Fail Reason: [_engine.caseWork.note._completeNote()]: Failed to open or target case note modal. Request timed out.");							
							clearInterval( _openModal );
							
						}
							
					}, _engine.advanced._vars.timeout);

					_openModal;
					
				});
				
			}
		},
		
		/* [Case Work] Performs a dynamic search type using a single input
		/********************************************************************/
		
		unifiedSearch: {

			start: function(){
				
				_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
				
					var _modalType = "queries";
					var _title = "Unified Search Query";
					
					var _url = _engine.advanced.baseUrl();
					_url += "views/queries/unified search.html"
					
					_engine.advanced.getView( _url );
					
					// Check every 100ms for info in local storage. Timeout after 2000ms.
						
					var _c = 0;
					
					var buildFrame = setInterval(function(){
						if(_c <= _engine.advanced._vars.iterations){
							
							if( _engine.storage.html.get() != false ){
								// Gather html for modal
								var _html = _engine.storage.html.get();
								
								if( $('<div>', {'html': _html }).find('div').hasClass('mns-error-modal') ){
									_title = "Error";
									_modalType = "error";
								}
								
								// Clear html storage
								_engine.storage.html.clear();
								
								//Build modal
								_engine.ui.modal.build( _title, _html, _modalType );
								
								clearInterval( buildFrame );
								
							}
							
							_c++;
							
						} else {
							_engine.debug.error("- * Fail Reason: [ _engine.caseWork.unifiedSearch.start() ]: Build frame html timed out.");	
							_engine.storage.html.clear();
							clearInterval( buildFrame );
						}
					}, _engine.advanced._vars.timeout);
					
					buildFrame;
				
				});
				
			},

			_finish: function(){
				
				//Start param gather counter
				_c1 = 0;

				var _gatherParams = setInterval(function(){
					
					//Setup loop to gather modal params
					
					if( _c1 <= _engine.advanced._vars.iterations ){
						
						_engine.debug.info("- * Attempting to gather params [ attempt: "+ _c1 +" ]");
						
						if( _engine.storage.modalParams.get() != false ){
							
							//Perform actions on the stored params
							
							_engine.debug.info("- * Params Gathered");
							
							$.each( _engine.storage.modalParams.get(),function(k,v){
								
									//Remove Special Characters and Trim
								var _input = v.value.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g,'').trim();
								
								if( $.isNumeric( _input ) ){
									
									if( _input.length == 8 ){
										
										// Case Number
										
										var _tabToClose = _engine.domTools.get.hcrTabListTypeQuery("Case Search");
										_engine.tools.closeTabHCR( _tabToClose );
										
										_engine.search._case();
										
										_c2 = 0;
										
										var _openSearch = setInterval(function(){
											_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
											if(_c2 <= _engine.advanced._vars.iterations){
												if( _engine.domTools.test.searches.windowLoaded() ){
													
													_engine.domTools.set.searches.fieldFill("Reference",_input);

													_engine.tools.selectSearchResult();
													
													clearInterval( _openSearch );
												}
												++_c2;
											} else {
												clearInterval( _openSearch );
											}
										}, _engine.advanced._vars.timeout);
										_openSearch;

									} else if ( _input.length == 9 || _input.length == 10 ){
										// SSN or MNS ID
										
										var _tabToClose = _engine.domTools.get.hcrTabListTypeQuery("Person Search");
										_engine.tools.closeTabHCR( _tabToClose );
										
										_engine.search._person();
										
										_c2 = 0;
										
										var _openSearch = setInterval(function(){
											_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
											if(_c2 <= _engine.advanced._vars.iterations){
												if( _engine.domTools.test.searches.windowLoaded() ){
													
													_engine.domTools.set.searches.fieldFill("Reference",_input);
													
													_engine.tools.selectSearchResult();											
													
													clearInterval( _openSearch );
												}
												++_c2;
											} else {
												clearInterval( _openSearch );
											}
										}, _engine.advanced._vars.timeout);
										_openSearch;
										
									} else {
										// Unknown
										
									}
									
								} else {
									// Name
									
									_engine.search._person();
									
									var _name = _input.split(" ");
									
									if( _name.length > 1 ){
										
										_c2 = 0;
										
										var _openSearch = setInterval(function(){
											_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
											if(_c2 <= _engine.advanced._vars.iterations){
												if( _engine.domTools.test.searches.windowLoaded() ){
													
													_engine.domTools.set.searches.fieldFill("First Name",_name[0]);
										
													_engine.domTools.set.searches.fieldFill("Last Name",_name[1]);
													
													_engine.tools.selectSearchResult();
													
													clearInterval( _openSearch );
												}
												++_c2;
											} else {
												clearInterval( _openSearch );
											}
										}, _engine.advanced._vars.timeout);
										_openSearch;
										
									} else {
										
										_c2 = 0;
										
										var _openSearch = setInterval(function(){
											_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
											if(_c2 <= _engine.advanced._vars.iterations){
												if( _engine.domTools.test.searches.windowLoaded() ){
													
													_engine.domTools.set.searches.fieldFill("First Name",_name[0]);
													
													clearInterval( _openSearch );
												}
												++_c2;
											} else {
												clearInterval( _openSearch );
											}
										}, _engine.advanced._vars.timeout);
										_openSearch;
										
									}
									
								}
								
							});
							
							_engine.debug.info("- * Clearing params");
							
							_engine.storage.modalParams.clear();
							
							clearInterval( _gatherParams );
						
						}
						
						++_c1;
						
					} else {
						
						_engine.debug.info("- * Fail Reason: Error [_engine.caseWork.note._completeNote()]: Failed to gather params.");							
						clearInterval( _gatherParams );
						
					}

				}, _engine.advanced._vars.timeout);

				_gatherParams;
				
				
			}
			
		},
		/* [Case Work] Opens a modal to select from currently open cases
		/********************************************************************/
		
		caseSelection: function(){
			
			_engine.debug.info("- * [ _engine.caseWork.caseSelection() ] Starting integrated case selection.");
			_engine.debug.error("- * [ _engine.caseWork.caseSelection() ] Case selection feature is in development. Please manually select an IC.");
			
		}
		
	},
	
	//*************//
	//*   Tools   *//
	//*************//
	
	tools: {
		
		/* [Tools] Custom Api
		/********************************************************************/
		
		customApi: {
			
			evidence: {
				
				queryAndCache: function(type, callback){
				
					_engine.tools.customApi.evidence.parsedQuery( type ,function( results, type ){

						var evidenceObject = {};
						
						evidenceObject[type] = results;
						
						_engine.storage.prefillCache.add( evidenceObject );
						
						if(typeof callback === 'function') callback( results );
						else return results;
						
					});		
					
				},
				
				parsedQuery: function(type, callback){

					_engine.tools.customApi.evidence._evidenceApiRaw( type, function( evidenceInputObj, queryType ){
						
						var evidenceContainer = evidenceInputObj[Object.getOwnPropertyNames( evidenceInputObj )[0]];
						
						var masterObject = {};
						
						count = 0;
						
						var parsedEvidence = {};
						
						$.each( evidenceContainer, function( item, evidenceObj ){
						
							$.each( evidenceObj, function( scope, contentObj ){
								
								var jsonString = "";
								
								var unassigned = 0;
								
								if( scope === 'current' ) parsedEvidence = {};
								
								if( typeof contentObj.content !== 'undefined' ){
								
									$.each( $( contentObj.content ).find('div table th.label'), function(k,v){
										
										var info = $( v )[0];
										
										var key = info.innerText.trim().toLowerCase().replace(/ |\//g,"_");
										var value = $( info ).next()[0].innerText.trim();
										
										if( key !== "" || value !== "" ){
											if( key === "" ){
												key = unassigned;
												unassigned++;												
											}
											
											jsonString += '"' + key + '":"' + value + '",'
											
										}
										
									});
								
								} else {
									
									jsonString = '"evidence_unavailable":"undefined",'
									
								}
								
								jsonString = jsonString.substring(0,jsonString.length-1);
								
								parsedEvidence[ scope ] = $.parseJSON( "{" + jsonString + "}" );
								
								if(scope === 'history'){
									masterObject[count] = parsedEvidence;
									count++;
								}
								
							});
							
							if(typeof callback === 'function') callback( masterObject, type );
							
						});
						
					});
					
				},
				
				_evidenceApiRaw: function( type, callback ){
					
					/* Grab Initial Url for data type */
					_engine.tools.customApi.evidence._evidenceQueryUrlConstructor( type, function( initUrl ){
						/* Axaj Evidence Page */
						_engine.tools.customApi.evidence._ajaxAndReturnIframeContentDiv( initUrl, function( evidenceItemObj ){
							/* Obtain Urls of evidence summarys in evidence page */
							_engine.tools.customApi.evidence._getSubQueries( evidenceItemObj, function( evidenceDataWrapperUrls ){
								/* Query Evidence Summarys */
								_engine.tools.customApi.evidence._ajaxAndReturnIframeContentDiv( evidenceDataWrapperUrls, function( evidenceDataWrapperObj ){
									/* Obtain Urls of current/past evidence details */
									_engine.tools.customApi.evidence._getSubQueries( evidenceDataWrapperObj, function( evidenceDataUrls ){
										/* Query Evidence Details for current/history */
										_engine.tools.customApi.evidence._ajaxAndReturnIframeContentDiv( evidenceDataUrls, function( evidenceDataObj ){
											
											if( typeof callback === 'function' ) callback( evidenceDataObj, type );
											
										});
									});
								});
							});
						});
					});
					
				},
				
				_ajaxAndReturnIframeContentDiv: function( reqObj, callback ){
					
					var ajaxObj = function( inputObj ){
						
						var ajaxReturn = {};
						
						$.each(inputObj,function(scope,data){
							
							if( typeof data.url !== 'undefined' ){
							
								$.ajax({
									url: data.url,
									async: false,
									success: function( data ){
										var parsed = $.parseHTML( data );
										$.each(parsed,function(keyParsed,valueParsed){
											if( $(valueParsed).attr('id') === 'content' ){
												ajaxReturn[scope] = {
													"content" : valueParsed
												}
											}
										});
									}
								});
							
							} else {
								
								ajaxReturn[scope] = {
									"content" : undefined
								}
								
							}
							
						});
						
						return ajaxReturn;
						
					}
					
					var returnObj = {};
					
					var deepObj = false;
					
					var requestScope = Object.getOwnPropertyNames( reqObj )[0];
				
					var deepScope = ["evidenceData","evidenceItem"];
					
					if( deepScope.indexOf( requestScope ) > -1 ) deepObj = true;
					
					/* Deep Object */
					if( deepObj ){
						if( requestScope === 'evidenceItem' ){	
						
							returnObj[requestScope] = ajaxObj( reqObj[requestScope] );
							
						} else {
							
							returnObj[requestScope] = {};
							
							$.each(reqObj[requestScope],function(k,v){
								
								var result = ajaxObj( v );
								
								returnObj[requestScope][k] = result;
								
							});
							
						}
					} 
					/* Shallow Object */
					else returnObj = ajaxObj( reqObj );
					
					if( typeof callback === 'function' ) callback( returnObj );
					else return returnObj;
					
				},
				
				_getSubQueries: function( reqObj, callback ){
					
					var processSubQueries = function( inputObj, deepObj ){
						
						var objClassArray = $( inputObj[Object.getOwnPropertyNames( inputObj )[0]].content ).find('table').attr('class').split(" ");
							
						$.each(objClassArray,function(key,objClass){
							
							if(objClass.indexOf("list-id-Evidence") > -1){
								
								var scopeid = objClass.split("_")[1].split("-")[0];
								
								if( scopeid === 'workspaceTypeList' ) returnScope = "evidenceItem";
								if( scopeid === 'listEvdInstanceChanges' ) returnScope = "evidenceData";
								
							}
							
						});
						
						subQueryReturn = {};
						subQueryReturn[returnScope] = {};
						
						$.each(inputObj,function( scope, contentObj ){

							var queryElements = $( contentObj.content ).find('table tbody tr, table tbody script');

							$.each(queryElements,function(key, queryElement){
								
								if( $( queryElement ).hasClass('empty-row') && key === 0 ){
									
									return false;
									
								} else {
									
									if( $( queryElement ).is('script') ){
										
										var parsedTable = $('<tbody>',{ html: $.parseHTML( $( queryElement )[0].innerHTML ) })[0];
										
										if( returnScope === 'evidenceItem' ){
											
											var parsedRows = $( parsedTable ).find('.list-details-row');									
											
											var count = 0;
											
											$.each( parsedRows, function( key, parsedRow ){
												
												var url = "en_us/" + $( parsedRow ).find('div').attr('url');
												
												subQueryReturn[returnScope][count] = {
													"url": url								
												}
												
												count++;
												
											});
											
										}
										
										if( returnScope === "evidenceData" ){
											
											var parsedRows = $( parsedTable ).find('tr');
											
											var currentUrl, pastObj, pastUrl;
											var pastEnd = "";

											$.each( parsedRows, function( key, row ){
												
												if( !$( row ).hasClass('list-details-row') ){
													
													var relevantDateItem = $( row ).find('td')[4];
													
													var relevantDateEnd = $( relevantDateItem )[0].innerText.replace(/ /g,"").split("-")[1];
													
														// Setup Current Evidence
													if(relevantDateEnd === ""){
														
														currentUrl = "en_us/" + $( parsedRows[key+1] ).find('div').attr('url');
														
													}
													
													if(relevantDateEnd !== ""){
														
														if( pastEnd === "" ){
															
															pastEnd = relevantDateEnd;
															pastObj = parsedRows[key+1];
															
														} else {
															
															var pastDate = new Date( pastEnd ).getTime();
															var testDate =  new Date( relevantDateEnd ).getTime();
															
															if( pastDate < testDate ){
																
																pastEnd = relevantDateEnd;
																pastObj = parsedRows[key+1];
																
															}
															
														}
														
													}
													
												}
												
											});
											
											if( pastEnd === '' ) pastUrl = undefined;
											else pastUrl = "en_us/" + $( pastObj ).find('div').attr('url');
											
											subQueryReturn[returnScope][scope] = {
												"current": {
													url: currentUrl
												},
												"history": {
													url: pastUrl
												}
											}
											
										}
										
									}
									
								}
								
								
								
							});
							
						});
						
						return subQueryReturn;
						
					}
					
					returnObj = {};
					
					var deepObj = false;
					
					var requestScope = Object.getOwnPropertyNames( reqObj )[0];
					
					var deepScope = ["evidenceData","evidenceItem"];
					
					if( deepScope.indexOf( requestScope ) > -1 ) deepObj = true;
					
					/* Deep Object */
					if( deepObj ) returnObj = processSubQueries( reqObj[requestScope], deepObj );
					/* Shallow Object */
					else returnObj = processSubQueries( reqObj, deepObj );
					
					if( typeof callback === 'function' ) callback( returnObj );
					else return returnObj;
				
				},
				_evidenceQueryUrlConstructor: function( type, callback ){
					
					var root = "en_US/Evidence_workspaceTypeListPage.do?";
					
					var curamObject = _engine.storage._curamCreatedObject.get();
					
					var caseID = curamObject.tabSignature.split("|")[1];
					
					var oc3tx = "o3ctx=" + curamObject.tabContent.parameters.o3ctx;
					
					var evidenceType = _engine.advanced._vars.queryDefinitions;
					
					var objReturn = {};
					
					if( _engine.domTools.test.hcrTabType() === "Integrated Case" ){

						var reqUrl = root + oc3tx + "&" + caseID + "&" + evidenceType[ type ];
						
						if( typeof evidenceType[ type ] !== 'undefined' ){
							
							_engine.debug.info(`Your generated request url is valid. This may be used to request results.`);
							
							objReturn = {
								"init" : {
									"url": reqUrl
								}
							};
							
							if( typeof callback === 'function' ) callback( objReturn );
							else return objReturn;
						
						} else {
							
							_engine.debug.info(`Your generated request url is invalid. Please define type of: ${ type }.`);
						
							return false;
							
						}
						
					} else if ( _engine.domTools.test.hcrTabType().split("|")[0] === "Evidence" ){
						
						type = _engine.domTools.test.hcrTabType().split("|")[1].toLowerCase();
						
						var srcUrl = $('iframe[title="Content Panel - Evidence"]').attr('src');
						
						if( typeof evidenceType[ type ] !== 'undefined' ){
						
							var reqUrl = root + oc3tx + "&" + caseID + "&" + evidenceType[ type ];

							if( srcUrl === reqUrl ) {
								
								_engine.debug.info(`Your generated request url is valid. This may be used to request results.`);
								
								_engine.debug.info(`Generated: ${reqUrl} | Sourced: ${srcUrl}`);
								
								return reqUrl;
								
							} else {
								
								_engine.debug.warn(`Your generated request url is invalid. Please Verify.`);
								
								_engine.debug.warn(`Generated: ${reqUrl} | Sourced: ${srcUrl}`);
								
								return false;
								
							}
						
						} else {
						
							var evidenceString = srcUrl.split('&');
							
							var evidenceValidator = "";
							
							$.each(evidenceString,function(k,v){
								if( v.indexOf("evidenceType") > -1 ){
									
									evidenceValidator += v;
									
								}
							});
							
							_engine.debug.warn(`Type of: [ '${ type }' ] is undefined. Define using: ${ evidenceValidator }`);
							
							return false;
							
						}
						
					}
					
				}
				
			}
			
			
		},
		
		/* [Tools] Closes currently open tab
		/********************************************************************/
		
		closeTabHCR: function( _tab ){
			
			typeof _tab == 'undefined' ? _tab = _engine.domTools.get.hcrTabActive() : _tab = _tab[0];
			
			$( _tab ).find('span.dijitTabCloseButton').click();
			
		},
		
		/* [Tools] Chooses a specified result on the page
		/********************************************************************/
	
		selectSearchResult: function(){
			
			_engine.domTools.get.searches.advancedQuery(".action-set a:contains('Search')")[0].click();
			
			var screenType = _engine.domTools.test.hcrTabType();
			
			_count = 0;
			
			_zeroResultCounter = 0;
			
			var _loadWindow = setInterval(function(){
				
				_engine.debug.info("- * Attempting to load results screen [ attempt: "+ _count +" ]");
				
				if( _count <= _engine.advanced._vars.iterations ){
					
					var _results = _engine.domTools.get.searches.searchResultsQuery();
					
					if( _engine.domTools.test.searches.windowLoaded() && _results.length > 0 ){
						
						if( screenType == "Case Search" || screenType == "Person Search" ){
								
							if( _results.length == 1 ){
								
								var singleResult = _results.find('td:nth-child(2) a')[0];
								
								if( typeof singleResult === 'object' ){
								
									singleResult.click();
								
									_tabToClose = _engine.domTools.get.hcrTabListTypeQuery( screenType );
								
									_engine.tools.closeTabHCR( _tabToClose );
									
									clearInterval( _loadWindow );
								
								} else {
									
									_engine.debug.info(`- * [ _engine.tools.selectSearchResult() ] Found zero results. Checking again in ${_engine.advanced._vars.timeout}ms. Attempt: ${_zeroResultCounter}`);
									
									if( _zeroResultCounter >= _engine.advanced._vars.iterations ){
										clearInterval( _loadWindow );
									}
									
									_zeroResultCounter++;
									
								}
								
							} else {
								
								_engine.debug.info("- * [ _engine.tools.selectSearchResult() ] Your search returned more than one result. Please manually select.");
									
								clearInterval( _loadWindow );
								
							}
							
						} else {
							
							_engine.debug.error("- * [ _engine.tools.selectSearchResult() ] You must be on a search page to use this tool.");

							return false;
							
						}

					}
					
					++_count;
					
				} else {
					
					clearInterval( _loadWindow );
					
				}
			}, _engine.advanced._vars.timeout);
			
			_loadWindow;
			
		},
		
		/* [Tools] Waits for the requested element to be available.
		/********************************************************************/
		
		waitOnLoad: function( _input, callback ){
			
			var count = 0;
			
			var timeout = setInterval(function(){
				
				if( typeof _input[0] == 'undefined' ){
				
					_node = _input.node;
					_find = _input.find;
					
					_element = $( _node ).find( _find )[0];
					
				} else {
					
					_element = _input;
					
				}
				
				if( count <= _engine.advanced._vars.iterations ){
					
					if( typeof _element != 'undefined' ){
						
						//Element found - continue script
						
						if( typeof callback == 'function' ){
							callback( $(_element)[0] );
						}
						
						clearInterval( timeout );
						
					} else {
						
						//Element not found, wait and check again.
						++count;
						
					}					
					
				} else {
					
					//Script timed out
					clearInterval( timeout );
					
				}
				
			}, _engine.advanced._vars.timeout);
			
			timeout;
			
		},
		
		loadAddons: {

			run: function( addons ){
				
				$.each( addons, function(type, libraries){

					
					$.each( libraries,function( library, url ){
						
						switch( type ){

							case "css":
								
								$.each($('head link[href]'),function(key,linkObj){
			
									if( $(this).attr('href').indexOf( library ) !== -1 ) $( this ).remove();
									
								});
								
								var lib = $('<link>',{ href : url, 'rel' : 'stylesheet', 'type' : 'text/css'});
								$('link[data-scriptengine]').after( lib );
								
								break;
							case "js":
								
								
								$.each($('head script[src]'),function(key,linkObj){
				
									if( $(this).attr('src').indexOf( library ) !== -1 ) $( this ).remove();
									
								});
								
								var lib = $('<script>',{ src : url });
								$('script[data-scriptengine]').after( lib );
								
								break;
							default:
								break;
						}
						
					});
				});
				
			},
			libraries: {
				
				js: {
					
					"jqueryui": "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"
					
				},
				
				css: {
					
					"jqueryui": "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/redmond/jquery-ui.css"
					
				}
				
			}

		}
	
	},
	
	//************//
	//* Advanced *//
	//************//
	
	advanced: {
		
		/* [Advanced] Returns the needed base URL for ajax requests 
		/********************************************************************/
		
		baseUrl: function(){
			
			var _commit = _engine.advanced.currentCommit();
			
			var _url = "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/" + _commit + "/";
			
			return _url;
			
		},
		
		/* [Advanced] Returns the entensions URL
		/********************************************************************/
		
		extensionURL: function(){
			return $('script[data-scriptengine]').attr('data-chromeurl');
		},
		
		/* [Advanced] Returns the ID of the extension
		/********************************************************************/
		
		extensionID: function(){
			return $('script[data-scriptengine]').attr('data-extensionID');
		},
		
		/* [Advanced] Returns the current Beta Repo Commit Sha
		/********************************************************************/
		
		betaCommit: function(){
			return $('script[data-scriptengine]').attr('data-beta');
		},
		
		/* [Advanced] Returns the current Master Repo Commit Sha
		/********************************************************************/
		
		masterCommit: function(){
			return $('script[data-scriptengine]').attr('data-master');
		},
		
		/* [Advanced] Returns the commit that the engine is currently using
		/********************************************************************/
		
		currentCommit: function(){
			if( _engine.storage.betaStatus.get() ){
				return _engine.advanced.betaCommit();
			} else {
				return _engine.advanced.masterCommit();
			}
		},
		
		/* [Advanced] ajax request to grab html template for modals
		/********************************************************************/
		
		getView: function( _f ){

			var _html = null;
			
			var _c = _engine.advanced.currentCommit();
			
			chrome.runtime.sendMessage( _engine.advanced.extensionID(), { file: _f, commit: _c },
				function( response ){
					
					if( response == null ){
						
						_engine.advanced.getView( "error/error.html" );
						
					} else {
						
						_engine.storage.html.set( response );
						
					}
					
				}
			);
			
			return;
			
		},
		
		/* [Advanced] Universal veriables
		/********************************************************************/
		
		_vars: {
			timeout: 50,
			iterations: 80,
			iterationsLong: 200,
			queryDefinitions: {
				'address': 'evidenceType=DET0026039',
				'income': 'evidenceType=DET0026030',
				'service agency': 'evidenceType=DET0001029',
				'financially responsible agency': 'evidenceType=DET0001282'
			}
		}
	},
	
	//*************//
	//*  Storage  *//
	//*************//
	
	storage: {
		
		/* [Storage] HTML
		/********************************************************************/
		
		html: {
			set: function( _html ){
				window.localStorage.setItem( "mnsEngine_html", _html );
			},
			get: function(){
				if(typeof window.localStorage.mnsEngine_html != 'undefined'){
					return $.parseHTML( window.localStorage.mnsEngine_html );
				} else {
					return false;
				}
			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_html" );
			}
		},
		
		/* [Storage] Modal Parameters
		/********************************************************************/
		
		modalParams: {
			set: function( _params ){
				
				var encodedParams = encodeURIComponent( _params );
				
				window.localStorage.setItem( "mnsEngine_modalParams", encodedParams );
				
			},
			get: function(){
				if(typeof window.localStorage.mnsEngine_modalParams != 'undefined'){
					
					var decodedParams = decodeURIComponent( window.localStorage.mnsEngine_modalParams );
					
					return $.parseJSON( decodedParams );
				} else {
					return false;
				}
			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_modalParams" );
			}
		},
		
		/* [Storage] Engine Status
		/********************************************************************/
		
		engineStatus: {
			set: function( _status ){
				
				window.localStorage.setItem( "mnsEngine_Status", _status );
				
			},
			get: function(){
					
					return String( window.localStorage.mnsEngine_Status.toLowerCase() ) == "true";

			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_Status" );
			}
		},
		
		/* [Storage] Beta Status
		/********************************************************************/
		
		betaStatus: {
			set: function( _status ){
				
				window.localStorage.setItem( "mnsEngine_betaStatus", _status );
				
			},
			get: function(){
					
				if( typeof window.localStorage.mnsEngine_betaStatus == 'undefined' ){
					_engine.storage.betaStatus.set( false );
				}
				
				return String( window.localStorage.mnsEngine_betaStatus.toLowerCase() ) == "true";

			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_betaStatus" );
			}
		},
		
		/* [Storage] Debug Status
		/********************************************************************/
		
		debugStatus: {
			set: function( _status ){
				
				window.localStorage.setItem( "mnsEngine_debugStatus", _status );
				
			},
			get: function(){
				
				if( typeof window.localStorage.mnsEngine_debugStatus == 'undefined' ){
					_engine.storage.mnsEngine_debugStatus.set( false );
				}
					
				return String( window.localStorage.mnsEngine_debugStatus.toLowerCase() ) == "true";

			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_debugStatus" );
			}
		},
		
		/* [Storage] Prefill Caching
		/********************************************************************/
		
		prefillCache: {
			init: function(){
				
				window.localStorage.setItem( "mnsEngine_prefillCache", '{}' );
				
			},
			add: function( object ){
				
				if( typeof object === 'string' ) object = $.parseJSON( object );

				if( typeof object !== 'undefined' ){
				
					var cacheObject = _engine.storage.prefillCache.get();
					
					var cacheProps = Object.getOwnPropertyNames( cacheObject );
					
					var objectProps = Object.getOwnPropertyNames( object );
					
					$.each(objectProps, function(k,v){

						if( cacheProps.indexOf( v ) !== -1 ) _engine.storage.prefillCache.remove( v );
						
						cacheObject[v] = object[v];
						
					});
					
					_engine.storage.prefillCache._updateCacheInfo( cacheObject );

				} else {
					
					return false;
					
				}
				
			},
			remove: function( type ){
				
				if( typeof type === 'string' ){
					
					var cacheObject = _engine.storage.prefillCache.get();
					var item = cacheObject[ type ];
					
					if( typeof item !== 'undefined' ){
						
						delete cacheObject[ type ];
						
						_engine.storage.prefillCache._updateCacheInfo( cacheObject );
						
						return true;
						
					} else {
						
						return false;
						
					}
					
				} else {
					
					return false;
					
				}
				
			},
			get: function( type ){
				
				if(typeof window.localStorage.mnsEngine_prefillCache === 'undefined'){
					
					_engine.storage.prefillCache.init();
					
				}
				
				var cacheObject = $.parseJSON( decodeURIComponent( window.localStorage.mnsEngine_prefillCache ) );
				
				if( typeof type === 'string' ){
					return cacheObject[type];
				} else {
					return cacheObject;
				}
				
			},
			_updateCacheInfo: function( object ){
				
				if( typeof object === 'object' ) object = JSON.stringify( object );
				
				var encodedObject = encodeURIComponent( object );
				
				window.localStorage.setItem( "mnsEngine_prefillCache", encodedObject );

			},
			clear: function(){
				
				localStorage.removeItem( "mnsEngine_prefillCache" );
				
			},
			checkPrefillCache: function( type, callback ){
				
				var cacheObject = _engine.storage.prefillCache.get();
				
				var cacheProps = Object.getOwnPropertyNames( cacheObject );
				
				if( cacheProps.indexOf( type ) !== -1 ){
					
					if( typeof callback === 'function' ){ callback( cacheObject[ type ] ); }
					else return true;
				
				} else {
					
					if( typeof callback === 'function' ){ callback( undefined ); }
					else return false;
					
				}
			}	
		},			
		_curamCreatedObject: {
			
			get: function(){
				
				return $.parseJSON( $.parseJSON( window.localStorage.__default_curam_selected_tab ) );
				
			}
			
		}
			
	},
	
	//*************//
	//*   Debug   *//
	//*************//
	
	debug: {
		
		/* [Debug] Toggle debuging on/off
		/********************************************************************/
		
		toggle: function(){
			_engine.storage.debugStatus.set( !_engine.storage.debugStatus.get() );
			console.debug("_engine.debug: Debugging status changed to - " + _engine.storage.debugStatus.get() );
		},
		
		/* [Debug] Log message when debug is enabled
		/********************************************************************/
		
		log: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.log("_engine.debug: " + msg);
			}
		},
		
		/* [Debug] Info message when debug is enabled
		/********************************************************************/
		
		info: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.info("_engine.debug: " + msg); 
			}
		},
		
		/* [Debug] Warn message when debug is enabled
		/********************************************************************/
		
		warn: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.warn("_engine.debug: " + msg);
			}
		},
		
		/* [Debug] Error message when debug is enabled
		/********************************************************************/
		
		error: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.error("_engine.debug: " + msg);
			}
		},
		
		/* [Debug] Debug message when debug is enabled
		/********************************************************************/
		
		debug: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.debug("_engine.debug: " + msg);
			}
		}
	},
	
	//************//
	//*   Beta   *//
	//************//
	
	beta: {
		
		/* [Beta] Enable default set of Beta features 
		/********************************************************************/
		
		enableBeta: function(){
			//Enable Debugging
			_engine.storage.debugStatus.set( true );
			//Enable Beta
			_engine.storage.betaStatus.set( true );
			
			var _betaCommit = _engine.advanced.betaCommit();
			
			//Change CSS Repo
			$('link[data-scriptengine]').attr("href", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _betaCommit +"/css/appStyles.css");
			//Change Script Repo
			$('script[data-scriptengine]').attr("src", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _betaCommit +"/js/app.js" );
			
			_engine.storage.prefillCache.clear();
			
			_engine.debug.debug("Beta User Access Enabled. Logging Enabled.");
			
			_engine.ui.topNotification("Script Library: Beta");
			
		},
		
		/* [Beta] Return true/false based on if beta flag is in url
		/********************************************************************/
		
		betaURL: function(){
			var url = window.location.href;
			
			if( url.split("?").length > 1 ){
				
				if( url.split("?")[url.split("?").length-1].toLowerCase() == "beta" ){
					
					return true;
					
				} else {
					
					return false;
					
				}
				
			} else {
				
				return false;
				
			}
			
		},
		
		/* [Beta] Enable default set of Release features 
		/********************************************************************/
		
		enableRelease: function(){
			//Enable Debugging
			_engine.storage.debugStatus.set( false );
			//Enable Beta
			_engine.storage.betaStatus.set( false );
			
			var _masterCommit = _engine.advanced.masterCommit();
			
			//Change CSS Repo
			$('link[data-scriptengine]').attr("href", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _masterCommit +"/css/appStyles.css");
			//Change Script Repo
			$('script[data-scriptengine]').attr("src", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _masterCommit +"/js/app.js" );
			
			_engine.storage.prefillCache.clear();
						
			console.debug("_engine.debug: Release Access Enabled. Logging Disabled.");
			
			_engine.ui.topNotification("Script Library: Release");

		}
	}
}

/* [Program Start] Runs the startup function 
/********************************************************************/

_engine.events._startUp();