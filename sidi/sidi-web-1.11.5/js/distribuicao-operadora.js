distribuicaoOperadoraTemplate = (function() { 

	var template = {
			
		fields : ['status', 'headend', 'apresentacao', 'regiao', 'UF', 'nome', 'distanciaCapital', 'afiliada', 'numeroPPV'],
		initScrollableTable : function() {
			this.resizeDinamicTable($("#tabelaDinamica #headerDinamico .tabela-coluna"));
			this.ajustDinamicTable();
			var args = {
				showArrows: true,
				autoReinitialize : true
			};
	
			$('.scroll-pane').bind('jsp-initialised', function() {
				$(this).find('.jspPane').css('width', $('#tabelaDinamica').width());
			}).bind('jsp-scroll-y',	function(event, scrollPositionY, isAtTop, isAtBottom) {
				$('#tabelaFixa .scrollable .jspPane').css('top', $(this).find('.jspPane').css('top'));
			}).bind('jsp-scroll-x',	function(event, scrollPositionX, isAtTop, isAtBottom) {
				$('.scroll-pane').siblings('.tabela-cabecalho').css('left', $(this).find('.jspPane').css('left'));
			}).jScrollPane(args);
	
			$('#tabelaFixa .scrollable').bind('jsp-initialised', function(event, isScrollable) {
				$(this).find('.jspPane').css('width', $('#tabelaFixa').width()).end()
					   .find('.jspVerticalBar').remove();
	
				var maxHeight = $('#conteudoFixo').outerHeight();
				var contentHeight = $('.jspPane').outerHeight();
				$('.jspHorizontalBar').css({
				    'position' : 'absolute'
				});
			}).bind('jsp-scroll-y',	function(event, scrollPositionY, isAtTop, isAtBottom) {
				$('.scroll-pane').data('jsp').scrollToY(-$(this).find('.jspPane').position().top);
			}).jScrollPane(args);
		},
		ajustDinamicTable: function() {
			$tabelaDinamica = $('.tabela #tabelaDinamica');
			if ($tabelaDinamica.css('margin-left')) {
				var tamanhoTotal = $('.tabela').outerWidth();
				var tamanhoJaOcupado = $('.tabela #tabelaFixa').outerWidth();
				$tabelaDinamica.width(tamanhoTotal - tamanhoJaOcupado - 3);
	
				var jsp = $('.scroll-pane').data('jsp');
	
				if (jsp) {
					jsp.reinitialise();
					jsp = $('#tabelaFixa .scrollable').data('jsp');
					jsp.reinitialise();
				}
			}
		},
		resizeDinamicTable : function($component) {
			var width = 0;
	
			$component.each(function() {
				if (! $(this).hasClass('hidden'))
					width += $(this).outerWidth();
			});
	
			$('#headerDinamico.tabela-cabecalho, #conteudoDinamico').css('width', width + 1);
		},
		resizeTable : function(table) {
			var width = 0;
	
			table.find('.tabela-cabecalho .tabela-coluna').each(function() {
				if (!$(this).hasClass('hidden')) {
					width += $(this).outerWidth();
				}
			});
	
			table.width(width + 1);
		},
		defineResizableDinamico : function($component, parentSelector) {
			$component.each(function() {
				var $this = $(this);
				var id = $this.data('canal-id');
	
				$this.resizable({			
					minWidth: $this.outerWidth(),
					handles: "e",
		            helper: "resizable-helper",
		            resize: function() {
		            	var $resizableHelper = $('.resizable-helper')
	
		            	if ($('.resizable-helper', $('#tabela')).size() == 0) {
		            		$resizableHelper.remove().appendTo($('#tabela'));
		            	}
	
		        		$resizableHelper.css({
		        			'top' : 0,
		        			'left' : $resizableHelper.position().left - $('#tabela').position().left,
		        			'height' : $('#tabela').height()
		        		});
		            }, stop: function( event, ui ) {
						distribuicaoOperadoraTemplate.resizeDinamicTable($component);
						$(parentSelector + id).css("width", $this.width());
						$this.css('height', '');
	
						$('.scroll-pane').data('jsp').reinitialise();
					}
				});
			});
		},
		defineResizableFixo : function($component, parentSelector) {
			$component.filter('.headend, .apresentacao, .regiao, .nome, .afiliada').each(function() {
				var $this = $(this);
				var header = $this.data('header');
	
				$this.resizable({			
					minWidth: $this.outerWidth(),
					maxWidth: $this.hasClass('nome') ? '290' : '180',
					handles: "e",
		            helper: "resizable-helper",
		            resize: function() {
		            	var $resizableHelper = $('.resizable-helper');
	
		            	if ($('.resizable-helper', $('#tabela #tabelaFixa')).size() == 0)
		            		$resizableHelper.remove().appendTo($('#tabela #tabelaFixa'));
	
		        		$resizableHelper.css({
		        			'top' : 0,
		        			'left' : $resizableHelper.position().left - $('#tabela').position().left,
		        			'height' : $('#tabela').height()
		        		});
		            }, stop: function( event, ui ) {
						$(parentSelector + '.' + header).css("width", $this.width());
						$(parentSelector + '.' + header + ' > div.' + header).css("width", 'auto');
						$this.css('height', '').find('> div.' + header).css("width", 'auto');
	
						distribuicaoOperadoraTemplate.resizeTable($('#tabelaFixa'));
						$('#tabelaFixa .jspContainer, #tabelaFixa .jspPane, #conteudoFixo').width($('#tabelaFixa').width());
						distribuicaoOperadoraTemplate.ajustDinamicTable();
					}
				});
			});
		},
		initTabelaFixa : function(operadoras) {
			for (var j = 0; j < distribuicaoOperadoraTemplate.fields.length; j++) {
				var field = distribuicaoOperadoraTemplate.fields[j];
	
				$('<div>')
					.data('header', field)
					.attr('id', 'conteudoFixo' + j)
					.addClass('tabela-coluna ' + field)
					.appendTo($('#conteudoFixo'));
				
				$('#headerFixo .tabela-coluna.' + field).data('header', field);
			}
			$('#conteudoFixo').children().eq(0).addClass('fc');
		},
		initTabelaDinamica : function(canais) {

			canais.sort(ordernarCanais);

			for (var i = 0; i < canais.length; i++) {
				var cssClass = 'tabela-coluna ' + canais[i].nome.replace(/ /g,'') + canais[i].id;

				var $header = $('<div>')
					.data('canal-id', canais[i].id)
					.attr('id', 'headerDinamico' + canais[i].id)
					.addClass(cssClass)
					.text(canais[i].nome)
					.appendTo($('#headerDinamico'));
	
				if (canais[i].tipo != 'PPV' && sidi.possuiAutorizacao('GERENCIAR_JOGOS'))
					$header.append(distribuicaoOperadoraTemplate.getBotaoRemoverEvento(canais[i].id));
				else {
					if (sidi.possuiAutorizacao('GERENCIAR_JOGOS')) {
						$header.append(distribuicaoOperadoraTemplate.getBotaoDistribuirEvento(canais[i].id));
					}
	
					$header.addClass("ppv");
				}
	
				$('<div>')
					.data('canal-id', canais[i].id)
					.attr('id', 'conteudoDinamico' + canais[i].id)
					.addClass(cssClass)
					.appendTo($('#conteudoDinamico'));
			}
	
			$('#headerDinamico').children().eq(0).addClass('fc');
			$('#conteudoDinamico').children().eq(0).addClass('fc');
	
			$('#headerDinamico .remover-distribuicao').click(function() {
				$('#conteudoDinamico' + $(this).parent().data('canal-id') + ' div:visible')
					.removeData('evento').removeData('evento-descricao').text('').children().remove();
			});
		},
		populaConteudoFixo : function(horario, operadoras, headends, regioes) {
			var timer = (new $.Timer()).start();
			var dfd = $(distribuicaoOperadoraTemplate.fields).deach(function(i, field) {
				var coluna = $('#conteudoFixo > .' + field);
				var domStr = [];
	
				for (var j = 0; j < operadoras.length; j++) {
					var operadora = operadoras[j];
					if (horario.operadoras && horario.operadoras.length > 0) {
						var data = { field : 'operadora-id', value : operadora.id };
	
						domStr = domStr.concat(createDiv(data, operadora, field))
					}
				}
				$(domStr.join('')).appendTo(coluna);
			});
			dfd.done(function() {
				timer.end('populaConteudoFixo');
			});
			function createDiv(data, operadora, field) {
				var divStr = [];
				
				divStr.push('<div ');
				var afiliada = operadora.afiliada ? operadora.afiliada.replace(/ /g, '_') : operadora.afiliada;
				
				// classes
				divStr.push('class="');
				divStr.push(field);
				divStr.push(' uf_' + operadora.UF);
				divStr.push(' headend_' + operadora.headend);
				divStr.push(' operadora_' + operadora.id);
				divStr.push(' numeroPPV_' + operadora.numeroPPV);
				divStr.push(' regiao_' + operadora.regiao);
				divStr.push(' horario_' + horario.horario);
				divStr.push(' afiliada_' + afiliada);
				divStr.push('"');
				
				// data
				divStr.push('data-' + data.field + '="' + data.value + '"');
				divStr.push('data-header="' + field + '"');
				
				if (field == 'status') {
					var operadoraHorario = utils.findByFields(horario.operadoras, operadora.id , 'operadora');
					if (operadoraHorario) {
						var status = operadoraHorario.status;
						if (!status) {
							status = "nao-liberado";
						}
						divStr.push('data-status="' + status + '">');
						divStr.push('<div class="icone-status ' + status + '" title="' + i18n.get(status) + '"></div>');
					}
				} else {
					divStr.push('>');
				}
	
				var texto = '';
				
				if (field == 'headend' && operadora.headend) {
					texto = utils.find(headends, operadora.headend).nome;
				} else if (field == 'regiao' && operadora.regiao) {
					if (utils.find(regioes, operadora.regiao))
						texto = utils.find(regioes, operadora.regiao).nome;
				} else {
					texto = operadora[field] != null ? (operadora[field] + '') : '';
				}
							
				divStr.push(texto);
				divStr.push('</div>');
				
				return divStr;			
			};
			distribuicaoOperadoraTemplate.defineResizableFixo($("#tabelaFixa #headerFixo .tabela-coluna"), "#conteudoFixo .tabela-coluna");
			distribuicaoOperadoraTemplate.defineResizableFixo($("#conteudoFixo .tabela-coluna"), "#headerFixo ");
			
			return dfd;
		},
		populaConteudoDinamico : function(distribuicaoNoHorario, eventosDisponiveis, canais, operadoras, clubes) {
			var timer = (new $.Timer()).start();
			var operadorasEventos = distribuicaoNoHorario.operadoras;
			var horario = distribuicaoNoHorario.horario;
			var $headers = $('#headerDinamico > div');
	
			function adicionaEventosParaOperadora(headerCanal, operadorasEventos) {
				for (var i = 0; i < operadorasEventos.length; i++) {
					var operadoraEvento = operadorasEventos[i];
					var operadora = utils.find(operadoras, operadoraEvento.operadora);
	
					var data = { field : 'operadora-id', value : operadoraEvento.operadora };
					var canalIdAtual = $(headerCanal).data('canal-id');
					var canal = utils.find(canais, canalIdAtual);
	
					var eventoDoCanal = eventoParaEsteCanal(canalIdAtual, canais);
					var evento = eventoDoCanal ? eventosDisponiveis[eventoDoCanal.evento] : '';
					var conflito = eventoDoCanal ? eventoDoCanal.conflito : '';
					
					if (evento) {
						evento = evento.descricaoEventoAbreviado;
					} else {
						evento = eventoDoCanal ? eventoDoCanal.alternativo : '';
					}
	
					var $div = null;
					if (eventoDoCanal) {
						$div = createDiv(data, operadora, evento);
						$div.data('evento', eventoDoCanal.evento);
						$div.data('evento-descricao', evento);
						$div.addClass('evento_adicionado');
						$div.data('ativo', true);
					} else if (eventosDisponiveis && canal.tipo == 'PPV') {
						var eventoFantasma = eventoPorCanalEstadoHorario(canalIdAtual, horario, operadora.UF);
	
						if (eventoFantasma && utils.inArray(eventosDisponiveis[eventoFantasma.id].operadorasDisponiveis, operadora.id)) {
							$div = createDiv(data, operadora, eventoFantasma.descricaoEventoAbreviado);
							$div.addClass('disponivel');
							$div.addClass('evento_adicionado');
							$div.data('evento', eventoFantasma.id);
							$div.data('evento-descricao', eventoFantasma.descricaoEventoAbreviado);
							$div.data('ativo', false);
						}
					}
					
					if (!$div) {
						$div = createDiv(data, operadora, evento);
					}
					
					$div.data('operadora-id', operadora.id);
					$div.data('canal-id', canalIdAtual).appendTo($('#conteudoDinamico' + canalIdAtual));
					$div.addClass('canal_' + canalIdAtual);
	
					if (conflito) {
						$div.addClass('conflito_nesse_item');
						$div.attr("title", i18n.get('clique-para-habilitar-jogo'));
					}
					
					if (canal.tipo == 'PPV') {
						$div.addClass('ppv');
						if (eventoDoCanal) {
							$div.addClass('disponivel selecionado');
						}
						if (operadoraEvento.canaisPPVSelecionados >= Math.min(operadoraEvento.numEventosPPVDisponiveis, operadora.numeroPPV)) {
							$div.addClass('pronto');
						} else {
							$div.addClass('pendente');							
						}
					} else {
						if (sidi.possuiAutorizacao('GERENCIAR_JOGOS')) {
							if (evento) {
								$div.append(distribuicaoOperadoraTemplate.getBotaoRemoverEvento(operadora.id, true));
							}
							$div.click(selecionaEvento);
						}
					}
					
					if (operadoraEvento.temConflito) {
						$('.operadora_' + operadora.id).each(function() {
							$(this).addClass("conflito");
						});
					}
				}
	
				function selecionaEvento() {
					var $this = $(this);
					var operadoraId = $this.data('operadora-id');
					var canalIdAtual =  $this.data('canal-id');
					var eventoId = $this.data('evento') || 0;
					var eventoAlternativo = eventoId == 0 ? $this.text() : undefined;
	
					$.getJSON('../sidi/distribuicao/buscaEventosPossiveisPara', {arg : [$(this).data('horario'), operadoraId, canalIdAtual]}, function(eventosIds) {
						var eventos = [];
						for (var i = 0; i < eventosIds.length; i++) {
							var evento = eventosDisponiveis[eventosIds[i]];
							evento.id = eventosIds[i];
							eventos.push(evento);
						}
						$.holy("../templates/distribuicao/selecao-jogos-operadora-novo.xml", {
							eventosDisponiveis : eventos,
							clubes : clubes,
							canalId : canalIdAtual,
							operadoraId : operadoraId,
							eventoId : eventoId,
							eventoAlternativo: eventoAlternativo
						});
					});
				}
	
				function eventoParaEsteCanal(canalIdAtual, canais) {
					for (var j = 0; j < canais.length; j++) {
						if (canalIdAtual == canais[j].id) {
							return operadoraEvento.eventoPorCanal[canais[j].id];
						}
					}
					return { evento : undefined, conflito : false};
				};
	
				function eventoPorCanalEstadoHorario(pCanal, pHorario, pEstado) {
					for (var key in eventosDisponiveis) {
						var item = eventosDisponiveis[key];
						if (item.data == pHorario) { 
							for (var k = 0; k < item.canaisDisponiveis.length ; k++) {
								var canal = item.canaisDisponiveis[k];
								if (canal == pCanal) {
									for (var j = 0; j < item.estadosPossiveis.length ; j++) {
										var estado = item.estadosPossiveis[j];
										if (pEstado == estado) {
											return item;
										}
									}
									break;
								}
							}
						}
					}
					return null;
				};
	
				function createDiv(data, operadora, text, click) {
					var div = $('<div>').data(data.field, data.value)
										.data('horario', horario)
										.text(text ? text + '' : '');
					if (click) {
						div.click(click);
					}
	
					var afiliada = operadora.afiliada ? operadora.afiliada.replace(/ /g, '_') : operadora.afiliada;
					div.addClass('operadora_' + operadora.id);
					div.addClass('uf_' + operadora.UF);
					div.addClass('headend_' + operadora.headend);
					div.addClass('numeroPPV_' + operadora.numeroPPV);
					div.addClass('regiao_' + operadora.regiao);
					div.addClass('horario_' + horario);
					div.addClass(' afiliada_' + afiliada);
				
					return div;
				};
			};
	
			var dfd = $($headers).deach(function(i, headerCanal) {
				adicionaEventosParaOperadora(headerCanal, operadorasEventos);
			});
			dfd.done(function() {
				timer.end('populaConteudoDinamico');
				distribuicaoOperadoraTemplate.defineResizableDinamico($("#tabelaDinamica #conteudoDinamico .tabela-coluna"), "#headerDinamico");
				distribuicaoOperadoraTemplate.defineResizableDinamico($("#tabelaDinamica #headerDinamico .tabela-coluna"), "#conteudoDinamico");
			});
			return dfd;
		},
		getBotaoRemoverEvento : function(sufixoParaId, clique) {
			var botao = $('<a id="remover_operadora_' + sufixoParaId + '" href="javascript:void(0)" class="remover-distribuicao cancel ttip" title="' + i18n.get('clique-para-remover-jogo') + '" />');
			if (clique)
				botao.click(function() {
					$(this).parent().text('').removeData('evento').removeData('evento-descricao').end()
						.remove();
					return false;
				});
	
			return botao;
		},
		getBotaoDistribuirEvento : function(sufixoParaId) {
			var botao = $('<a id="editar_ppv_' + sufixoParaId + '" href="javascript:void(0)" class="editar-ppv okay ttip" title="' + i18n.get('clique-para-editar-coluna') + '"/>');
			return botao;
		},
		abrePopUpColunas : function(canais) {
			$.holy("../templates/distribuicao/seletor-colunas.xml", {canais : canais});
		},
		aplicarFiltros : function() {
			var classes = [];
			$('.filtro-operadora-novo').each(function() {
				if ($(this).val() != '') {
					if ($(this).attr("type") != 'checkbox' || $(this).attr("checked")) {
						classes.push($(this).val());
					}
				}
			});
			
			distribuicaoOperadoraTemplate.filtrar(classes);
	
			$('#filtroOperadora option').slice(1).show().each(function() {
				var $this = $(this);
				if (($('#filtroEstado').val() != '' && $this.data('uf') != $('#filtroEstado').val()) ||	
					($('#filtroHeadendOperadora').val() != '' && $this.data('headend') != $('#filtroHeadendOperadora').val()) ||
					($('#filtroRegiao').val() != '' && $this.data('regiao') != $('#filtroRegiao').val()))
					$this.hide();
			});
	
			var jsp = $('.scroll-pane').data('jsp');
	
			if (jsp) {
				var css = utils.getPropriedadeClasseCSS;
				var alturaTabelaFixa = Math.min(css('tabela-fixa', 'height').replace('px', ''), $('.jspPane').outerHeight());
				var alturaTabelaDinamica = Math.min(css('tabela-dinamica', 'height').replace('px', ''), alturaTabelaFixa + $('.jspHorizontalBar').outerHeight());
	
				$('#tabelaFixa').height(alturaTabelaFixa);
				$('#tabelaDinamica').height(alturaTabelaDinamica);
	
				jsp.scrollToY(0);
				jsp.reinitialise();
				jsp = $('#tabelaFixa .scrollable').data('jsp');
				jsp.scrollToY(0);
				jsp.reinitialise();
			}
	
	//		$('#download').removeAttr('href');
	//		$('#download').attr('href', '../sidi/planilha?data=' +  date.stringToDate($("#dataEventos").val()).getTime() + '&operadora=' + $("#filtroOperadora").val().replace('operadora_', '') + '&horario=' + $("#filtroHorario").val().replace('horario_', ''));
			$('#download').attr('href', '../sidi/planilha?data=' +  date.stringToDate($("#dataEventos").val()).getTime());
	
	
			$.popLoading();
		},
		filtrar : function(classes) {
			$('#conteudoFixo .tabela-coluna div, #conteudoDinamico .tabela-coluna div').not('.hidden, .ui-resizable-e').not('.icone-status').hide();
			var seletorFixo = ['#conteudoFixo .tabela-coluna div'];
			var seletorDinamico = ['#conteudoDinamico .tabela-coluna div'];
	
			for (var i = 0; i < classes.length; i++) {
				seletorFixo.push('.');
				seletorFixo.push(classes[i]);
				seletorDinamico.push('.');
				seletorDinamico.push(classes[i]);
			}
			seletorFixo.push(',');
	
			$(seletorFixo.concat(seletorDinamico).join('')).not('.hidden').filter(filtroNumeroPPV.join('')).show();
		},
		buscarDistribuicaoDoHorario : function(horario, distribuicaoJson) {
			$.getJSON('../sidi/distribuicao/buscarDistribuicaoDoHorario', {arg : horario}, function(json) {
				for (var i = 0; i < distribuicaoJson.distribuicaoOperadora.horarios.length; i++) {
					if (distribuicaoJson.distribuicaoOperadora.horarios[i].horario == horario) {
						distribuicaoJson.distribuicaoOperadora.horarios[i] = json;
					} else {
						distribuicaoJson.distribuicaoOperadora.horarios[i].operadoras = [];
						distribuicaoJson.distribuicaoOperadora.horarios[i].eventosDisponiveis = [];
					}
				}
		
				$('#popup').xundialog();
				$.holy('../templates/distribuicao/distribuicao-operadoraNovo.xml', {'distribuicaoJson' : distribuicaoJson});
			});
		},
		ocultarColunas : function() {
			$($.cookie('distribuicao-seletor-coluna-oculto')).addClass('hidden').hide();
			$($.cookie('distribuicao-seletor-coluna-visivel')).removeClass('hidden').show();
	
			distribuicaoOperadoraTemplate.resizeTable($('#tabelaFixa'));
			$('#tabelaDinamica').width(Math.min($('.tabela').innerWidth() - $('#tabelaFixa').outerWidth(), $('#tabelaDinamica').outerWidth()) - 1);
	
			$('#tabelaFixa .jspContainer, #tabelaFixa .jspPane, #conteudoFixo').width($('#tabelaFixa').width());
			$('#tabelaDinamica').width($('#tabela').width() - $('#tabelaFixa').width() - 2);
			distribuicaoOperadoraTemplate.resizeDinamicTable($("#tabelaDinamica #headerDinamico .tabela-coluna"));
			distribuicaoOperadoraTemplate.resizeDinamicTable($("#tabelaDinamica #conteudoDinamico .tabela-coluna"));
	
			if ($('.scroll-pane').data('jsp'))
				$('.scroll-pane').data('jsp').reinitialise();
		}
	};
	
	 var ordernarCanais = function (x,y) {
      return x.numeroDeOrdenacao - y.numeroDeOrdenacao; 
    }

	return template;
})();