_engine.module.define('domTools/get/icFrame/icTabActive',function(){

	if( _engine.domTools.test.hcrTabActiveIsIC() ){
		var _tp = _engine.domTools.get.hcrTabFrame();
		return $( _tp ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible.dijitTabChecked.dijitChecked');
	} else {
		_engine.caseWork.caseSelection();
	}
	
});