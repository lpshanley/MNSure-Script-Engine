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
	
	//***************//
	//* DOM Toolbox *//
	//***************//
	
	domTools: {
		
		/* [DOM Toolbox] Performs logic operations and comparisons on DOM
		/********************************************************************/
		
		test: {
			icFrame: {
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
				
				var _url = _engine.storage.config.get('advanced.baseUrl');
				
				var filePath = "json/";
				
				var version = _engine.storage.config.get('commit.current');
				
				version === 'master' || version === 'beta' ?
					filePath += "script menu.json":
					filePath += "dev script menu.json";
				
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
			/* Runs the callback after all modules have been requested */
			_engine.module.loadRequired(function(){

				_engine.debug.info('All modules have loaded.');

				_engine.tools.loadAddons.run( _engine.tools.loadAddons.config );

				/* Loaded
				/* Scripts Main Button
				========================*/

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

				var version = _engine.storage.config.get('commit.current');

				version === 'master' ?
					_engine.storage.debugStatus.set( false ):
					_engine.storage.debugStatus.set( true );

				_engine.storage.prefillCache.clear();

				_engine.ui.topNotification("Script Library: "+version);

				//Build out menu
				_engine.ui.scriptMenu.refresh();

				clearInterval(jQloaded);

			});
			
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
	//*  Storage  *//
	//*************//
	
	storage: {
		
		_data: {
			encode: function( input ){
				return encodeURIComponent( JSON.stringify( input ) );
			},
			decode: function( input ){
				return $.parseJSON( decodeURIComponent( input ) );
			}
		},
		
		config: {
			get: function( reqString ){
				
				let config = _engine.storage._data.decode( window.localStorage.mnsEngine_Config );
				
				if(typeof reqString === "string"){ 
					
					let reqArray = reqString.split('.');
					
					$.each( reqArray, function(k,v){
						
						typeof config[v] === "undefined" ?
							config = false :
							config = config[v];
						
					});
				}
				
				return config;
				
			},
			set: function( obj ){
				
				let config = _engine.storage.config.get();

				$.extend(true,config,obj);

				window.localStorage.mnsEngine_Config = _engine.storage._data.encode( config );
				
			}
		},
		
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
	
	module: {
		
		/* Allows definition of functions in modular files */
		
		define: function( dir, module ){

			dir = dir.split('/');
			let last = (dir.length - 1);

			let obj = _engine;

			$.each(dir,function(key,value){

				if(typeof obj[value] === 'undefined') obj[value] = {};

				key === last?
					obj[value] = module:
					obj = obj[value];

			});

		},
		
		/* Loads a specified script file */
		
		require: function( module ){

			let baseUrl = _engine.storage.config.get('advanced.baseUrl');

			let req = baseUrl + module;
			
			$.ajax({
				dataType: 'script',
				url: req,
				success: function(){
					
					_engine.module._markLoaded();
					
					let remaining = _engine.storage.config.get('advanced.modules.unloaded');
					
				}
			})
			
			$.getScript( req );

		},
		
		/* Performs loading of all modules declared in the config */
		
		loadRequired( callback, dirArray, moduleArray ){

			let api = 'https://api.github.com/repos/lpshanley/MNSure-Script-Engine/contents/';

			let refParam = "?ref=" + _engine.storage.config.get('commit.current');

			let pathArray = [];

			if(typeof dirArray === 'undefined') dirArray = ['js/modules/'];
			if(typeof moduleArray === 'undefined') moduleArray = [];

			$.each( dirArray, function(key, value){

				let req = api + value;

				if(req.charAt( req.length-1 ) === '/') req = req.substring(0,req.length-1); 

				req += refParam;

				$.ajax({
					async: false,
					dataType: 'json',
					url: req,
					success: function(data){
						$.each(data,function(key,value){

							if( value.type === 'file' ) moduleArray.push( value.path );
							if( value.type === 'dir' ) pathArray.push( value.path );

						});
					}
				});

			});

			if( pathArray.length > 0 ) _engine.module.loadRequired( callback, pathArray, moduleArray  );
			else if ( pathArray.length === 0 ){
				
				console.log( moduleArray );
				console.log( pathArray );
				
				console.log('TEST');
				
				/*
				_engine.module._defineUnloaded( moduleArray.length );
				
				$.each(moduleArray, function(key, module){
					
					_engine.module.require( module );
					
				});
				
				if( typeof callback === 'function'){

					var counter = 0;

					var loadModules = setInterval(function(){
						if( counter < 50 ){

							console.log(counter);
							
							var unloaded = _engine.storage.config.get('advanced.modules.unloaded');
							
							console.log(`Unloaded: ${ unloaded }`);
							
							if (unloaded === 0){

								console.log('starting?');
								callback();
								clearInterval(loadModules);

							}
							
							
							counter++;

						} else {
							clearInterval( loadModules );
						}
					},100);
					loadModules;
				}
			
			*/
			
			}
			
			
		},
		
		/* Set Counter to test that all scripts have loaded */
		
		_defineUnloaded: function( remainder ){
			_engine.storage.config.set({
				advanced: {
					modules: {
						unloaded: remainder
					}
				}
			});
		},
		
		/* Reduce counter as scripts load */
		
		_markLoaded: function(){
			let unloaded = _engine.storage.config.get('advanced.modules.unloaded') - 1;
			_engine.module._defineUnloaded( unloaded );
		}
	}
}

/* [Program Start] Runs the startup function 
/********************************************************************/

_engine.temp = {};
_engine.temp.count = 0;
_engine.temp.jQloaded = setInterval(function(){
	if( _engine.temp.count < 50 ){
		if( typeof $ === 'function' ){
			_engine.events._startUp();
			clearInterval(_engine.temp.jQloaded);
			delete _engine.temp;
		} else {
			_engine.temp.count++;
		}
	} else {
		clearInterval(_engine.temp.jQloaded);
	}
});
_engine.temp.jQloaded;