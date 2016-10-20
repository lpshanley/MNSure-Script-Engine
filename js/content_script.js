/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

/* Dependency Loading
-------------------------------------------------*/

var config = {
	commit: {
		current: 'master',
		master: ''
	},
	extension: {
		url: chrome.extension.getURL(''),
		id: chrome.runtime.id
	},
	advanced: {
		baseUrl: ''
	}
}

let commitVersion = window.location.href.split("?");

if( commitVersion.length > 1 ){
	let version = commitVersion[1].trim();
	config.commit.current = version;
}

$.ajax({
	url: "https://api.github.com/repos/lpshanley/MNSure-Script-Engine/branches?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1",
	type: 'get',
	dataType: 'json',
	async: false,
	success: function( data ){
		$.each(data,function(k,v){
			if(v.name !== 'current'){
				if(typeof config.commit[v.name] !== 'undefined') config.commit[v.name] = '';
				config.commit[v.name] = v.commit.sha.substring(0,7);
			}
		});
	}
});

if(typeof config.commit[config.commit.current] === 'undefined') config.commit.current = "master";

/* Setup Preload Variables */
config.advanced.baseUrl = "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/" + config.commit[config.commit.current] + "/";

/* Store Commit info into local storage */
window.localStorage.setItem( "mnsEngine_Config", encodeURIComponent(JSON.stringify(config)));

/* Add Scripts and Build menu item to attach to MNS */
var _styles = $('<link>', {href: 'https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/'+ config.commit[config.commit.current] +'/css/appStyles.css', rel: 'stylesheet', type: 'text/css', 'data-ScriptEngine': '' });
$( 'head' ).append( _styles );

var _jquery = $('<script>',{ 'src': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' });
$( 'head' ).append( _jquery );

var _app = $('<script>',{ 'src': 'https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/'+ config.commit[config.commit.current] +'/js/app.js', 'data-ScriptEngine': '' });
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