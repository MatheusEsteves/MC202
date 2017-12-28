(function($) {
	
	var jogoTemplate = {};

	jogoTemplate.editarJogo = function(modalInstance, context){
		openForm(context, modalInstance);
	}

	var openForm = function(context, modalInstance){
		if(!context.evento){
			context.evento = {}
		}
		$.sidi.jogos.todosEstadios().done(function(estadios){
			context.estadios = estadios;
			$.holy("../templates/distribuicao/tabular/tabular-edit-jogo.xml",context).done(function(document){
				var self = this;
				var panel = $.sidi.getDocumentTemplate(document);
				panel.find(".tab").tabPanel();
				
				$.holy("../templates/distribuicao/tabular/info-operadora.xml",context).done(function(){
					panel.find('form').form();
					$.sidi.applyMasks(panel);
					
					var estadioAC = [];
					$(this.estadios).each(function() {
						estadioAC.push({"label": this.nomePopular, "value": this.id});
					});
					$('#frmEditJogo input.estadio ').sidiAutocomplete({source: estadioAC}, this.estadios);
					
					$('#btnCancelarEditJogo').click(function(){
						modalInstance.cancel();
					});
					
					$('#btnCriarEditJogo').click(function() {
						var evento = self.evento ? self.evento : {};
						if (utils.validate($('#frmEditJogo'), 'mensagemPopup')) {
							evento = $.extend(evento, utils.bind(panel.find('#frmEditJogo')))
							evento = $.extend(evento, utils.bind(panel.find('#frmInfoOperadora')))
							
							var data = date.stringToDate($('#frmEditJogo input[name=data]').val());
							var hora = $('#frmEditJogo input[name=hora]').val().split(':')[0];
							var min  = $('#frmEditJogo input[name=hora]').val().split(':')[1];
							data.setMinutes(min);
							data.setHours(hora);
							
							evento.data = data.getTime();
							
							var result = {
									evento: evento,
									canais: context.canais
							};
							
							
							$.sidi.distribuicao.salvarDistribuicaoTabular(result).done(function() {
								$('.message').message(i18n.get('sucesso-alterar-jogo'), 'success', true);
								$('html, body').animate({scrollTop:0}, 'fast');
								modalInstance.close();
							});
							
						}
					});
					modalInstance.open($.sidi.getTemplateSelector(document),{width: '750'})
				});
			});
		});
	};
	
	if(!$.sidi){
		$.sidi = {};
	}
	if(!$.sidi.templates){
		$.sidi.templates = {};
	}
	
	$.sidi.templates.jogo = jogoTemplate;
})(jQuery);
