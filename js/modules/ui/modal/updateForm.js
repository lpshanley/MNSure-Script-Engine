_engine.module.define('ui/modal/updateForm',function( modalTarget, ele ){
	
	let list = ele || $('[data-id='+modalTarget+'] [data-id]');
		
	$.each(list,function(k,v){
		
		let test = $(v),
				isValid = true,
				id = v.dataset.id;
				
		if(!$(v).is(':input')) 
			test = $(v).children(':input');
			
		$.each(test,function(k,v){
			if( $(v).is(':checkbox') )
				isValid = v.checked;
			else
				isValid = v.value !== "";
		});
			
			// Do show/hide on multi factor validation
		if($(v).is('select')){
			$.each($('[data-id='+modalTarget+'] [data-showif]'),function(k,v){
				let item = v.dataset.showif.split(/[:\/|$\\=]/g);
				if(item.length === 2 && item[0] === id){
					if( item[1] === test.val() ) $(v).show();
					else $(v).hide();
				} 
			});
		}
			// Do show/hide on single factor validation
		else
			isValid ?
				$(`[data-id="${modalTarget}"] [data-showif="${ id }"]`).show():
				$(`[data-id="${modalTarget}"] [data-showif="${ id }"]`).hide();
		
	});
	
});