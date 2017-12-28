(function($) {
		
	Dialog = {}
	
	distribuicao = {
		validaCampeonatoClube: function(distribuicaoJson, jogo) {
			for (var i in distribuicaoJson.campeonatoClubes) {
				var campeonatoClube = distribuicaoJson.campeonatoClubes[i];
				if (campeonatoClube.campeonato.id == jogo.fase.campeonato.id) {
					if (jogo.mandante.id == campeonatoClube.clube.id || 
						jogo.visitante.id == campeonatoClube.clube.id) {
						return true;
					}
				}
			}
			return false;
		},
		buscarDistribuicao : function(distribuicoesOperadora, canal, horario) {
			for (var i = 0; i < distribuicoesOperadora.length ; i++) {
				var dist = distribuicoesOperadora[i];
				if ((dist.canal.id == canal.id || dist.canal.id === canal)&& (!horario || (dist.horario == horario))) {
					return dist;
				}
			};
			return null;
		},
		buscarDistribuicaoPrincipal : function(distribuicoes, canal, evento) {
			for (var i = 0; i < distribuicoes.length ; i++) {
				var dist = distribuicoes[i];
				if ((dist.canal.id == canal.id || dist.canal.id === canal) && (!evento || (dist.evento.id == evento || dist.evento.id == evento.id))) {
					return dist;
				}
			};
			return null;
		},
		buscarJogo : function(distribuiceoesPrincipais, canalId, horario, estado) {
			for (var i = 0; i < distribuiceoesPrincipais.length ; i++) {
				var dist = distribuiceoesPrincipais[i];
				if (dist.canal.id == canalId) {
					for (var j = 0; j < dist.eventos.length ; j++) {
						var jogoVO = dist.eventos[j];
						if (estado) {
							if (jogoVO.evento.data == horario) {
								if (jQuery.inArray(estado, jogoVO.estadosSelecionados) >= 0) {
									return jogoVO.evento;
								}
							}
						} else {
							if (jogoVO.evento.data == horario) {
								return jogoVO.evento;
							}
						}
					}
				}
			}
			return null;
		},
		removerJogoDistribuicaoOperadora: function(distOp, canalId, horario) {
			for (var i = 0; i < distOp.distribuicoes.length ; i++) {
				var dist = distOp.distribuicoes[i];
				if (dist.canal && dist.canal.id == canalId && dist.evento && dist.evento.data == horario) {
					distOp.distribuicoes = utils.remove(distOp.distribuicoes, i);
					return dist.evento;
				}
			}
		},
		filtrar : function() {
		
			var todos = $('#chkTodosCanais').is(":checked");
			var filtro = utils.bind($('#filtrosOperadoras'), {});
			
			distribuicao.esconderColunas();
			
			$('.lista-de-exibicao div table tbody tr').hide();
			var seletor = '.lista-de-exibicao div table tbody tr';

			$.each(filtro, function(chave, valor) {
				if (valor && (typeof valor) == 'string') {
					seletor += '.' + chave + '_' + valor;
				}
			});

			if ($('#conflito')[0].checked) {
				seletor += '.conflito';
			}
			
			var seletorBusca = [];
			
			if(todos){
				$('#filtrosOperadoras .chk_num_canais').each(function() {
					seletorBusca.push(seletor + '.num_canais_ppv_' + this.value);
				});
			} else {
				$('#filtrosOperadoras .chk_num_canais').each(function() {
					if (this.checked) {
						seletorBusca.push(seletor + '.num_canais_ppv_' + this.value);
					}
				});
			}
			
			$(seletorBusca.join(', ')).show();
			$("#div-status").trigger("gsat.update");
		},
		esconderColunas: function() {
			$('.checkbox-picker ul li input:checkbox').each(function() {
				var canalId = $(this).val();
				if (this.checked) {
					$('.lista-de-exibicao .container-table-scroll table tr .coluna_canal_' + canalId).show();
				} else {
					$('.lista-de-exibicao .container-table-scroll table tr .coluna_canal_' + canalId).hide();
				}
			});
		}, 
		reduzirTamanho: function(str, tamanho) {
			if (!str) {
				return '';
			}
			if (str.length > (tamanho + 2)) {
			  return str.substring(0, tamanho) + "...";
			} else {
			  return str;
			}
		},
		
		salvar : function(distribuicoes){
			$.postJSON('../sidi/distribuicaoPrincipal/salvar', [distribuicoes], function(resultadoSalvar) {
				if (resultadoSalvar) {
					$.postJSON('../sidi/distribuicao-operadora/gerarDistribuicaoOperadora', [resultadoSalvar], function() {
						$(window).scrollTop(0);
						$('.message').message(i18n.get('distribuicao-sucesso'), 'success', true);
						$(window).hashchange();
					});
				} else if (resultadoSalvar == false){
					$('.message').message(i18n.get('processo-erro'), 'error', true);
				} else {
					$('.message').message(i18n.get(resultadoSalvar[0], resultadoSalvar[1], resultadoSalvar[2]), 'error', true);
				}
			});
		}
		
	}
})(jQuery);