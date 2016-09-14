/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	
	if(changeInfo.status == "complete"){
		if( tab.url.indexOf("people.mnsure.org") > -1 ){
			
			chrome.runtime.onMessageExternal.addListener(
				function(request, sender, sendResponse){
					
					var result = null;
					
					var _version = request.release;
					
					if( request.release == "beta" ){
						var _url = "https://rawgit.com/lpshanley/MNSure-Script-Engine/beta/views/";
					} else {
						var _url = "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/master/views/";
					}
					
					$.ajax({
						url: _url+request.file,
						type: 'get',
						dataType: 'html',
						async: false,
						success: function( data ){
							
							result = data;
							
						}
					});

					sendResponse( result );
					
				}
			);
			
			
		}
	}

});