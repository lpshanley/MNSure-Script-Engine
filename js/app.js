/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

// 
//     __  ____   _______    _____           _       __     ______            _          
//    /  |/  / | / / ___/   / ___/__________(_)___  / /_   / ____/___  ____ _(_)___  ___ 
//   / /|_/ /  |/ /\__ \    \__ \/ ___/ ___/ / __ \/ __/  / __/ / __ \/ __ `/ / __ \/ _ \
//  / /  / / /|  /___/ /   ___/ / /__/ /  / / /_/ / /_   / /___/ / / / /_/ / / / / /  __/
// /_/  /_/_/ |_//____/   /____/\___/_/  /_/ .___/\__/  /_____/_/ /_/\__, /_/_/ /_/\___/ 
//                                        /_/                       /____/              
// 

var _engine = {
	
	//**************//
	//*   Events   *//
	//**************//
	
	events: {
		
		/* Cannot move startUp into a module
		/********************************************************************/
		
		startUp: function() {
			
			_engine.module.require(['search/case','search/person', 'events/domMonitor', 'ui/topNotification','ui/dom', 'ui/scriptMenu','storage/debugStatus', 'storage/prefillCache','advanced/sessionExpiry', 'advanced/setupTimeoutAlert', 'tools/loadAddons', 'debug/error'],function( reqsNotMet ){
				if(!_engine.tools.isArray(reqsNotMet)) reqsNotMet = [];
				if( reqsNotMet.length === 0 ){
				
					_engine.tools.loadAddons.run( _engine.tools.loadAddons.config );

					$('#script-launcher a').contextmenu(function(e){
							// Prevent context menu pop-up
						e.preventDefault();
							// Open Case Search
						_engine.search.case();
							// Open Person Search
						_engine.search.person();
					});

					_engine.storage.prefillCache.clear();

					//Dynamic Ticker Notifs (10s)
					setInterval(function(){

						_engine.ui.topNotification.remove("Session Expiry");
						_engine.ui.topNotification.add( `Session Expiry - ${ _engine.advanced.sessionExpiry() }` );

					},10000);

					let version = _engine.storage.config.get('commit.current'),
							commit = _engine.storage.config.get('commit.' + version);

					_engine.ui.topNotification.add(`Script Library: ${version}`);

					version === 'master' ?
						_engine.storage.debugStatus.set( false ):
						_engine.storage.debugStatus.set( true );

					if( version !== 'master' && version !== 'beta' ){

						_engine.ui.topNotification.add(`Loaded commit: ${commit}`);

						$.ajax({
							url: 'https://api.github.com/rate_limit?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1',
							dataType: 'json',
							async: false,
							success: function( data ){
								_engine.ui.topNotification.add(`Calls Remaining: ${data.resources.core.remaining}`);
							}
						});

					}

					_engine.ui.dom.prepUI(function(){

						_engine.ui.topNotification.run();

							//Build out menu
						_engine.ui.scriptMenu.refresh();

						_engine.events.domMonitor();

						$('.scripts-link, .center-box').removeAttr('style');

						_engine.advanced.setupTimeoutAlert();

					});
					
				}
				
			});
			
		},

	},
	
	//*************//
	//*  Storage  *//
	//*************//
	
	storage: {
		
		/* Config Storage Model and _data cannot be relocated */
		
		data: {
			encode: function( input ){
				return encodeURIComponent( JSON.stringify( input ) );
			},
			decode: function( input ){
				return $.parseJSON( decodeURIComponent( input ) );
			}
		},
		
		config: {
			get: function( reqString ){
				
				let config = _engine.storage.data.decode( window.localStorage.mnsEngine_Config );
				
				if(typeof reqString === "string"){ 
					
					let reqArray = reqString.split('.');
					
					$.each( reqArray, function(k,v){
						
						typeof config[v] === "undefined" ?
							config = false :
							config = config[v];
						
					});
				}
				
				return config;
				
			},
			set: function( obj ){
				
				let config = _engine.storage.config.get();

				$.extend(true,config,obj);

				window.localStorage.mnsEngine_Config = _engine.storage.data.encode( config );
				
			}
		},
		
		fallbackCache: {
			
			get: function(){
				
				return _engine.storage.data.decode( window.localStorage.mnsEngine_fallbackCache );
				
			},
			
			addModule: function( module ){
				
				if( typeof module !== 'undefined' ){

					let currentCommit = _engine.storage.config.get('commit.current');

					let fallbackCache = _engine.storage.fallbackCache.get();

					fallbackCache[currentCommit].modules.push( module );

					window.localStorage.mnsEngine_fallbackCache = _engine.storage.data.encode( fallbackCache );

				}
				
			},
			
			fallbackStatus: function( status ){
				
				let currentCommit = _engine.storage.config.get('commit.current');
				
				let fallbackCache = _engine.storage.fallbackCache.get();
				
				let response;
				
				if( _engine.storage.fallbackCache.cacheable() ){
				
					if(typeof status === 'boolean') {

						fallbackCache[currentCommit].current = status;

						window.localStorage.mnsEngine_fallbackCache = _engine.storage.data.encode( fallbackCache );

					}
					
					response = fallbackCache[currentCommit].current;
					
				} else {
					
					response = false;
					
				}
				
				return response;
				
			},
			
			cacheable: function(){

				let currentCommit = _engine.storage.config.get('commit.current');
				
				return ( ['master','beta'].indexOf( currentCommit ) > -1 );
				
			}
			
		}
		
	},
	
	//**************//
	//*   Tools    *//
	//**************//
	
	tools: {
		
		regex: {
			stripComment: /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
			stripArgs: /(.+\()|(\".+)|(\).+)|[}]/mg,
			splitQuery: /[\|\/\\\.]/g
		},
		
		splitArg:  function( input ){
			return input.replace(/(^\/)|(\/$)/g,"").split( _engine.tools.regex.splitQuery );
		},
		
		parseToUrl: function( input ){
			return input.replace(_engine.tools.regex.splitQuery,"/").replace(/(^\/)|(\/$)/g,"");
		},

		isFunction: function( input ){
			return Object.prototype.toString.call( input ) === "[object Function]";
		},

		isArray: function( input ){
			return Object.prototype.toString.call( input ) === "[object Array]";
		},

		isUndefined: function( input ){
			return Object.prototype.toString.call( input ) === "[object Undefined]";
		},
		
		isObject: function( input ){
			return Object.prototype.toString.call( input ) === "[object Object]";
		}
		
	},
	
	//**************//
	//*   Module   *//
	//**************//
	
	module: {
		
		queue: [],
		pending: [],
		buster: {},
		
		bustLoop: (name, modules) => {
			let rtn = [],
					matchTest = [],
					bustModule = true,
					match = Object.getOwnPropertyNames(_engine.module.buster);
			
			if( match.length > 0 ){
				for(let i = 0, len = modules.length; i < len; i++ ){
					
					if( match.indexOf(modules[i]) > -1 ) matchTest.push( modules[i] );
					
				}
			}
			else {
				_engine.module.buster[name] = modules;
			}
			
			rtn = matchTest;
			
			return rtn;
		},
		
		addToQueue: (module) => {
			if( _engine.module.queue.indexOf( module ) === -1 && _engine.module.pending.indexOf( module ) === -1 ) {
				_engine.module.queue.push( module ); 
				_engine.module.download( module );
			}
		},
		
		removeFromQueue: (module) => { 
			let index = _engine.module.queue.indexOf( module );
			if( index > -1 )
				_engine.module.queue.splice( index, 1 ); 
		},
		
		addToPending: (module) => {
			if( _engine.module.pending.indexOf( module ) === -1 ) {
				_engine.module.pending.push( module );
			}
		},
		
		switchToPending: (module) => {
			_engine.module.removeFromQueue( module );
			_engine.module.addToPending( module );
		},
		
		removeFromPending: (module) => { 
			let index = _engine.module.pending.indexOf( module );
			if( index > -1 )
				_engine.module.pending.splice( index, 1 ); 
		},
		
		download: function( module ){
			let baseUrl = _engine.storage.config.get('advanced.baseUrl'),
					mod = _engine.tools.parseToUrl(module),
					req = baseUrl + "js/modules/" + mod + ".js";
			$.ajax({
				dataType: 'script',
				url: req,
				success: function(){
					_engine.module.pendForInstall( module );
				}
			});
		},
		
		define: function( module, reqs, definition ){
			if( (_engine.tools.isFunction(reqs) || _engine.tools.isObject(reqs)) && _engine.tools.isUndefined( definition )){
				definition = reqs;
				reqs = [];
			}
			
			let config = {
				name: module,
				require: reqs
			}
			
			_engine.module.require(config,function( unfinished ){
				if(!_engine.tools.isArray(unfinished)) unfinished = [];
				
				if( unfinished.length === 0 ){
					let def = _engine.tools.splitArg( module ),
							root = _engine,
							last = def.length - 1;
						
					$.each(def,function(key,path){
						if(typeof(root[path]) === 'undefined') root[path] = {};
						
						key === last ?
							root[path] = definition :
							root = root[path];
						
					});
					
				}
				else {
					
					console.error(`Installation failure: ${module} \nRequirements not satisfied: `, unfinished);
					
				}
			
			});
			
		},
		
		exists: function( module ){
			let modArray = _engine.tools.splitArg( module ),
					obj = _engine,
					exists = true;
			
			/* Determines is a module is present in the root structure */
			for( let i=0, len = modArray.length; i < len; i++){
				obj = obj[modArray[i]];
				if( _engine.tools.isUndefined(obj) ){
					exists = false;
					break;
				}
			}
			
			/* If module does not exists add to download queue */
			if(!exists) _engine.module.addToQueue( module );
			
			return exists;
		},
		
		require: function( config, callback ){
			
			if(_engine.tools.isArray(config)){
				let temp = config;
				config = {
					name: undefined,
					require: temp
				}
			}
			
			let loopCounter = 0,
					name = config.name,
					modules = config.require,
					reqs = [],
					isCallback = _engine.tools.isFunction( callback ),
					loopLimit = 100;
				
			let process = function($setup, $callback, $loopBuster){
				loopCounter++;
				
				let $array = $setup.array,
						$name = $setup.name,
						purge = [],
						bustedArray = [];
				$loopBuster = $loopBuster || false;
				
				for( let i = 0, len = $array.length; i < len; i++ ){
					if(_engine.module.exists($array[i])){
						purge.push($array[i]);
					}
				}
				
				for( let i = 0, len = purge.length; i < len; i++ ){
					$array.splice($array.indexOf(purge[i]),1);
				}
				
				if($array.length === 0 ){
					if( isCallback ) $callback();
				}
				else {
					if( loopCounter < loopLimit ){
						setTimeout(function(){
							if( purge.length === 0 ){
								if( $loopBuster ) 
									++$loopBuster;
								else 
									$loopBuster = 1;
								if( $loopBuster === 50 ) loopLimit = 150;
								else if( $loopBuster >= 50 ){
									bustedArray = _engine.module.bustLoop( $name, $array );
								}
								
								if( bustedArray.length > 0 ) console.log(`[${name}] Modules busted: `, bustedArray);
								process({array: $array, name: $name},$callback, $loopBuster);
								
							}
							else {
								process({array: $array, name: $name},$callback);
							}
						}, 10);
					}
					else {
						if( isCallback ) $callback( $array );
					}
				}
			}
			
			for(let i = 0, len = modules.length; i < len; i++){
				if(!_engine.module.exists(modules[i])){
					reqs.push( modules[i] );
				}
			}
			
			let setupProcess = {
				name: name,
				array: reqs
			}
			
			if(reqs.length) process(setupProcess,callback);
			else if( isCallback ) callback();
			
		},
		
		pendForInstall: function( module, count ){
			
			if( _engine.module.queue.indexOf( module ) > -1 )
				_engine.module.switchToPending( module );
			
			let timeout = count || 0;
			
			if(_engine.module.exists(module)){
				_engine.module.removeFromPending( module );
			}
			else {
				setTimeout(function(){
					if(timeout < 200){
						timeout++;
						_engine.module.pendForInstall( module, timeout );
					}
					else {
						console.error('Timed out ' + module + " in pending status.");
					}
				}, 10);
			}
		}
		
	}
	
} 

/* [Program Start] Runs the startup function 
/********************************************************************/
_engine.temp = {count:0};

_engine.temp.jQloaded = setInterval(function(){

	if( _engine.temp.count < 400 ){
		if( typeof $ === 'function' ){
			_engine.events.startUp();
			clearInterval(_engine.temp.jQloaded);
			delete _engine.temp;
		} else {
			_engine.temp.count++;
		}
	} else {
		clearInterval(_engine.temp.jQloaded);
	}
},25);

_engine.temp.jQloaded;