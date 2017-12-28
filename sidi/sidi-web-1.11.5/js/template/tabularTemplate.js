(function($) {
	
	var tabularTemplate = {};
	tabularTemplate.mainPanel = function(){
		$.sidi.campeonatos.buscarCampeonatos().done(function(json) {
			$.holy("../templates/distribuicao/tabular/distribuicao-tabular.xml", {'campeonatos' : json}).done(function(document){
				var panel = $.sidi.getDocumentTemplate(document);
				styleForm(panel);
				panel.find('#btnFiltroEdicaoTabular').click(function() {
					filtrarResultado(utils.bind(panel.find('#filtroEdicaoTabular form')));
					return false;
				});
				panel.find('#btnExportarEventos').click(function(){
					exportarResultado(utils.bind(panel.find('#filtroEdicaoTabular form')));
					return false;
				});
				panel.find('#btnFiltroNovoEvento').click(function() {
					$.sidi.modal.open($.sidi.templates.evento.novoEvento);
					return false;
				});
				panel.find('#btnFiltroNovoMosaico').click(function() {
					$.sidi.modal.open($.sidi.templates.mosaico.novoMosaico);
					return false;
				});
				
				panel.find('#btnNotificarPrevia').click(function(){						
					$.sidi.modal.open($.sidi.templates.notificacaoPreview.notificar);
					return false;
				});				
			});
		});
	};
	
	tabularTemplate.selecionarCanais = function(modalInstance, context){
		$.getJSON('../sidi/distribuicao/buscarCanaisPossiveisPara', {arg : context.distribuicao.evento.id}, function(canais) {
			context.canais = canais;
			$.holy("../templates/distribuicao/tabular/popupcanal.xml", context).done(function(document){
				$("#selecaoCanalDialogTabular ul.listaCanais li").corner();
				modalInstance.open($.sidi.getTemplateSelector(document), {overlay: '#333',width: 800});
				
				$("#selecaoCanalDialogTabular ul.listaCanais li").click(function() {
					var id = $(this).data('canal');
					var canal = recuperarCanal(context.canais, id);
					var chk = $(this).find('input[type=checkbox]')[0];
					chk.checked = !chk.checked;
					if(canal.relacionado){
						var relacionado = $("#selecaoCanalDialogTabular ul.listaCanais li[data-canal="+canal.relacionado.id+"]");
						relacionado.find('input[type=checkbox]')[0].checked = chk.checked;
					}	

					if (chk.checked) {
						$(this).addClass('selecionado');
						if(relacionado){
							relacionado.addClass('selecionado');
						}
					} else {
						$(this).removeClass('selecionado');
						if(relacionado){
							relacionado.removeClass('selecionado');
						}
					}
				});

				var canais = this.canais;
				var distribuicao = this.distribuicao;

				$('#selecaoCanalDialogTabular .btSave').click(function() {
					distribuicao.canais = [];
					$.each(canais, function() {
						var chk = $('#selecaoCanalDialogTabular #canal_tabular_' + this.id)[0];
						if (chk.checked) {
							distribuicao.canais.push(this);
						}
					});
					
					$.sidi.distribuicao.salvarDistribuicaoTabular(distribuicao).done(function(){
						modalInstance.close();
					});
				});
				
				$('#selecaoCanalDialogTabular .btCancel').click(function(){
					modalInstance.cancel();
				});
				
			});
		});
	}

	tabularTemplate.tabular = function(filtro){
		var data = {arg : JSON.stringify(filtro)}
		$.sidi.distribuicao.buscarDistribuicaoTabular(data).done(function(result){
			$.holy("../templates/distribuicao/tabular/tabular-jogos.xml", {'dataDistribuicoes' : result}).done(function(document){
				var panel = $.sidi.getDocumentTemplate(document);
				var distribuicoes = this.dataDistribuicoes;
				styleResult(panel);
			
				$.each(distribuicoes, function(index, element) {
					var div = panel.find('#distDate_'+index);
					
					$.each(element,function(index, distribuicao){
						var eventoId = distribuicao.evento.id
						div.find('.jogo-tabular-' + eventoId).data('distribuicao', this);

						div.find('#adicionar_canal_' + eventoId).click(function() {
							$.sidi.modal.open($.sidi.templates.tabular.selecionarCanais,{distribuicao: distribuicao}).done(function(){
								filtrarResultado(utils.bind($('#filtroEdicaoTabular form')))
							});
							return false;
						});
						
						div.find('#apagar_evento_' + eventoId).click(function() {
							return apagarEventoGenerico(distribuicao.evento);
						});
						
						div.find('#editar_' + eventoId).click(function() {
							return editarEventoGenerico(distribuicao);
						});
						delete distribuicao;
					});
				});
			});
		});
		
	};
	
	var apagarEventoGenerico = function(evento){
		if(evento.tipoEvento == "EVENTO"){
			return apagarEvento(evento)
		}else if(evento.tipoEvento == "MOSAICO"){
			return apagarMosaico(evento)
		}
		return false;
		
	}
	
	var editarEventoGenerico = function(distribuicao){
		if(distribuicao.evento.tipoEvento == "MOSAICO"){
			return abrirEditar($.sidi.templates.mosaico.editarMosaico, distribuicao)
		}else if(distribuicao.evento.tipoEvento == "EVENTO"){
			return abrirEditar($.sidi.templates.evento.editarEvento, distribuicao)
		}else if(distribuicao.evento.tipoEvento == "JOGO"){
			return abrirEditar($.sidi.templates.jogo.editarJogo, distribuicao)
		}
		return false;
		
	}
	
	var recuperarCanal = function(canais, id){
		for(i in canais){
			canal = canais[i];
			if(canal.id === id){
				return canal;
			}
		}
	}
	
	var apagarEvento = function(evento){
		var opts = {
			titulo: 'apagar-evento',
			mensagem : {texto: 'confirmacao-apagar-evento',
				params: evento.nome
			},
			entidade: evento,
			confirmar: function(entidade){
				$.postJSON("../sidi/eventos/apagarEvento", entidade.id, function(json) {
					$('#popup').unpopDialog();
					filtrarResultado(utils.bind($('#filtroEdicaoTabular form')))
					$('.message').message(i18n.get('sucesso-apagar-evento'), 'success', true);
				});
			}
		}
		$.sidi.templates.message.confirmMessage(opts)
		return false;
		
	}
	
	var abrirEditar = function(templateFunction, distribuicao){
		$.sidi.modal.open(templateFunction, {evento : distribuicao.evento, canais:distribuicao.canais}).done(function(){
			filtrarResultado(utils.bind($('#filtroEdicaoTabular form')))
		});
	}

	var apagarMosaico = function(evento){
		var opts = {
			titulo: 'apagar-mosaico',
			mensagem : {texto: 'confirmacao-apagar-mosaico',
				params: evento.nome
			},
			entidade: evento,
			confirmar: function(entidade){
				$.sidi.mosaicos.apagarMosaico(entidade.id).done(function(json) {
					$('#popup').unpopDialog();
					filtrarResultado(utils.bind($('#filtroEdicaoTabular form')))
					$('.message').message(i18n.get('sucesso-apagar-mosaico'), 'success', true);
				});
			}
		}
		$.sidi.templates.message.confirmMessage(opts)
		return false;
		
	}
	
	var filtrarResultado = function(filtro){
		filtro['campeonatoId'] = isNaN(filtro['campeonatoId']) ? null : parseInt(filtro['campeonatoId']); 
		if (!filtro.inicio || !filtro.fim || filtro.inicio <= filtro.fim) {
			
			$.sidi.distribuicao.buscarQuantidadeDistribuicaoTabular({arg : JSON.stringify(filtro)}).done(function(resultado) {
				if (resultado.quantidade <= resultado.limite) {
					$.sidi.templates.tabular.tabular(filtro)
				} else {
					$('.message').message(i18n.get('muitos-resultados', resultado.quantidade), 'error', true);
					$('html, body').animate({scrollTop:0}, 'fast');
				}
			});
		} else {
			$('.message').message(i18n.get('data-inicial-final-invalida'), 'error', true);
			$('html, body').animate({scrollTop:0}, 'fast');
		}
		return false;
	}
	
	var exportarResultado = function(filtro){
		
		if ((filtro.inicio != null && filtro.fim != null) && filtro.inicio <= filtro.fim) {
			filtro['campeonatoId'] = isNaN(filtro['campeonatoId']) ? null : parseInt(filtro['campeonatoId']);
			
			$.sidi.distribuicao.buscarQuantidadeDistribuicaoTabular({arg : JSON.stringify(filtro)}).done(function(resultado) {
				var idCampeonato = filtro.campeonatoId;
				var dataInicial = filtro.inicio;
				var dataFinal = filtro.fim;
				
				obterPlanilha(dataInicial, dataFinal, idCampeonato);			
			});
			
		} else {
			$('.message').message(i18n.get('preencha-data-exportacao'), 'error', true);
			$('html, body').animate({scrollTop:0}, 'fast');
		}		
	}
	
	var obterPlanilha = function(inicio, fim, idCampeonato){
		
		var form = $('<form></form>').attr('action', '../sidi/planilhaEventos').attr('method', 'post');
	    form.append($("<input></input>").attr('type', 'hidden').attr('name', 'inicio').attr('value', inicio));
	    form.append($("<input></input>").attr('type', 'hidden').attr('name', 'fim').attr('value', fim));
	    form.append($("<input></input>").attr('type', 'hidden').attr('name', 'idCampeonato').attr('value', idCampeonato));	    
	    form.appendTo('body');
	    form.submit();
	    form.remove();		
	}
	
	var styleResult = function(panel){
		$('.ttip').tipsy();
		$('#divTblJogosTabular table').datatable();
		$(".floatscroll").floatScroll(".container-table-scroll");
		
	}

	var styleForm = function(panel){
		panel.find('#filtroEdicaoTabular').togglePanel();
		panel.find('#filtroEdicaoTabular form').form({ liquid: true });
		panel.find('#filtroEdicaoTabular form [title]').tipsy({trigger: 'focus', gravity: 'w', fade: true});

		panel.find('input:text').setMask();
		panel.find('.data').datepicker();
		
	}
	
	if(!$.sidi){
		$.sidi = {};
	}
	if(!$.sidi.templates){
		$.sidi.templates = {};
	}
	
	$.sidi.templates.tabular = tabularTemplate;
})(jQuery);
