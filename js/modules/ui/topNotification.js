/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/topNotification',['advanced/_vars'],{
	
	add: function( msg ){
		
		if( typeof _engine.advanced.vars.topNotificationTicker === 'undefined' ) _engine.advanced.vars.topNotificationTicker = [];
			
		if( msg.trim() !== '' && typeof msg === 'string' && _engine.advanced.vars.topNotificationTicker.indexOf( msg ) === -1 ){
			_engine.advanced.vars.topNotificationTicker.push( msg );
		}
		
	},
	
	remove: function( msg ){
		
		if( typeof _engine.advanced.vars.topNotificationTicker === 'undefined' )
			_engine.advanced.vars.topNotificationTicker = [];
		
		let msgArray = [];
		
		$.each( _engine.advanced.vars.topNotificationTicker, function( k, v ){
			if( v.indexOf( msg ) === -1 ) msgArray.push( v );
		});
		
		_engine.advanced.vars.topNotificationTicker = msgArray;
		
	},
	
	run: function(){
		
		if( typeof _engine.advanced.vars.topTickerStatus === 'undefined' ) _engine.advanced.vars.topTickerStatus = false;
		
		if( !_engine.advanced.vars.topTickerStatus ){
		
			if( _engine.advanced.vars.topNotificationTicker.length > 0 ){

				if( $('.center-box span').length === 0 ){

					var _span = $('<span>',{'html': _engine.advanced.vars.topNotificationTicker[0] , 'style':'display:none;' });
					$('div.center-box').html( _span );

					$('.center-box span').fadeIn();

				}


			}

			setInterval(function(){

				let messages = _engine.advanced.vars.topNotificationTicker;

				let onMessage = 0, nextMessage = 0, notif;

				if( $('.center-box span').length > 0 && _engine.advanced.vars.topNotificationTicker.indexOf( $('.center-box span').text() ) > -1 ){

					onMessage = _engine.advanced.vars.topNotificationTicker.indexOf( $('.center-box span').text() );

					if( ( _engine.advanced.vars.topNotificationTicker.length - 1 ) === onMessage ) nextMessage = 0;
					else nextMessage = onMessage + 1;

				}

				notif = messages[nextMessage];
				
				if( _engine.advanced.vars.topNotificationTicker.length > 1 ){
					
					$('.center-box span').fadeOut(function(){ 

						$('.center-box span').text( notif );

						$('.center-box span').fadeIn();

					});
					
				} else {
				
					$('.center-box span').text( notif );
				
				}

			},7500);
		
			_engine.advanced.vars.topTickerStatus = true;
			
		}
			
	}
	
});