/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/dom/dimLights',function( input ){
	
	if($('.modal-overlay').length){
		if(!$('.custom-modal').length) {
			if( $('body').hasClass('modal') ) $('body').removeClass( 'modal' );
			$('.modal-overlay').remove();
		}
	}
	else {
		if( !$('body').hasClass('modal') ) $('body').addClass( 'modal' );
		$('body').append( $('<div>',{ 'class' : 'modal-overlay' }) );
	}
	
});