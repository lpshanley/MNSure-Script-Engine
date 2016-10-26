/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/displayExpiry',function(){

	let expiry = _engine.advanced._sessionExpiry();
	
	if( $('.mns-expiryBlock').length === 0 ){
		
		let expiryBlock = $('<span>',{'class':'mns-expiryBlock'});
		
		$( expiryBlock ).insertAfter( '#app-banner .center-box' );
		
	}
	
	$('.mns-expiryBlock').text( 'Session Expires: ' + expiry );

});