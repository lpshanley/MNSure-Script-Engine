_engine.module.define('ui/modal',['advanced/generateId', 'storage/nocache', 'caseWord/unifiedSearch', 'debug/info', 'debug/warn', 'debug/error', 'events/persistSession', 'tools/customApi/evidence/queryAndCache', 'storage/prefillCache'],{
	
	_button: function( button, modalId ){
		
		let modal = $('[data-id='+modalId+']');
		let action = $( button )[0].dataset.role;

		let modalParams = _engine.storage.nocache.data.modal[modalId];

		switch( action ){
			case "submit":
				switch( modalParams.role ){
					case 'query':
						if( _engine.ui.modal.validateModal( modalId ) ){
							_engine.ui.modal.storeParams( modalId, function( params ){
								_engine.caseWork.unifiedSearch.finish( modalId, params );
								_engine.ui.modal.destroy( modalId );
							});
						} else {
							_engine.debug.info("- * [ _engine.ui.modal.button( queries ) ]: Invalid modal submission. Correct highlighted fields.");
						}
						break;
					case 'case note':
						if( _engine.ui.modal.validateModal( modalId ) ){
							_engine.ui.modal.storeParams( modalId, function( params ){
								_engine.caseWork.note.completeNote( modalId, params );
								_engine.ui.modal.destroy( modalId );
							});
						} else {
							_engine.debug.info("- * [ _engine.ui.modal.button( case notes ) ]: Invalid modal submission. Correct highlighted fields.");
						}
						break;
					case 'timeout alert':
						_engine.events.persistSession();
						_engine.ui.modal.destroy( modalId );
						break;
					default:
						_engine.debug.warn('Modal role is not a recognized type');
						break;
				}
				break;
			case "close":
				_engine.ui.modal.destroy( modalId );
				break;
			case "":
				break;
			default:
				_engine.debug.error("- * Fail Reason: Modal Error [ _engine.ui.modal.button( _type ) ]: Type error or type not found.");
				break;

		}
		
	},
	
	_changeActiveCluster: function( modalTarget, subjectValue ){
		
		if( _engine.ui.modal.clustersActive( modalTarget ) ){

			var _activeCluster = $('[data-id='+modalTarget+']  span.mns-input-cluster.input-cluster-active');

			if( _activeCluster.length == 1 ){
				$( _activeCluster ).removeClass('input-cluster-active');
			}

			var _clusters = $('[data-id='+modalTarget+'] span.mns-input-cluster');

			$.each(_clusters,function(k,v){

				var _clusterTitle = $(v).attr('data-cluster-title');

				if( _clusterTitle == subjectValue ){

					$( v ).addClass( 'input-cluster-active' );

				}

			});

		}
		
	},
	
	_clustersActive: function( modalID ){
		
		let modal = '[data-id="' + modalID + '"]',
			returnVal = false;
	
		if( $( modal ).length ===  1 && $( modal + ' div.mns-modal-template' ).attr('data-input-clusters') === 'true')
			returnVal = true;

		return returnVal;
		
	},
	
	_prefillFromDataQuery: function( type, callback ){
		
		type = type.toLowerCase();

		var scope = 'current';

		if( type.indexOf("(") !== -1 ){

			scope = type.substring( type.lastIndexOf("(")+1,type.lastIndexOf(")") );
			type = type.substring( 0 ,type.lastIndexOf("(") );

		} else {

			_engine.debug.warn(`No scope defined in prefill call. Defaulting to current.`);

		}

		if( scope !== 'history' ){
			if( scope !== 'current' ){
				_engine.debug.warn(`Invalid use of prefill scope: ${ scope }. Using current instead.`);
				scope = 'current';
			}
		}

		var returnConstructor = function( dataObject ){

			let useObject = {
						current: {},
						history: {}
					}, 
					prefillString = '';

			if( Object.getOwnPropertyNames( dataObject ).length === 1 ){
				/* Use the only piece of evidence available */
				useObject = dataObject[0];
			}
			else if (  Object.getOwnPropertyNames( dataObject ).length > 1  ){
				/* Determine what evidence to use */

				$.each(_engine.storage.nocache.query('caseData.participants'),function(key,participant){
					if( participant.role === 'Primary Client' ){

						let matchedName = participant.name.toLowerCase(),
								useScope = 'current',
								nameField = '0',
								type = 'residential';

						$.each(dataObject,function(key,value){
								// If current is an invalid field set scope to history
							if( typeof value[useScope].evidence_unavailable !== 'undefined' ){ useScope = 'history'; }

							if( typeof value[useScope].evidence_unavailable === 'undefined' ){

								if( value[useScope][nameField].toLowerCase().indexOf( matchedName ) > -1 ){

									if(typeof value[useScope].to !== 'undefined'){

										if(typeof value[useScope].type !== 'undefined'){

											useObject[useScope][value[useScope].type] = value[useScope];

										}
										else {

											useObject[useScope] = value[useScope];

										}

									}

								}

							}

						});

					}
				});
			}
			else {
				/* No results - setup prefill to n/a */
				prefillString += 'n/a';
				_engine.debug.error('No data was available to prefill requested field.');
			}

			var isAvailable = function(){
				let result;
				typeof useObject[scope].evidence_unavailable === 'undefined' ?
					result = true :
					result = false;
				if( result === false ) prefillString += "n/a";
				return result;
			}

			switch( type ){
				case 'income':

						_engine.debug.warn('income prefill is in need of definition');

					break;
				case 'addresses':

					if( isAvailable() ){

						let result = useObject[scope].Residential;

						if( typeof result !== 'undefined' ){

							if( result.apt_suite !== "" ) prefillString += result.apt_suite + ", ";
							if( result.street_1 !== "" ) prefillString += result.street_1 + ", ";
							if( result.street_2 !== "" ) prefillString += result.street_2 + ", "; 
							if( result.city !== "" ) prefillString += result.city + ", "; 
							if( result.state !== "" ) prefillString += result.state + ", "; 
							if( result.zip !== "" ) prefillString += result.zip; 

						}
						else {
							prefillString += "n/a";
						}

					}

					break;
				case 'service agency':

					if( isAvailable() ){

						let result = useObject[scope];
						if( result[0] !== "" ) prefillString += result[0];

					}

					break;
				default:

					_engine.debug.info("The requested autofill type has no definitions.");

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
		
	},
	
	_processPrefill: function( modalTarget ){
	
		var _fields = $('[data-id="'+modalTarget+'"] .mns-modal-template > .mns-input-group');

			//Push additional clusters if clustering is active
		if( _engine.ui.modal.clustersActive( modalTarget ) ){

			var _clusterFields = $('[data-id="'+modalTarget+'"] .mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');

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
							if( _prefillValue !== "" ){

								_engine.ui.modal.prefillFromDataQuery(_prefillValue,function( prefillString ){
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
	
	_setupAutoComplete: function( modalId ){
		
		let _fields = $('[data-id="'+modalId+'"] .mns-modal-template > .mns-input-group');
		//Push additional clusters if clustering is active

		if( _engine.ui.modal.clustersActive( modalId ) ){

			let _clusterFields = $('[data-id="'+modalId+'"] .mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');

			$.each(_clusterFields,function(k,v){ _fields.push(v); });

		}

		$.each( _fields, function(k,v){

			if( $( v ).find('input').length !== 0 ){

				let input = $( v ).find('input')[0];

				if( typeof $( input ).attr('data-autoComplete') !== 'undefined' ){

					//Process prefill on field(s)

					let _autoComplete = $( input ).attr('data-autoComplete').toLowerCase();

					let _autoCompleteType = _autoComplete.split("|")[0];
					let _autoCompleteValue = _autoComplete.split("|")[1];

					let autoCompleteSource = [];

					switch( _autoCompleteType ){
						case "participants":
							switch( _autoCompleteValue ){
								case "name":

									$.each(_engine.storage.nocache.query('caseData.participants'),function(k,v){
										autoCompleteSource.push(v.name) 
									});

									$( input ).autocomplete({
										minLength: 0,
										delay: 0,
										autoFocus: true,
										source: autoCompleteSource
									});

									break;
								default:
									break;
							}
							break;
						default:
							_engine.debug.warn("unrecognised prefill type of: [ '" +_autoCompleteType+ " ']");
							break;
					}
				}
			}
		});
		
	},
	
	_setupClusters: function( modalTarget ){
		
		if( _engine.ui.modal.clustersActive( modalTarget ) ){

			var _subject = $( '[data-id='+modalTarget+'] .modal-content-container span.mns-input-group span:contains("SUBJECT")' );

			if( _subject.length == 1 ){

				let _selectVal = $( _subject ).parent().find('select').val();

				_engine.ui.modal.changeActiveCluster( modalTarget, _selectVal );

			}

		}
		
	},
	
	_storeParams: function( modalId, callback ){
		
		let modalTemplate = '[data-id="' + modalId + '"] .mns-modal-template',
				fields = $( modalTemplate + ' > .mns-input-group'),
				dataSet = {};

		if( _engine.ui.modal.clustersActive( modalId ) )
			$.each( $( modalTemplate + ' > .input-cluster-active > .mns-input-group') ,function(k,v){ fields.push(v); });

		$.each( fields, function(k,v){

			dataSet[k] = {
				descriptor: '',
				label: '',
				value: '',
				required: false
			};

			if( $( v ).find( '.mns-input-label' ).length )
				dataSet[k].label = $( v ).find( '.mns-input-label' ).text().trim();

			if( $( v ).find( '.mns-input-descriptor' ).length )
				dataSet[k].descriptor = $( v ).find( '.mns-input-descriptor' ).text().trim();

			if( $( v ).find( 'input, select' ).length ){

				dataSet[k].required = $(v).hasClass('required') || dataSet[k].descriptor === "SUBJECT";

				let field = $( v ).find( 'input, select' ),
						val = $( field ).val().trim();

				val = val.replace(/"/g,'&quot;');
				val = val.replace('"','\"');

				if( field[0].type === 'date' ){
					let date = val.split('-');
					val = date[1].replace(/^0/g,'') + '/' + date[2].replace(/^0/g,'') + '/' +  date[0];
				}

				dataSet[k].value = val;

			}

		});

		_engine.storage.nocache.data.modal[modalId].data.params = dataSet;

		if( typeof callback === 'function' ) callback( dataSet );
		
	},
	
	_unwwatch: function(){
		
		$('.mns-modal-template').off('keypress');
		
		$( '.modal-content-container span.mns-input-group span:contains("SUBJECT")' ).parent().find('select').off('change');
		
	},
	
	_validateModal: function( modalId ){
		
		let errors = 0,
				required = '[data-id='+modalId+'] div.mns-modal-template ',
				returnVal = true;

		_engine.ui.modal.clustersActive( modalId ) ?
			required += '> .mns-input-group.required, div.mns-modal-template > .input-cluster-active > .required' :
			required += '.required';

		$.each( $( required ) , function( k,v ){ 

			if( $( v ).find('input').val() === "" ){

				$( v ).addClass("input-error");

				++errors;

			} 
			else $( v ).removeClass("input-error");

		});

		if( errors ) returnVal = false;

		return returnVal;
		
	},
	
	_watch: function( modalTarget ){
		
		let modal = $('[data-id='+modalTarget+']');

		if( $(modal).find('span.mns-input-group:has("input") input[type="text"]').length > 0 ){
			$(modal).find('span.mns-input-group:has("input") input[type="text"]')[0].focus();
		}

		$(modal).find('.action-set').on('click', 'a',function( e ){
			_engine.ui.modal.button( $(this), modalTarget );
		});

		$('[data-id='+modalTarget+'] .mns-modal-template').keypress(function(e){ 

			switch( e.keyCode ){
				// Pressed the Enter Key
				case 13:
					//Is the form able to be submitted?
					if( $('[data-id='+modalTarget+'] .mns-modal-template').hasClass('submit-form') ){
						//Are you in a textarea trying to submit?
						if( !$( document.activeElement ).is('textarea') ){

							$('[data-id='+modalTarget+'] .action-set a[data-role="submit"]').click();

						}
					}
					break;
				default:
					break;
			}

		});

		//Process onLoad Prefill
		_engine.ui.modal.processPrefill( modalTarget );
		_engine.ui.modal.setupAutoComplete( modalTarget );

		if( _engine.ui.modal.clustersActive( modalTarget ) ){

			var _subject = $( '[data-id='+modalTarget+'] .modal-content-container span.mns-input-group span:contains("SUBJECT")' );

			if( _subject.length == 1 ){

				var _select = $( _subject ).parent().find('select');

				$( _select ).on('change',function(){

					let _selectVal = $( _subject ).parent().find('select').val();

					_engine.ui.modal.changeActiveCluster( modalTarget, _selectVal );

					//Process dynamic Prefill on subject change
					_engine.ui.modal.processPrefill( modalTarget );
					_engine.ui.modal.setupAutoComplete( modalTarget );

				});

			}

		}
		
	},
	
	build: function( modalReq, callback ){
		
		let mnsModalFooterButtonContainer, config, template, returnProps;

		// Button Creator for the modal creator
		let addButton = function(key, req, template) {

			let props = {
				label: 'error',
				onclick: 'return false;',
				role: '',
				filler: true
			};

			if (typeof req === 'string') {
				switch (req.toLowerCase()) {
					case 'submit':
						props.label = 'Submit';
						props.role = 'submit';
						break;
					case 'close':
						props.label = 'Close';
						props.role = 'close';
						break;
					default:
						break;
				}
			} else if (typeof req === 'object') {
				$.each(req, function(k, v) {
						props[k] = req[k]
				});
			}

			let mnsModalButton = $('<a>', {
				'onClick': props.onclick,
				'data-role': props.role,
				'html': '<span class="left-corner"><span class="right-corner"><span class="middle">' + props.label + '</span></span></span>'
			});

			$( $(template).find('.action-set') ).append(mnsModalButton);

			if ((key + 1) !== config.buttons.length && config.buttons.length > 1) {
				//Modal footer - Filler Span
				let mnsModalButtonFiller = $('<span>', {
					'class': 'filler'
				});
				$( $(template).find('.action-set') ).append(mnsModalButtonFiller);
			}

		} //End of addButton function

		// Create uniqueId to identify modal
		let uniqueId = _engine.advanced.generateId();

		// Default template if only a text string is specified
		let textTemplate = function( msg ) {
			return '<div class="mns-modal-template"><span class="mns-input-group"><span class="mns-input-label mns-input-infotext">' + msg + '</span></span></div>';
		}

		//Modal defaults
		config = {
			role: null,
			html: null,
			text: 'No defined html template was passed.',
			title: 'DEFAULT MODAL TITLE',
			buttons: ['Close']
		}

		//Lay the config over the defaults
		$.each(modalReq, function(k, v) {
			config[k] = modalReq[k];
		});
		if (config.html === null) config.html = textTemplate(config.text);

		// Create data object in nocache for modal
		_engine.storage.nocache.data.modal[uniqueId] = {
			loaded: false,
			role: config.role,
			data: {}
		};

		// Get default template for modal from views
		_engine.advanced.getView('modal/default.html',function(template){ 

			template = $.parseHTML( template )[0];

			$( template ).attr('data-id',uniqueId);

			$( template ).find( '.dijitDialogCloseIcon' ).attr( 'onclick', "_engine.ui.modal.button('[data-id="+uniqueId+"] .dijitDialogCloseIcon','"+uniqueId+"');" );

			$( template ).find( '.dijitDialogTitle' ).text( config.title );

			$( template ).find('.modal-content-container').html( config.html );

			$.each(config.buttons, function(k, v) {
				addButton(k, v, template);
			});

			_engine.ui.dom.dimLights(true);

			//$( curam.util.getTopmostWindow().document.body ).append( template );
			$( '.modal-overlay' ).append( template );

			/* Setup any post display actions/watchers
			=====================================================*/

			$('[data-id='+uniqueId+']').center();

			_engine.ui.modal.setupClusters( uniqueId );

			_engine.ui.modal.watch( uniqueId );

			$('[data-id='+uniqueId+']').draggable({
				handle: 'div.modal-titlebar',
				stack: '.dijitDialog',
				containment: '.modal-overlay'
			});

			returnProps = {
				id: uniqueId
			}

			// Create data object in nocache for modal
			_engine.storage.nocache.data.modal[uniqueId].loaded = true;

			if (typeof callback === 'function') callback( returnProps ); 

		},true);
		
	},
	
	destroy: function( modalId ){
		
		// Unwatch actions
		_engine.ui.modal.unwatch( modalId );

		// Remove dom element
		$('[data-id="'+modalId+'"].custom-modal').remove();

		// Delete object from nocache
		delete _engine.storage.nocache.data.modal[modalId];

		// If all modals have been destroyed then this lightens the screen
		if( Object.getOwnPropertyNames( _engine.storage.nocache.data.modal ).length === 0 ){
			_engine.ui.dom.dimLights( false );
		}

		//Clear the prefill cache of stored data ( this will become a subgroup of active modal object )
		_engine.storage.prefillCache.clear();
		
	}
	
});