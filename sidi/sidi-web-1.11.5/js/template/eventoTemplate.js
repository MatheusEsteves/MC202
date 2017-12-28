(function($) {
	
	var eventoTemplate = {};

	eventoTemplate.novoEvento = function(modalInstance){
		openForm({}, modalInstance);
	};
	
	eventoTemplate.editarEvento = function(modalInstance, context){
		if(!context){
			context = {}
		}
		context.title = ''
		openForm(context, modalInstance);
	}

	var openForm = function(context, modalInstance){
		if(!context.evento){
			context.evento = {}
		}
		$.holy("../templates/distribuicao/tabular/tabular-novo-evento.xml",context).done(function(document){
			var self = this;
			var panel = $.sidi.getDocumentTemplate(document);
			panel.find(".tab").tabPanel();
			$.holy("../templates/distribuicao/tabular/info-operadora.xml",context).done(function(){
				
				panel.find('#frmNovoEvento').form();
				panel.find('#frmInfoOperadora').form();
				$.sidi.applyMasks(panel);
				
				$('#btnCancelarNovoEvento').click(function(){
					modalInstance.cancel();
				});
				
				$('#btnCriarNovoEvento').click(function() {
					var evento = self.evento ? self.evento : {};
					
					if (utils.validate($('#frmNovoEvento'), 'mensagemPopup')) {
						evento = $.extend(evento, utils.bind(panel.find('#frmNovoEvento')))
						evento = $.extend(evento, utils.bind(panel.find('#frmInfoOperadora')))
						
						var data = date.stringToDate($('#frmNovoEvento input[name=data]').val());
						var hora = $('#frmNovoEvento input[name=inicio]').val().split(':')[0];
						var min  = $('#frmNovoEvento input[name=inicio]').val().split(':')[1];
						data.setMinutes(min);
						data.setHours(hora);
						
						evento.data = data.getTime();
						evento.tipoEvento = "EVENTO";
						var values = {
								evento: evento,
								canais: context.canais
						}
						
						$.sidi.distribuicao.salvarDistribuicaoTabular(values).done(function(result) {
							modalInstance.close(result);
							var msg = 'sucesso-criar-evento'
								if(evento.id != null){
									msg = 'sucesso-alterar-evento'
								}
							$('.message').message(i18n.get(msg), 'success', true);
							$('html, body').animate({scrollTop:0}, 'fast');
						});
					}
				});
				modalInstance.open($.sidi.getTemplateSelector(document),{width: '750'})
			});
		});
	};
	
	if(!$.sidi){
		$.sidi = {};
	}
	if(!$.sidi.templates){
		$.sidi.templates = {};
	}
	
	$.sidi.templates.evento = eventoTemplate;
})(jQuery);
