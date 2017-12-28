(function($) {
	
	var messageTemplate = {};
	
	messageTemplate.confirmMessage = function(opts){
		var defaultOpts = {
				titulo: "confimar"
		}
		opts = $.extend(defaultOpts, opts);
		$.holy("../templates/common/popup_message.xml", opts).done(function(document){
			var panel = $.sidi.getDocumentTemplate(document);

			$("#popup").popDialog();
			
			$('#btnConfirmar').click(function(){
				opts.confirmar(opts.entidade);
			});
			
			$('#btnCancelar').click(function(){
				if(opts.cancelar){
					opts.cancelar(opts.entidade);
				}
				$('#popup').unpopDialog();
			});
			
		});
		
	}
	
	
	if(!$.sidi){
		$.sidi = {};
	}
	if(!$.sidi.templates){
		$.sidi.templates = {};
	}
	
	$.sidi.templates.message = messageTemplate;
})(jQuery);
