/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

/* Dependency Loading
-------------------------------------------------*/

window.localStorage.setItem( "mnsEngine_Status", false );

var _betaCommit = null;
var _masterCommit = null;

$.ajax({
	url: "https://api.github.com/repos/lpshanley/MNSure-Script-Engine/branches",
	type: 'get',
	dataType: 'json',
	async: false,
	success: function( data ){
		
		$.each(data,function(k,v){
			
			if(v.name == "master"){
				_masterCommit = v.commit.sha.substring(0,7);
			} else if(v.name == "beta"){
				_betaCommit = v.commit.sha.substring(0,7);
			}
			
		});
		
	}
});


var _styles = $('<link>', {href: 'https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/'+ _masterCommit +'/css/appStyles.css', rel: 'stylesheet', type: 'text/css', 'data-ScriptEngine': '' });
$( 'head' ).append( _styles );

var _jquery = $('<script>',{ 'src': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' });
$( 'head' ).append( _jquery );

var _app = $('<script>',{ 'src': 'https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/'+ _masterCommit +'/js/app.js', 'data-beta':_betaCommit, 'data-master':_masterCommit, 'data-chromeURL': chrome.extension.getURL(''), 'data-ScriptEngine': '', 'data-extensionID': chrome.runtime.id });
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

