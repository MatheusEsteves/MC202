(function($) {
	
	var canalTemplate = {};
	canalTemplate.mainPanel = function(){
		$.holy("../templates/cadastros/canais/panel-canal.xml", {}).done(function(document){
			var panel = $.sidi.getDocumentTemplate(document);
			$('#content-info').html('');
			
			if (sidi.possuiAutorizacao('GERENCIAR_CANAIS')) {
				panel.find('#btnCadastroDeCanais').click(function(){
					panel.find('#btnCadastroDeCanais').addClass('selected');
					panel.find('#btnListaDeCanais').removeClass('selected');
					panel.find("#divNovo").show();
					panel.find("#divConsulta").hide();
				});
			}
			panel.find('#btnListaDeCanais').click(function(){
				panel.find('#btnCadastroDeCanais').removeClass('selected');
				panel.find('#btnListaDeCanais').addClass('selected');
				panel.find("#divNovo").hide();
				panel.find("#divConsulta").show();
			});
			
			$.sidi.templates.canal.searchPanel();
			$.sidi.templates.canal.insertPanel();
			
		
			$(document).ready(function(){
				panel.find('#btnListaDeCanais').click();
			});
		});
	};
	canalTemplate.searchPanel = function(){
		$.sidi.canais.buscarCanais().done(function(json) {
			json = _.sortBy(json, function(canal){ return canal.numeroDeOrdenacao; })
			$.holy("../templates/cadastros/canais/consulta-canal.xml", { canais : json }).done(function(document){
				var searchPanel = $.sidi.getDocumentTemplate(document);
				searchPanel.find('.ttip').tipsy();

				var canais = this.canais;
				$.each(canais, function(index, elemento){
					searchPanel.find('#apagarCanal_' + index).click(function(){
						$.sidi.templates.canal.removePanel(elemento);
					});
					searchPanel.find('#editarCanal_' + index).click(function(){
						$.sidi.templates.canal.editPanel(elemento);
					});
				});

				if (sidi.possuiAutorizacao('GERENCIAR_CANAIS')) {
					searchPanel.find('#salvarOrdenacao').click(function(){
						var canaisParaSalvarOrdenado = [];
						searchPanel.find('#tblCanaisCadastrados tbody tr').each(function(){
		    				canaisParaSalvarOrdenado.push(new Number($(this).attr('id')));
						});
						$.sidi.canais.salvarOrdenacao([canaisParaSalvarOrdenado]).done(function(resposta){
							$.sidi.messages.success('ordenacao-salva');
						});
					});

				}
				
				$(document).ready(function(){
					if (sidi.possuiAutorizacao('GERENCIAR_CANAIS')) {
						searchPanel.find("#tblCanaisCadastrados tbody").sortable({ handle: "td" });
						searchPanel.find("#tblCanaisCadastrados").disableSelection();
					}
				});
			});
		});
	};

	canalTemplate.insertPanel = function(){
		$.sidi.canais.buscarCanais().done(function(canais) {
			$.sidi.canais.buscarTiposCanais().done(function(json) {
				$.holy("../templates/cadastros/canais/cadastro-canal.xml", {'tiposCanais' : json, 'canais' : canais}).done(function(document){
					var insertPanel = $.sidi.getDocumentTemplate(document);
	
					insertPanel.find('#btnNovoCanal').click(function() {
							var completeFunction = function(frame) {
	
								var logo = null;
								if (frame) {
									var arquivos = jQuery.parseJSON(frame.contents().find('body').text());
									logo  = arquivos ? arquivos.logo : null;
								}
	
								var json = {};
								var form = insertPanel.find('#frmNovoCanal');
								var form2 = insertPanel.find('#frmInformacoesTecnicas');
	
								if (utils.validate(form) && utils.validate(form2)){
									utils.bind(form,json);
									utils.bind(form2,json);
									
									if(json.relacionado != 'Selecione'){
										json.relacionado = {'id' : json.relacionado};	
									} else {
										json.relacionado = null;
									}
									
									$.sidi.canais.criar([json, logo]).done(function(){
										$.sidi.messages.success('sucesso-cadastrar-canal');
										$('html, body').animate({scrollTop:0}, 'fast');
										utils.clear(form);
										utils.clear(form2);
	
										$.sidi.templates.canal.mainPanel();
									});
								}else{
									$.sidi.messages.clean();
									$.sidi.messages.error('falha-cadastrar-canal');
								}
							}
	
	
							if (insertPanel.find("input[name=logo]:visible").val()) {
								var opts = {url : '../upload', form : insertPanel.find('#frmNovoCanal')[0]};
								opts.frame = true;
								opts.complete = completeFunction;
	
								$.ajax(opts);
							} else {
								completeFunction();
							}
					});
					insertPanel.find('#frmNovoCanal').form();
					insertPanel.find('#frmInformacoesTecnicas').form({ liquid: true });
					insertPanel.find('#intervaloDoCanal').hide();
					insertPanel.find('#ckTemporario').click(function(){
						if($(this).is(':checked'))
							insertPanel.find('#intervaloDoCanal').show();
						else
							insertPanel.find('#intervaloDoCanal').hide();
					});
					
					$.sidi.applyMasks(insertPanel);
				});
			});
		});
	}

	canalTemplate.editPanel = function(elemento){
		$.sidi.canais.buscarCanais().done(function(canais){
			$.sidi.canais.buscarTiposCanais().done(function(tiposCanais){
				$.holy("../templates/cadastros/canais/alterar-canal.xml",{'canal' : elemento, 'tiposCanais' : tiposCanais, 'canais' : canais}).done(function(document){
					var editPanel = $.sidi.getDocumentTemplate(document);
					editPanel.xdialog({
						overlay: '#23557E',
						alpha: '3'
					});
					
					if (!this.canal.temporario) {
						editPanel.find('#txtEditarDataFim').val('');
						editPanel.find('#txtEditarDataInicio').val('');
					}
					
					editPanel.find('#info-canais').click(function() {
						editPanel.find('#info-tecnicas').removeClass('selected');
						$(this).addClass('selected');
						
						editPanel.find('#informacoesTecnicas').addClass('hidden');
						editPanel.find('#informacoesBasicas').removeClass('hidden');
					});
					
					editPanel.find('#info-tecnicas').click(function() {
						editPanel.find('#info-canais').removeClass('selected');
						$(this).addClass('selected');
						
						editPanel.find('#informacoesBasicas').addClass('hidden');
						editPanel.find('#informacoesTecnicas').removeClass('hidden');
					});
					
					$.sidi.applyMasks($('#popup'));
							
					editPanel.find('#frmEditarInformacoesBasicas').form();
					editPanel.find('#frmEditarInformacoesTecnicas').form();
					
					editPanel.find('.tab a').click(function(){
						editPanel.find('#frmEditarInformacoesTecnicas').form();
					});
					
					var canal = this.canal;
			
					editPanel.find('#btnRealizarEdicao').click(function() {
						var completeFunction = function(frame) {
							var logo = null;
							
							if (frame) {
								var arquivos = jQuery.parseJSON(frame.contents().find('body').text());
								logo = arquivos ? arquivos.logo : null;
							}
			
							var form = editPanel.find('#frmEditarInformacoesBasicas');
							var form2 = editPanel.find('#frmEditarInformacoesTecnicas');
							var json = {};
						
							if (utils.validate(form,"mensagemPopup") && utils.validate(form2, "mensagemPopup")) {
								utils.bind(form,json);
								utils.bind(form2,json);
								json.id = editPanel.find('#idCanal').val();
								json.cor = canal.cor;
								
								if(json.relacionado != 'Selecione'){
									json.relacionado = {'id' : json.relacionado};	
								} else {
									json.relacionado = null;
								}
								
								$.sidi.canais.salvar([json, logo]).done(function(){
									$.sidi.messages.success('sucesso-alterar-canal');
									$('html, body').animate({scrollTop:0}, 'fast');
									utils.clear(form);
									utils.clear(form2);
									editPanel.xundialog();
									$.sidi.templates.canal.mainPanel();
								});
							
							} else {
								$.sidi.messages.clean();
								$.sidi.messages.error('falha-alterar-canal','#mensagemPopup');
							}
						}
			
						if (editPanel.find('input[name=logo]:visible').val()) {
							var opts = {url : '../upload', form : $('#frmEditarInformacoesBasicas')[0]};
							opts.frame = true;
							opts.complete = completeFunction;
				
							$.ajax(opts);
						} else {
							completeFunction();
						}
			
					});
					
					editPanel.find('#ckEditarTemporario').click(function(){
						if(!editPanel.find('#ckEditarTemporario').is(':checked')) {
							editPanel.find('#txtEditarDataFim').val('');
							editPanel.find('#txtEditarDataInicio').val('');
							editPanel.find('li#intervalo').addClass('hidden')
						} else {
							editPanel.find('li#intervalo').removeClass('hidden')
						}
					});
					
					editPanel.find('#btnCancelarEdicao').click(function(){
						editPanel.xundialog();
					});
				});
			});
		});
	};

	canalTemplate.removePanel = function(elemento){
		$.holy("../templates/cadastros/canais/apagar-canal.xml",{'canalExcluir' : elemento}).done(function(document){
			var removePanel = $.sidi.getDocumentTemplate(document);
			removePanel.xdialog({
				overlay: '#23557E',
				alpha: '3',
				width: '300'
			});
			
			var canal = this.canalExcluir;
			removePanel.find('#btnRealizarExclusao').click(function(){
				$.sidi.canais.excluirCanal({arg : canal}).done(function(resposta){
					if(resposta){
						removePanel.xundialog();
						$('html, body').animate({scrollTop:0}, 'fast');
						$.sidi.messages.success('sucesso-apagar-canal');
						$.sidi.templates.canal.mainPanel();
						
					}
				});
			});
			
			removePanel.find('#btnCancelarExclusao').click(function(){
				$('#popup').xundialog();
			});
		});
	};
	
	if(!$.sidi){
		$.sidi = {};
	}
	if(!$.sidi.templates){
		$.sidi.templates = {};
	}
	
	$.sidi.templates.canal = canalTemplate;
})(jQuery);
