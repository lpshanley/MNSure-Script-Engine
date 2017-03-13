_engine.module.define('ui/dom/modal/Modal',function( config ){
	config = config || {};
		
	let $id = Math.ceil( Math.random() * 100000000 ),
			$contents = (msg) => $.parseHTML('<div class="mns-modal-template"><span class="mns-input-group"><span class="mns-input-label mns-input-infotext">' + msg + '</span></span></div>')[0],
			$container = null,
			$props = {};
			
			/* Build Props */
			$props.role = config.role || null;
			$props.text = config.text || 'No defined html template was passed.';
			$props.html = config.html || $contents( $props.text );
			$props.title = config.title || 'DEFAULT MODAL TITLE';
			$props.buttons = config.buttons || ['Close'];
			$props.live = config.live || false;
			
	let $updateTitle = ( title ) => {
		title = title || $props.title;
		$container.find('.dijitDialogTitle').text( title );
	}
	this.updateTitle = $updateTitle;
	
	let $updateContent = ( html ) => {
		if(!html) html = $props.html;
		else {
			if( Object.prototype.toString.call( $.parseHTML(html)[0] ) === "[object Text]")
				html = $contents(html);
			$props.html = html;
		}
		$container.find('.modal-content-container').html( $props.html );
	}
	this.updateContent = $updateContent;
	
	let $meldForm = (ele) => {
		
		let list = ele || $container.find('[data-id]');
		
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

				// Do show/hide on dual validation
			if($(v).is('select')){
				$.each($container.find('[data-showif]'),function(k,v){
					let item = v.dataset.showif.split(/[:\/|$\\=]/g);
					if(item.length === 2 && item[0] === id){
						if( item[1] === test.val() ) $(v).show();
						else $(v).hide();
					} 
				});
			}
				// Do show/hide on single validation elements
			else
				isValid ?
					$container.find(`[data-showif="${ id }"]`).show():
					$container.find(`[data-showif="${ id }"]`).hide();
				
		});
	}
	
	let $register = () => _engine.storage.nocache.query('modal')[$id] = this;
	
	let $do = {
		show: () => { $container.removeClass('hidden') },
		hide: () => { $container.addClass('hidden') },
		close: () => {
				// Remove watchers
			$container.off();
				// Remove from DOM
			$container.remove();
				// Remove from registry
			delete _engine.storage.nocache.data.modal[$id];
				// Toggle lights
			_engine.ui.dom.dimLights();
		}
	}
	this.action = $do;
	
	let $allowDragging = () => {
		$container.draggable({
			handle: 'div.modal-titlebar',
			stack: '.dijitDialog',
			containment: '.modal-overlay'
		});
	}
	
	let $watch = () => {
		 /* Watch for closure */
		$container.on('click', '.dijitDialogCloseIcon',function(e){ $do.close(); });
		
		if($props.live){
			$container.find('.template :input').on('keyup paste change',function(){
				$meldForm( $(this).closest('[data-id]') );
			});
		}
		
	}
	
	let $setupButtons = () => {
		
		console.log( $container.find('.action-set') );
		
	}
	this.newBtn = $setupButtons;
	
	let $build = () => {
		_engine.advanced.getView('modal/default.html',function( template ){ 
			let parsedHtml = $($.parseHTML( template )[0]);
			$container = parsedHtml;
			
			// Sets up the modal as requested
			$updateTitle();
			$updateContent();
			if($props.live) $meldForm();
			
			// Allows the modal to be moved on the screen
			$allowDragging();
			
			// Registers the modals in the nocache registry
			$register();
			
			// Centers the modal object
			$container.center();
			
			// Sets up the button configuration
			$setupButtons();
			
			// Affix the modal to the dom and dim lights if needed
			_engine.ui.dom.dimLights();
			$('.modal-overlay').append( $container );
			
			// Watch for user actions
			$watch();
			
		},true);
		
	}
	$build();
	
})