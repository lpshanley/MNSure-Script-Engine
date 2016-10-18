_engine.module.define('domTools/get/icFrame/icTabActiveFrame',function(){
	
	if(_engine.domTools.test.hcrTabActiveIsIC()){
		
		var _tp = _engine.domTools.get.hcrTabFrame();
		return $( _tp ).find('.content-area-container iframe').contents().find('body');
		
	}
	
});