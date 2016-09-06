/* Append Stylesheet, Script File, and JQuery
-------------------------------------------------*/

	//Create Element
var customStyleSheetEmbed = $('<link/>', {href: chrome.extension.getURL('css/embeddedCustomStyles.css'), rel: 'stylesheet', type: 'text/css' });
	//Embed Stylesheet
$('head').append( customStyleSheetEmbed );

	//Create Element
var customJQueryEmbed = document.createElement('script');
customJQueryEmbed.src = chrome.extension.getURL('js/libs/jquery-1.12.3.min.js');
	//Embed Jquery File
(document.head || document.documentElement).appendChild( customJQueryEmbed );

$( document ).ready(function(){
		//Create Element
	var customScriptEmbed = document.createElement('script');
	customScriptEmbed.src = chrome.extension.getURL('js/embeddedJS.js');
		//Embed Jquery File
	(document.head || document.documentElement).appendChild( customScriptEmbed );
});

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