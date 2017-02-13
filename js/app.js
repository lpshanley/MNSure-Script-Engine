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
		
		/* Cannot move _startUp into a module
		/********************************************************************/
		
		_startUp: function() {
			
			_engine.module.require(['search/_case','search/_person', 'events/domMonitor', 'ui/topNotification','ui/dom', 'ui/scriptMenu','storage/debugStatus', 'storage/prefillCache','advanced/_sessionExpiry', 'advanced/setupTimeoutAlert'],function(){
				
				//_engine.tools.loadAddons.run( _engine.tools.loadAddons.config );
				
				$('#script-launcher a').contextmenu(function(e){
						// Prevent context menu pop-up
					e.preventDefault();
						// Open Case Search
					_engine.search._case();
						// Open Person Search
					_engine.search._person();
				});
				
				//Dynamic Ticker Notifs (10s)
				setInterval(function(){
					
					_engine.ui.topNotification.remove("Session Expiry");
					_engine.ui.topNotification.add( `Session Expiry - ${ _engine.advanced._sessionExpiry() }` );
					
				},10000);
				
				let version = _engine.storage.config.get('commit.current');
				
				_engine.storage.prefillCache.clear();
				
				_engine.ui.topNotification.add(`Script Library: ${version}`);
				
				version === 'master' ?
					_engine.storage.debugStatus.set( false ):
					_engine.storage.debugStatus.set( true );
				
				if( version !== 'master' && version !== 'beta' ){
					
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
				
			});
			
		},

	},
	
	//*************//
	//*  Storage  *//
	//*************//
	
	storage: {
		
		/* Config Storage Model and _data cannot be relocated */
		
		_data: {
			encode: function( input ){
				return encodeURIComponent( JSON.stringify( input ) );
			},
			decode: function( input ){
				return $.parseJSON( decodeURIComponent( input ) );
			}
		},
		
		config: {
			get: function( reqString ){
				
				let config = _engine.storage._data.decode( window.localStorage.mnsEngine_Config );
				
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

				window.localStorage.mnsEngine_Config = _engine.storage._data.encode( config );
				
			}
		},
		
		fallbackCache: {
			
			get: function(){
				
				return _engine.storage._data.decode( window.localStorage.mnsEngine_fallbackCache );
				
			},
			
			addModule: function( module ){
				
				if( typeof module !== 'undefined' ){

					let currentCommit = _engine.storage.config.get('commit.current');

					let fallbackCache = _engine.storage.fallbackCache.get();

					fallbackCache[currentCommit].modules.push( module );

					window.localStorage.mnsEngine_fallbackCache = _engine.storage._data.encode( fallbackCache );

				}
				
			},
			
			fallbackStatus: function( status ){
				
				let currentCommit = _engine.storage.config.get('commit.current');
				
				let fallbackCache = _engine.storage.fallbackCache.get();
				
				let response;
				
				if( _engine.storage.fallbackCache.cacheable() ){
				
					if(typeof status === 'boolean') {

						fallbackCache[currentCommit].current = status;

						window.localStorage.mnsEngine_fallbackCache = _engine.storage._data.encode( fallbackCache );

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
		
		loadList : [],
		
		download: function( module ){
			let baseUrl = _engine.storage.config.get('advanced.baseUrl');
			let req = baseUrl + "js/modules/" + _engine.tools.parseToUrl(module) + ".js";
			$.ajax({
				dataType: 'script',
				url: req,
				success: function(){
					_engine.module.loadList.splice( _engine.module.loadList.indexOf( module ), 1 );
				}
			});
		},
		
		define: function( module, reqs, definition ){
			if( (_engine.tools.isFunction(reqs) || _engine.tools.isObject(reqs)) && _engine.tools.isUndefined( definition )){
				definition = reqs;
				reqs = [];
			}
			
			_engine.module.require(reqs);
			
			let def = _engine.tools.splitArg( module ),
					root = _engine,
					last = def.length - 1;
			
			$.each(def,function(key,path){
				if(typeof(root[path]) === 'undefined') root[path] = {};
				
				key === last ?
					root[path] = definition :
					root = root[path];

			});
			
			
			
		},
		
		exists: function( module, callback ){
			console.log( 'Exist Check: ' + module );
			let modArray = _engine.tools.splitArg( module ),
					root = _engine,
					exists = true;
			for( i=0, len = modArray.length; i < len; i++){
				root = root[modArray[i]];
				if( _engine.tools.isUndefined(root) ){
					exists = false;
					break;
				}
			}
			if(_engine.tools.isFunction(callback)) callback(exists);
		},
		
		require: function( modules, callback ){
				
			let loopCounter = 0,
					reqs = [];
				
			let process = function($array, $callback){
				loopCounter++;
				_engine.module.exists($array[0],function( exists ){
					
					if(exists) $array.splice( $array.indexOf( $array[0] ), 1 );
					
					console.log(loopCounter, $array);
					
					if($array.length === 0 ){
						if(_engine.tools.isFunction( $callback )) $callback();
					}
					else {
						if( loopCounter < 400 ) setTimeout(function(){ process($array,$callback) }, 25);
						else _engine.debug.error('Timeout on [module/require]: ', $array);
					}
				});
			}
			
			$.each(modules,function(key, module){
				_engine.module.exists(module,function( exists ){
					if(!exists){
						reqs.push( module );
						if( _engine.module.loadList.indexOf( module ) === -1 ){
							_engine.module.loadList.push( module );
							_engine.module.download( module );
						}
					}
				});
			});

			if(reqs.length) process(reqs,callback);
			else if( _engine.tools.isFunction( callback )) callback();
			
		}
		
	}
	
} 

/* [Program Start] Runs the startup function 
/********************************************************************/
_engine.temp = {count:0};

_engine.temp.jQloaded = setInterval(function(){

	if( _engine.temp.count < 400 ){
		if( typeof $ === 'function' ){
			_engine.events._startUp();
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