_engine.module.define('ui/dom',[],{
	
	createElement: function( input ){
		
		let config = {};
			config.type = '';
			config.styles = '';
			config.classes = '';
			config.id = '';
			config.content = '';
	
		$.each(input,function(k,v){
			config[k] = input[k];
		});

		if( config.type === '' ) return false;

		let newEle = $('<'+input.type+'>',{
			'data-merlin-id': config.id,
			'data-merlin-attach': config.attachId,
			'style': config.styles,
			'class': config.classes,
			html: config.content
		});

		return newEle;
		
	},
	
	dimLights: function( input ){
		
		let dim;
		$('.modal-overlay').length === 0 ?
			dim = true:
			dim = false;

		if( typeof input === 'boolean' ) dim = input;

		if( dim ){
			if( !$('body').hasClass('modal') ) $('body').addClass( 'modal' );
			if( $('.modal-overlay').length === 0 ){
				let dimmer = $('<div>',{ 'class' : 'modal-overlay' });
				$('body').append( dimmer );
			}
		}
		else {
			if( $('body').hasClass('modal') ) $('body').removeClass( 'modal' );
			$('.modal-overlay').remove();
		}

	},

	interfaceAlteration: function( pageObj ){
		
		let tabParams;
	
		typeof pageObj === 'undefined' ?
			tabParams = curam.tab.getSelectedTab():
			tabParams = pageObj;

		let subnavTabs;

		let count = 0;
		let timeoutForLoad = setInterval(function(){
			if( count < _engine.advanced.vars.iterations ){

				subnavTabs = $( '#'+tabParams.id + ' .nav-panel .nav-area-wrapper .navigation-bar-tabs .dijitTabListWrapper' );

				if( $(subnavTabs).length > 0 ){

					switch( tabParams.params.tabDescriptor.tabID ){
						case 'PersonHome':
							// Commented out on purpose - Errors exist in source preventing proper alterations
							//_engine.ui.dom.reorderTab('eligibility','time limits');
							break;
						case 'HCRIntegratedCase':
							_engine.ui.dom.reorderTab('eligibility','elections');
							break;
						default:
							break;
					}

					clearTimeout( timeoutForLoad );

				}

				count++;

			}
			else{
				clearTimeout( timeoutForLoad );
			}
		}, _engine.advanced.vars.timeout);

		timeoutForLoad;
		
	},
	
	prepUI: function( callback ){
		
		/* Resize left titlebar */
		let newWidth = $('.left-box .title-container .title').width() + $('.left-box .title-container .subtitle').width() + 40;

		$('.left-box .title-container').width( newWidth );

			/* Resize right titlebar */
		$('.right-box .left-cell').width( 'inherit' );

		if(typeof callback === 'function') callback();
		
	},
	
	reorderTab: function( target, insertAfter, callback ){
		
		let tabParams = curam.tab.getSelectedTab();

		switch( tabParams.tabDescriptor.tabID ){
			case 'HCRIntegratedCase':

				if( typeof target === 'string' && typeof insertAfter === 'string' && target !== insertAfter ){

					target = target.toLowerCase();
					insertAfter = insertAfter.toLowerCase();

					$.each(_engine.domTools.get.icFrame.icTabList(),function(key,tab){

						let tabTitle = $(tab)[0].innerText.toLowerCase().trim();

						if( tabTitle === target ) target = tab;
						if( tabTitle === insertAfter ) insertAfter = tab;

					});

					if( typeof target === 'object' && typeof insertAfter === 'object' ){

						$( target ).insertAfter( $( insertAfter ) );

						if( typeof callback === 'function' ) callback();

					}

				}
				break;
			case 'PersonHome':
				if( typeof target === 'string' && typeof insertAfter === 'string' && target !== insertAfter ){

					target = target.toLowerCase();
					insertAfter = insertAfter.toLowerCase();

					$.each(_engine.domTools.get.personhomeFrame.personhomeTabList(),function(key,tab){

						let tabTitle = $(tab)[0].innerText.toLowerCase().trim();

						if( tabTitle === target ) target = tab;
						if( tabTitle === insertAfter ) insertAfter = tab;

					});

					if( typeof target === 'object' && typeof insertAfter === 'object' ){

						$( target ).insertAfter( $( insertAfter ) );

						if( typeof callback === 'function' ) callback();

					}

				}
				break;
			default:
				break;
		}
		
	}
	
});