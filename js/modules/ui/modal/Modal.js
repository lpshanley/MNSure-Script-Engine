_engine.module.define('ui/modal/Modal',function( config ){
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
			$props.buttons = config.buttons || ['close', 'submit'];
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
		},
		submit: () => {
			console.log('Test');
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
		$container.on('click', '.dijitDialogCloseIcon',function(){ $do.close(); });
		
		$container.on('click', '.action-set a', function(e){
			switch(this.dataset.role){
				case 'close':
					$do.close();
					break;
				case 'submit':
					$do.submit();
					break;
				default:
			}
		});
		
		if($props.live){
			$meldForm();
			$container.find('.template :input').on('keyup paste change',function(){
				$meldForm( $(this).closest('[data-id]') );
			});
		}
		
	}
	
	let $updateButtons = ( buttons ) => {
		let attachPoint = $container.find('.action-set');
		attachPoint.empty();
		
		buttons = buttons || $props.buttons;
		
		let preset = {
			submit: { label: 'Submit', role: 'submit' },
			close: { label: 'Close', role: 'close' }
		}
		
		let button = function(config) {
			
			
			if(Object.prototype.toString.call(config) === '[object String]') config = preset[config];
			if(!config) config = {};
			
			let $action = config.action || false,
					$role = config.role || false,
					$label = config.label || 'undefined',
					$template = () => `<span class="left-corner"><span class="right-corner"><span class="middle">${$label}</span></span></span>`;
			
			let $this = $('<a>');
			if($action) $this.attr('onClick', $action );
			if($role) $this.attr('data-role', $role );
			$this.html( $template );
			return $this;
		}
		
		$.each(buttons,function(key, config){
			attachPoint.append( new button(config) );
			if((buttons.length - 1) !== key) attachPoint.append($('<span class="filler">'))
		});
		
	}
	this.updateButtons = $updateButtons;
	
	let $build = () => {
		_engine.advanced.getView('modal/default.html',function( template ){ 
			let parsedHtml = $($.parseHTML( template )[0]);
			$container = parsedHtml;
			
			// Sets up the modal as requested
			$updateTitle();
			$updateContent();
			
			// Allows the modal to be moved on the screen
			$allowDragging();
			
			// Registers the modals in the nocache registry
			$register();
			
			// Sets up the button configuration
			$updateButtons();
			
			// Affix the modal to the dom and dim lights if needed
			_engine.ui.dom.dimLights();
			
			$('.modal-overlay').append( $container );
			
			// Centers the modal object
			$container.center();
			
			// Watch for user actions
			$watch();
			
		},true);
		
	}
	$build();
	
})