/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

// 
//     __  ____   _______    _____           _       __     ______            _          
//    /  |/  / | / / ___/   / ___/__________(_)___  / /_   / ____/___  ____ _(_)___  ___ 
//   / /|_/ /  |/ /\__ \    \__ \/ ___/ ___/ / __ \/ __/  / __/ / __ \/ __ `/ / __ \/ _ \
//  / /  / / /|  /___/ /   ___/ / /__/ /  / / /_/ / /_   / /___/ / / / /_/ / / / / /  __/
// /_/  /_/_/ |_//____/   /____/\___/_/  /_/ .___/\__/  /_____/_/ /_/\__, /_/_/ /_/\___/ 
//                                        /_/                       /____/              
// 

'use strict';
let _engine;

let ProjectValkyrie = function( id ){
	
	let $root = window[id];
	
	//**************//
	//*   Tools    *//
	//**************//

	let $tools = {
		regex: {
			stripComment: /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
			stripArgs: /(.+\()|(\".+)|(\).+)|[}]/mg,
			splitQuery: /[\|\/\\\.]/g
		},
		parseQueryString: ( input ) => input.replace(/(^\/)|(\/$)/g,"").split( $tools.regex.splitQuery ),
		parseToUrl: ( input ) => input.replace( $tools.regex.splitQuery, "/" ).replace(/(^\/)|(\/$)/g,""),
		isFunction: ( input ) => typeof( input ) === "function",
		isArray: ( input ) => Object.prototype.toString.call( input ) === "[object Array]",
		isString: ( input ) => Object.prototype.toString.call( input ) === "[object String]",
		isUndefined: ( input ) => typeof( input ) === "undefined",
		isObject: ( input ) => Object.prototype.toString.call( input ) === "[object Object]",
		encodeString: ( input ) => encodeURIComponent( JSON.stringify( input ) ),
		decodeString: ( input ) => $.parseJSON( decodeURIComponent( input ) )
	}
	this.tools = $tools;

	//*************//
	//*  Storage  *//
	//*************//

	let $storage = {
		
		fetch: ( obj ) => window.localStorage['mnsEngine_' + obj ],
		
		config: {
			get: (req) => {
				let config = $tools.decodeString( $storage.fetch('Config') ),
						rtn = config;
				
				if( $tools.isString(req) ) {
					let reqArray = $tools.parseQueryString(req);
					for(let i=0, len = reqArray.length; i < len; i++){
						i === len - 1 ? 
							rtn = config[reqArray[i]] : 
							config = config[reqArray[i]];
					}
				}
				return rtn;
			},
			set: ( obj ) => {
				let config = $storage.config.get();
				$.extend(true,config,obj);
				window.localStorage.mnsEngine_Config = $tools.encodeString( config );
			}
		}

	}
	this.storage = $storage;

	//*************//
	//*    AMD    *//
	//*************//

	let $amd = {};
	
	$amd.registry = {};
	$amd.queue = [];
	$amd.pending = [];
	$amd.buster = [];
	$amd.registry = {};

	$amd.requestor = undefined,

	$amd.register = ( name, reqs ) => {
		_engine.module.registry[name] = reqs;
	}

	$amd.bustLoop = (name, modules) => {

		_engine.module.addToLoopBuster( name );

		let rtn = [],
				bustArray = _engine.module.buster;

		for(let i = 0, len = modules.length; i < len; i++){
			let indexTest = bustArray.indexOf( modules[i] );
			if( indexTest > -1 ) rtn.push( modules[i] );
		}

		return rtn;

	}

	$amd.addToLoopBuster = (module) => {
		if( _engine.module.buster.indexOf( module ) === -1 ) {
			_engine.module.buster.push( module );
		}
	}

	$amd.removeFromLoopBuster = (module) => {
		let index = _engine.module.buster.indexOf( module );
		if( index > -1 )
			_engine.module.buster.splice( index, 1 ); 
	}

	$amd.addToQueue = (module) => {
		if( _engine.module.queue.indexOf( module ) === -1 && _engine.module.pending.indexOf( module ) === -1 ) {
			_engine.module.queue.push( module ); 
			_engine.module.download( module );
		}
	}

	$amd.removeFromQueue = (module) => { 
		let index = _engine.module.queue.indexOf( module );
		if( index > -1 )
			_engine.module.queue.splice( index, 1 ); 
	}

	$amd.addToPending = (module) => {
		if( _engine.module.pending.indexOf( module ) === -1 ) {
			_engine.module.pending.push( module );
		}
	}

	$amd.switchToPending = (module) => {
		_engine.module.removeFromQueue( module );
		_engine.module.addToPending( module );
	}

	$amd.removeFromPending = (module) => { 
		let index = _engine.module.pending.indexOf( module );
		if( index > -1 )
			_engine.module.pending.splice( index, 1 ); 
	}

	$amd.download = function( module ){
		let baseUrl = $storage.config.get('advanced.baseUrl'),
				mod = $tools.parseToUrl(module),
				req = baseUrl + "js/modules/" + mod + ".js";
		$.ajax({
			dataType: 'script',
			url: req,
			success: function(){
				$amd.pendForInstall( module );
			}
		});
	}

	$amd.define = function( module, reqs, definition ){

		if( ($tools.isFunction(reqs) || $tools.isObject(reqs)) && $tools.isUndefined( definition )){
			definition = reqs;
			reqs = [];
		}

		let config = {
			name: module,
			require: reqs
		}

		$amd.register(config.name, config.require);

		$amd.require(config,function( unfinished ){
			let def = $tools.parseQueryString( module ),
					root = _engine,
					last = def.length - 1;

			console.log('defining ', module);

			$.each(def,function(key,path){
				if(typeof(root[path]) === 'undefined') root[path] = {};

				key === last ?
					root[path] = definition :
					root = root[path];

			});

		});

	}

	$amd.exists = function( module ){
		let modArray = $tools.parseQueryString( module ),
				obj = _engine,
				exists = true;

		/* Determines is a module is present in the root structure */
		for( let i=0, len = modArray.length; i < len; i++){
			obj = obj[modArray[i]];
			if( $tools.isUndefined(obj) ){
				exists = false;
				break;
			}
		}

		/* If module does not exists add to download queue */
		if(!exists) _engine.module.addToQueue( module );

		return exists;
	}

	$amd.pauseForPending = ( callback, timeOut ) => {

		timeOut = timeOut || 0;

		if(  _engine.module.queue.length === 0 && _engine.module.pending.length === 0 ) {
			console.info(`Pend Log clear running request: `);
			console.log( _engine.module.queue );
			_engine.module.requestor = undefined;
			if( _engine.tools.isFunction( callback ) ) callback();
		}
		else {
			if( timeOut++ < 300 ){
				setTimeout(function(){
					_engine.module.pauseForPending( callback, timeOut );
				},10);
			}
			else {
				console.info('Timeout encountered on structure launch.');
			}
		}

	}

	$amd.require = function( config, callback ){

		if(_engine.tools.isArray(config)){
			let temp = config;
			config = {
				name: 'startup',
				require: temp
			}
		}

		if( _engine.module.requestor === undefined ) _engine.module.requestor = config.name;

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
							let busted = false;
							if( $loopBuster ) 
								++$loopBuster;
							else 
								$loopBuster = 1;
							if( $loopBuster === 40 ) loopLimit = 300;
							else if( $loopBuster >= 60 ){
								bustedArray = _engine.module.bustLoop( $name, $array );
							}

							if( bustedArray.length > 0 ) {
								let unbusted = [];
								for(let i = 0, len = $array.length; i <  len; i++){
									if( bustedArray.indexOf( $array[i] ) === -1 ) unbusted.push( bustedArray[i] );
								}
								$array = unbusted;
								if($array.length === 0) busted = true;
							}

							($name === _engine.module.requestor) ?
								_engine.module.pauseForPending( $callback ) :
								process({array: $array, name: $name},$callback, $loopBuster);

						}
						else {
							process({array: $array, name: $name},$callback);
						}
					}, 10);
				}
				else {
					if( isCallback ) $callback();
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

	}

	$amd.pendForInstall = function( module, count ){

		if( _engine.module.queue.indexOf( module ) > -1 )
			_engine.module.switchToPending( module );

		let timeout = count || 0;

		if(_engine.module.exists(module)){
			_engine.module.removeFromPending( module );
			_engine.module.removeFromLoopBuster( module );
		}
		else {
			setTimeout(function(){
				if(timeout < 300){
					timeout++;
					_engine.module.pendForInstall( module, timeout );
				}
				else {
					console.error('Timed out ' + module + " in pending status.");
				}
			}, 10);
		}
	}
	this.module = $amd;
	
	let $ready = ( callback, count ) => {
		count = count++ || 0;
		console.log('Testing for ready: ', count);
		if( typeof($) === 'function' ) callback();
		else if( count < 400 ) { 
			//count++;
			setTimeout(function(){$ready(callback, count)},25);
		}
	}
	
	this.run = function() {
		$ready(function(){
			_engine.module.require(['search/case','search/person', 'events/domMonitor', 'ui/topNotification','ui/dom', 'ui/scriptMenu','storage/debugStatus', 'storage/prefillCache','advanced/sessionExpiry', 'advanced/setupTimeoutAlert', 'tools/loadAddons', 'debug/error'],function(){

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

			});

		});
		
	}
	
}

_engine = new ProjectValkyrie('_engine');
_engine.run();