(function($) {
	
	var mosaicoTemplate = {};

	mosaicoTemplate.novoMosaico = function(modalInstance){
		openForm({}, modalInstance);
	};

	mosaicoTemplate.editarMosaico = function(modalInstance, context){
		if(context.canais && $.isArray(context.canais)) {
			context.canalEvento = context.canais[0];
		}
		openForm(context, modalInstance);
	};
	
	var openForm = function(context, modalInstance){
		$.when($.sidi.canais.buscarCanalPorTipo({arg : JSON.stringify(['PPV', 'PPV_SD'])}), $.sidi.mosaicos.divisoes()).done(function(canaisResponse, divisoesResponse){
			if(!context.evento){
				context.evento = {}
			}
			if(!context.canalEvento){
				context.canalEvento = {};
			}
			context.canais= canaisResponse[0];
			context.divisoes= divisoesResponse[0];
			$.holy("../templates/distribuicao/tabular/tabular-novo-mosaico.xml", context).done(function(document){
					$(".tab").tabPanel();
					var self = this;
					var panel = $.sidi.getDocumentTemplate(document);
					$.holy("../templates/distribuicao/tabular/info-operadora.xml",{evento: context.evento}).done(function(){
						panel.find('#frmNovoMosaico').form();
						panel.find('#frmInfoOperadora').form();
						$.sidi.applyMasks(panel);
					
						panel.find('#btnCancelarNovoMosaico').click(function(){
							modalInstance.cancel();
						});
					
					
						panel.find('#btnCriarNovoMosaico').click(function() {
							if (utils.validate(panel.find('#frmNovoMosaico'), 'mensagemPopup')) {
								var values = bindFields(self, panel.find('#frmNovoMosaico'));
								values.evento = $.extend(values.evento, utils.bind(panel.find('#frmInfoOperadora')))								
								$.sidi.distribuicao.salvarDistribuicaoTabularMosaico(values).done(function() {
									var msg = 'sucesso-criar-mosaico'
									if(context.evento.id != null){
										msg = 'sucesso-alterar-mosaico'
									}
									$('.message').message(i18n.get(msg), 'success', true);
									$('html, body').animate({scrollTop:0}, 'fast');
									modalInstance.close();
								});
							}
						});
						modalInstance.open($.sidi.getTemplateSelector(document),{width: '750'})
					});
			});
		});
		
	}
	
	var bindFields = function(self, form){
		
		var result = {};
		
		result.evento = self.evento ? self.evento : {};
		result.evento = $.extend(result.evento, utils.bind(form))
		
		var canal = getCanalById(form.find('select[name=canal]').val(), self.canais);
		
		var dateInput = form.find('input[name=data]');
		
		var horaEfetivaInput = form.find('input[name=efetivo]');
		result.evento.data = getDateHour(dateInput, horaEfetivaInput).getTime();
		
		var horaAberturaInput = form.find('input[name=aberturaSinal]');
		result.evento.aberturaSinal = getDateHour(dateInput, horaAberturaInput).getTime();
		
		var horaFechamentoInput = form.find('input[name=fechamentoSinal]');
		result.evento.fechamentoSinal = getDateHour(dateInput, horaFechamentoInput).getTime();
		result.evento.tipoEvento = "MOSAICO";
		
		result.canais = [canal];
		
		return result;
	}
	
	var getCanalById = function(canalId, canais){
		for(i in canais){
			canal = canais[i]
			if(canal.id == canalId){
				return canal;
			}
		}
	}
	
	var getDateHour = function(dateInput, hourInput){
		var data = date.stringToDate(dateInput.val());
		var hora = hourInput.val().split(':')[0];
		var min  = hourInput.val().split(':')[1];
		data.setMinutes(min);
		data.setHours(hora);
		return data;
	}
	
	if(!$.sidi){
		$.sidi = {};
	}
	if(!$.sidi.templates){
		$.sidi.templates = {};
	}
	
	$.sidi.templates.mosaico = mosaicoTemplate;
})(jQuery);
