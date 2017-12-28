(function($) {

	consultaOperadora = {};
	consultaOperadora.distribuicao = {};
	consultaOperadora.distribuicao.canais = [];
	consultaOperadora.distribuicao.jogos = [];

	consultaOperadora.carregaDistribuicao = function() {
		$("ul.canais li").corner().find("div.canal").corner();
		$(".jogo .torneio, .jogo .local, h4.comentariosEditor").corner();
		$("ul.canais li .jogo-container").corner().find(".jogo").corner();
		$("div.jogos-disponiveis .jogo-container").corner().find(".jogo").corner();

		$('li.selecionavel.temJogo .jogo-container, div.jogos-disponiveis .jogo-container').draggable({
			containment: '#content',
			stack: '.jogo-container',
			cursor: 'move',
			revert: 'invalid',
			drag: function() {
				if ($(this).closest('.selecionavel').length > 0) {
					$(this).closest('.selecionavel').find(".jogo-tip").hide();
					$(this).closest("li").css('z-index','0');
				}
			}
		});
		
		$('li.selecionavel .droppable').droppable({
			accept: '.jogo-container',
			activeClass: 'active-item',
			hoverClass: 'hovered',
			drop: function(event, ui) {
				var children = $(this).children();
				
				$(this).children().detach();
				
				if (! children.find('.jogo').hasClass("vazio")) {
					$('div.jogos-disponiveis').append(children);
				}
				
				var parent = $(ui.draggable).parent();
				$(ui.draggable).detach();
				$(this).append(ui.draggable);
				
				if (parent.hasClass("droppable")) {
					var container = $('<div class="jogo-container"/ >');
					var vazio = $('<div class="jogo vazio" />').text(i18n.get('arraste-jogo'));
					container.append(vazio);
					parent.append(container);
					container.corner().find('.jogo').corner();
					
					var dist = parent.find(".jogo-container").data('sidi-distribuicao');
					if (dist) {
						dist.jogo = null;
					}
				}
				
				ui.draggable.removeAttr("style").css('position', 'relative').corner();
			}
		});

		$('div.jogos-disponiveis').droppable({
			accept: '.jogo-container',
			activeClass: 'active-item',
			hoverClass: 'hovered',
			drop: function(event, ui) {
				var parent = $(ui.draggable).parent();
				
				if (parent.hasClass("droppable")) {
					var container = $('<div class="jogo-container"/ >');
					var vazio = $('<div class="jogo vazio" />').text(i18n.get('arraste-jogo'));
					container.append(vazio);
					parent.append(container);
					container.corner().find('.jogo').corner();
				}
				$(ui.draggable).detach();
				$(this).append(ui.draggable);
				ui.draggable.removeAttr("style").css('position', 'relative').corner();
			}
		});

		$("div.acoes a.restaurar").click(function() {
			if (confirm(i18n.get('confirmar-restaurar'))) {
				$(window).hashchange();
			}
			return false;
		});

		$("h4.comentariosEditor a").click(function() {
			$(".resposta-distribuicao").toggle();
			$(".resposta-distribuicao textarea").focus();
			return false;
		});

	}

	consultaOperadora.popupJustificativa = function() {
		$.holy('../templates/operadora/popup-justificativa.xml');
	}
	
	consultaOperadora.getDataSelecionada = function() {
		var dataSelecionada = $('#dataEventos').val();
		if (!dataSelecionada) {
			return null;
		}
		dataSelecionada = date.stringToDate(dataSelecionada);
		
		var horario = $("#horaEventos").val();
		
		if (horario != null) {
			var hora = horario.split(':')[0];
			var min  = horario.split(':')[1];
			
			dataSelecionada.setMinutes(min);
			dataSelecionada.setHours(hora);
		}
		var data = dataSelecionada.getTime();
		
		return data;
	}

	consultaOperadora.buscarOperadorasEAutoComplete = function($component) {
		$.getJSON("../sidi/operadora/buscarOperadorasSemCanais", function(json){
			var operadoras = json;
			$(json).each(function() {
				operadoras.push({"label": this.nome, "value": this.id});
			});

			$component.sidiAutocomplete({
				source: operadoras
			}, json);
		});
	};

	consultaOperadora.adicionaOperadora = function($input, $message, usuario) {
		var operadora = $input.data('sidi.autocomplete');

		if (!operadora) {
			$message.message(i18n.get('item-autocomplete-invalido'), 'error');
			return;
		}

		$input.data('sidi.autocomplete', null);

		usuario.operadoras = [];

		var id = usuario.id;
		if (!usuario)
			id = 'novo';

		var operadorasRelacionadas = [];
		if ($(document).data('sidi.operadorasRelacionadas' + id))
			operadorasRelacionadas = $(document).data('sidi.operadorasRelacionadas' + id);

		for (var i in operadorasRelacionadas)
			if (operadorasRelacionadas[i].id == operadora.id) {
				$message.message(i18n.get('operadora-ja-vinculada'), 'error');
				return;
			}

		operadorasRelacionadas.push({"id" : operadora.id, "nome" : operadora.nome});

		usuario.operadoras = operadorasRelacionadas;

		$.holy("../templates/cadastros/usuario/operadoras-relacionadas.xml", {'operadorasRelacionadas' : usuario.operadoras, 'usuario' : usuario});

		$input.val('');
	}
})(jQuery);
