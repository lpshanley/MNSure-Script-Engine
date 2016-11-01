/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/build',function( title, layout, type, params, callback ){
	
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
	var dialogTitle = $('<span>',{'class':'dijitDialogTitle','text':props.title});
	$('div.modal-titlebar').append( dialogTitle );

		//Close X on title bar
	var closeButton = $('<span>',{'class':'dijitDialogCloseIcon', 'onClick':'_engine.events.handleClickEvent("ui.modal._button(close)")'});
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
	var mnsModalFooterSubmitButton = $('<a>', {'onClick':'_engine.events.handleClickEvent("ui.modal._button('+_type+')")', 'html':'<span class="left-corner"><span class="right-corner"><span class="middle">'+ _submit +'</span></span></span>'});

		//Modal footer - Filler Span
	var mnsModalFooterFiller = $('<span>', {'class':'filler'});

		//Button Text
	var _cancel = "Cancel"
	
	
	
		//Modal footer - Button Anchor
	var mnsModalFooterCancelButton = $('<a>', {'onClick':'_engine.events.handleClickEvent("ui.modal._button(close)")', 'html':'<span class="left-corner"><span class="right-corner"><span class="middle">'+ _cancel +'</span></span></span>'});

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

	if(typeof callback === 'function') callback();
	
});