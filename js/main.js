/* Dependency Loading
-------------------------------------------------*/

var _styles = $('<link>', {href: 'https://rawgit.com/lpshanley/MNSure-Script-Engine/master/css/appStyles.css', rel: 'stylesheet', type: 'text/css' });
$( 'head' ).append( _styles );

var _jquery = $('<script>',{ 'src': 'https://code.jquery.com/jquery-1.12.4.min.js' });
$( 'head' ).append( _jquery );

var _app = $('<script>',{ 'src': 'https://rawgit.com/lpshanley/MNSure-Script-Engine/master/js/app.js', 'data-chromeURL': chrome.extension.getURL(''), 'data-ScriptEngine': '', 'data-extensionID': chrome.runtime.id });
$( 'head' ).append( _app );

	/* Script Engine
	-------------------------------------------------*/

	/* Build Link
	====================*/
	
	//Create Link Item
var scriptButtonLink = $('<a>', {'class': '', text: 'Scripts'});

	//Create Menu Item
var scriptButtonListItem = $('<li>',{'class': 'right-border scripts-link', html: scriptButtonLink, id: 'script-launcher'});

	//Inject Menu Item
$('#app-banner .right-box .right-cell ul').prepend( scriptButtonListItem );

	//Add custom div to header bar.
var _customDiv = $('<div>', {'class': 'center-box'});

$( _customDiv ).insertAfter( '#app-banner > div.left-box' );

