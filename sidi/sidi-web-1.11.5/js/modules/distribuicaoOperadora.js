define([], function () {
	var TemplateLoader = function() {
		this.templatePromisses = {};
		this.loadTemplate = function(templateUrl) {
			if (!this.templatePromisses[templateUrl]) {
				this.templatePromisses[templateUrl] = $.get(templateUrl);
			}
			return this.templatePromisses[templateUrl];
		}
	}
	
	var LOADER = new TemplateLoader();
	
	// Models
	var Operadora = Backbone.Model.extend({});
	var Horarios = Backbone.Model.extend({});	
	var OperadoraCollection = Backbone.Collection.extend({
		model: Operadora
	});

	var DistribuicoesOperadora = Backbone.Model.extend({
		isPedido: function() {
			return this.get('pedido') || this.get('pedido') == undefined;
		},
		getCriteriosDistribuicao: function() {
    		var criterio = i18n.get('sem-justificativa');
    		var original = this.get('original');
    		var distribuicoes = original.distribuicoes;
			if (distribuicoes.length > 0 && distribuicoes[0].justificativa != null) {
				criterio = distribuicoes[0].justificativa;
			}
			return criterio;
    	},
    	isPPVPedidoPronto: function() {
    		var disponiveis = this.getCanaisDisponiveis();
    		return this.getCanaisSelecionados() >= disponiveis;
    	},
    	getCanaisSelecionados: function() {
    		var selecionados = _.filter(this.getDistribuicoesOperadora(), this.isDistribuicaoDisponivel, this);
    		return selecionados.length;
    	},
    	getDistribuicoesOperadora: function() {
    		var alteracao = this.get('alteracao');
    		if (alteracao.distribuicoes != null && this.isPedido()) {
    			return alteracao.distribuicoes;
    		} else {
        		var original = this.get('original');
    			return original.distribuicoes;
    		}
    	},
    	getDistribuicoesOperadoraCanaisAbertoFechados: function() {
    		var original = this.get('original');
    		return _.filter(original.distribuicoes, this.isDistribuicaoCanalAbertoOuFechado, this);
    	},
    	getDistribuicoesPrincipaisPPV: function() {
    		var original = this.get('original');
	    	return _.filter(original.principais, this.isDistribuicaoDisponivel, this);
    	},
    	getCanaisDisponiveis: function() {
    		var original = this.get('original');
    		var numeroCanaisPPV = original.operadora.numeroCanaisPPV;
    		var disponiveis = _.filter(original.principais, this.isDistribuicaoDisponivel, this);
    		return Math.min(disponiveis.length, numeroCanaisPPV);
    	},
    	isDistribuicaoDisponivel: function(distPrincipal) {
    		return distPrincipal.canal.ppv;
    	},
    	isDistribuicaoCanalAbertoOuFechado: function(distPrincipal) {
    		return !distPrincipal.canal.ppv;
    	},
    	getNumeroPPV: function() {
    		var original = this.get('original');
    		return original.operadora.numeroCanaisPPV;
    	},
    	isRejeitado: function() {
    		var liberada = this.get('liberada');
    		var alteracao = this.get('alteracao');
    		var finalizada = this.get('finalizada');
    		return liberada && alteracao.alteracao && alteracao.alteracao.rejeitado && finalizada;
    	},
    	temAlteracao: function() {
    		var alteracao = this.get('alteracao');
    		return alteracao.alteracao != null;
    	},
    	getStatus: function() {
    		var status = {label: i18n.get('status-nao-liberada'), className: 'rejeitado'};
    		
    		var liberada = this.get('liberada');
    		var alteracao = this.get('alteracao');
    		var finalizada = this.get('finalizada');
    		
    		if (liberada) {
    			if (alteracao.alteracao != null) {
    				if (alteracao.alteracao.aceito) {
						status.label = i18n.get(finalizada ? 'status-finalizada' : 'status-aprovada');
						status.className = 'aprovado';
    				} else if (alteracao.alteracao.pendente) {
    					status.label = i18n.get('status-pendente');
    					status.className = 'pendente';
    				} else if (alteracao.alteracao.rejeitado) {
    					status.label = i18n.get(finalizada ? 'status-finalizada' : 'status-rejeitada');
    					status.className = finalizada ? 'aprovado' : 'rejeitado';
    				} else {
    					status.label = i18n.get('status-nova');
    					status.className = 'nova';
    				}
    			} else if (finalizada) {
					status.label = i18n.get('status-finalizada');
					status.className = 'aprovado';
    			} else {
					status.label = i18n.get('status-nova');
					status.className = 'nova';
    			}
    		}
    		
    		return status;
    	},
    	permiteAlteracao: function() {
    		var liberada = this.get('liberada');
    		var finalizada = this.get('finalizada');
    		
    		return liberada && !finalizada;
    	}
	});

	var Distribuicao = Backbone.Model.extend({
		isPedido: function() {
			return this.get('pedido') || this.get('pedido') == undefined;
		},
		getCampeonatoNome: function() {
			var evento = this.get('evento');
			var campeonato = evento.fase.campeonato;
			return campeonato.nome;
		},
		getMandante: function() {
			var evento = this.get('evento');
			return evento.mandante;
		},
		getVisitante: function() {
			var evento = this.get('evento');
			return evento.visitante;
		},
		getDescricaoEstadio: function() {
			var evento = this.get('evento');
			var descricaoEstadio = '';
			if (evento.estadio) {
				descricaoEstadio = evento.estadio.nomePopular;
				if (evento.estadio.cidade) {
					descricaoEstadio += ' / ' + evento.estadio.cidade.estado;
				}
			}
			return descricaoEstadio;
		},
		isEventoOuAlternativo: function() {
			var distOperadora = this.getDistribuicaoOperadoraCorrespondente();
			var alternativo = distOperadora != undefined && this.get('alternativo') != null;
			var evento = this.get('evento');
			var tipoEvento = evento != null && evento.tipoEvento != 'JOGO';
			return alternativo || tipoEvento;
		},
		possuiDadosTramissao: function() {
			return this.get('dataInicioTransmissao') && this.get('dataTerminoTransmissao');
		},
		possuiNumeroCanal: function() {
			var distOperadora = this.getDistribuicaoOperadoraCorrespondente();
			return distOperadora && distOperadora.numeroCanal;
		},
		getNumeroCanal: function() {
			var distOperadora = this.getDistribuicaoOperadoraCorrespondente();
			return distOperadora ? distOperadora.numeroCanal : '?';
		},
		getDistribuicaoOperadoraCorrespondente: function() {
			return _.find(this.getDistribuicoesOperadora(), this.isDistribuicaoOperadoraCorrespondente, this);
		},
    	getDistribuicoesOperadora: function() {
    		var distribuicao = this.get('distribuicao');
    		var alteracao = distribuicao.get('alteracao');
    		if (alteracao.distribuicoes != null && this.isPedido()) {
    			return alteracao.distribuicoes;
    		} else {
        		var original = distribuicao.get('original');
    			return original.distribuicoes;
    		}
    	},
		isDistribuicaoOperadoraCorrespondente: function(distOperadora) {
			return this.get('canal').id == distOperadora.canal.id;
		},
		getInicioTransmissao: function() {
			return date.dateToHourString(this.get('dataInicioTransmissao'));
		},
		getTerminoTransmissao: function() {
			return date.dateToHourString(this.get('dataTerminoTransmissao'));
		},
		isDisponivel: function() {
			return this.get('canal').ppv;
		},
		isSelecionado: function() {
			var distOperadora = this.getDistribuicaoOperadoraCorrespondente();
			return distOperadora != null;
		}
	});
	
	// Views
	var HeaderNavegacaoView = Backbone.View.extend({
		el: $('#content-info'),
		templateUrl: '../js/module-templates/distribuicaoOperadora/HeaderNavegacaoViewTemplate.html',
	    initialize: function(args) {
	    	this.operadoraId = args.operadoraId;
	    	this.horario = args.horario;
	    	
	    	this.controller = new HeaderNavegacaoController(this, this.operadoraId, this.horario);
	 	},
	 	atualizaStatus: function(status) {
	 		this.$el.find('.status .statusLabel').html(status.label).addClass(status.className);
	 	},
	 	exibeHorarios: function() {
	 		this.$el.find('.hora span').hide();
	 		this.$el.find('.hora select').show().focus();
	 	},
	 	escondeHorarios: function() {
	 		this.$el.find('.hora span').show();
	 		this.$el.find('.hora select').hide();
	 	},
	 	mudouHorario: function() {
	 		var horario = this.$el.find('.hora select').intVal();
	 		this.controller.mudarHorario(horario);
	 	},
	 	exibeComboOperadoras: function() {
	 		this.$el.find('.operadora-selecionada').hide();
	 		this.$el.find('.operadoras-usuario').show().focus();
	 	},
	 	escondeComboOperadoras: function() {
	 		this.$el.find('.operadora-selecionada').show();
	 		this.$el.find('.operadoras-usuario').hide();
	 	},
	 	mudouOperadora: function() {
	 		var operadoraId = this.$el.find('.operadoras-usuario').intVal();
	 		this.controller.mudarOperadora(operadoraId);
	 	},
	    exibeNomeOperadora: function() {
	    	this.$el.find('span.operadora-selecionada').prepend(this.controller.getNomeOperadoraSelecionada());
	    },
	    addHorario: function(horario) {
	    	var selected = (this.horario == horario ? ' selected="selected" ' : '' );
	    	$('<option value="' + horario + '" ' + selected +  '>' + date.dateToHourString(horario) + '</option>').appendTo(this.$horarios);
	    },
	    atualizaHorarios: function() {
	    	_.each(this.controller.horarios.get('horarios'), this.addHorario, this);
	    },
	    atualizaOperadoras: function() {
	    	this.controller.operadoras.each(this.addOperadora, this);
	    	if (this.controller.operadoras.length > 1) {
		    	this.$el.find('a.selecionar-operadora').show();	    		
	    	}
	    },
	    addOperadora: function(operadora) {
	    	var json = operadora.toJSON();
	    	var selected = (this.operadoraId == operadora.get('id') ? ' selected="selected" ' : '' );
	    	$('<option value="' + json.id + '" ' + selected +  '>' + json.nome + '</option>').appendTo(this.$operadoras);
	    },
	    registraEventos: function() {
	    	this.$el.find('a.selecionar-operadora').click($.proxy(this.exibeComboOperadoras, this));
	    	this.$el.find('.hora span').click($.proxy(this.exibeHorarios, this));
			this.$el.find('.operadoras-usuario').blur($.proxy(this.escondeComboOperadoras, this));
	    	this.$el.find('.hora select').blur($.proxy(this.escondeHorarios, this));
	    	this.$el.find('.operadoras-usuario').change($.proxy(this.mudouOperadora, this));
	    	this.$el.find('.hora select').change($.proxy(this.mudouHorario, this));
	    },
	    renderTemplate: function(template) {
	    	var result = template.process({view: this, controller: this.controller});
	    	this.$el.html(result);
	    	this.$operadoras = this.$el.find('select.operadoras-usuario');
	    	this.$horarios = this.$el.find('.hora select');
	    	this.$el.find(".inputData").datepicker();
	    	this.registraEventos();
	    },
	    render: function() {
	    	this.$el.html('');
	    	LOADER.loadTemplate(this.templateUrl).done($.proxy(this.renderTemplate, this));
	        return this;
	    }
	});
	
	var DistribuicaoOperadoraView = Backbone.View.extend({
		el: $('#content-details'),
		templateUrl: '../js/module-templates/distribuicaoOperadora/DistribuicaoOperadoraViewTemplate.html',
	    initialize: function(args) {
	    	this.operadoraId = args.operadoraId;
	    	this.horario = args.horario;
	    	this.viewPedido = null;
	    	this.viewOriginal = null;

	    	this.controller = new DistribuicaoOperadoraController(this, this.operadoraId, this.horario);
	    },
	    abrePedido: function() {
	    	this.$el.find('.abas td.pedido').addClass('selected');
	    	this.$el.find('.distribuicoes.pedido').show();
	    	
	    	this.$el.find('.abas td.original').removeClass('selected');
	    	this.$el.find('.distribuicoes.original').hide();
	    },
	    abreOriginal: function() {
	    	this.$el.find('.abas td.pedido').removeClass('selected');
	    	this.$el.find('.distribuicoes.original').show();

	    	this.$el.find('.abas td.original').addClass('selected');
	    	this.$el.find('.distribuicoes.pedido').hide();
	    },
	    clicouCanal: function(distribuicaoOperadoraModel) {
	    	this.viewPedido.clicouCanal(distribuicaoOperadoraModel);
	    },
	    clicouGravar: function() {
	    	var canaisSelecionados = this.viewPedido.getCanaisSelecionados();
	    	this.controller.gravarAlteracoes(canaisSelecionados);
	    },
	    clicouFinalizar: function() {
	    	this.controller.finalizar();
	    },
	    clicouAlterarCanais: function() {
	    	this.controller.alterarCanais();
	    },
	    registraEventos: function() {
	    	this.$el.find('td.pedido').click($.proxy(this.abrePedido, this));
	    	this.$el.find('td.original').click($.proxy(this.abreOriginal, this));
			this.$el.find('.btnGravarAlteracoes').click($.proxy(this.clicouGravar, this));
			this.$el.find('.btnFinalizar').click($.proxy(this.clicouFinalizar, this));
			this.$el.find('.btnAlterarCanais').click($.proxy(this.clicouAlterarCanais, this));
	    },
	    renderTemplate: function(template) {
	    	var result = template.process({view: this, controller: this.controller});
	    	this.$el.html(result);
	    	
	    	this.viewPedido = new DistribuicaoPedidoView({controller: this.controller, distribuicao: this.controller.distribuicao.clone()});
	    	this.$el.find('.distribuicoes.pedido').prepend(this.viewPedido.render().el);
	    	
	    	var distribuicaoOriginal = this.controller.distribuicao.clone();
	    	distribuicaoOriginal.set('pedido', false);
	    	this.viewOriginal = new DistribuicaoPedidoView({controller: this.controller, distribuicao: distribuicaoOriginal});
	    	this.$el.find('.distribuicoes.original').prepend(this.viewOriginal.render().el);
	    	
	    	this.$el.find(".alteracao-operadora *, .legenda div.box, .legenda").corner();
	    	
	    	this.registraEventos();
	    },
	    render: function() {
	    	this.$el.html('');
	    	var promisse = LOADER.loadTemplate(this.templateUrl)
	    	promisse.done($.proxy(this.renderTemplate, this));
	        return promisse;
	    }
	});
	
	var DistribuicaoPedidoView = Backbone.View.extend({
		tagName: 'ul',
	    initialize: function(args) {
	    	this.controller = args.controller;
	    	this.distribuicao = args.distribuicao;
	    },
	    clicouCanal: function(distribuicaoOperadoraModel) {
	    	var selecionados = this.getNumeroSelecionados();
	    	var disponiveis = this.distribuicao.getCanaisDisponiveis();
	    	if (selecionados >= disponiveis) {
	    		this.$el.addClass('ppv-pronto').removeClass('ppv-pendente');
	    	} else {
	    		this.$el.removeClass('ppv-pronto').addClass('ppv-pendente');
	    	}
	    },
	    renderDistribuicao: function(distribuicao) {
	    	var model = new Distribuicao(distribuicao);
	    	model.set('distribuicao', this.distribuicao);
	    	model.set('pedido', this.distribuicao.isPedido());
	    	var view  = new DistribuicaoView({model: model, controller: this.controller, distribuicao: this.distribuicao});
	    	this.$el.append(view.render().el);
	    },
	    render: function() {
	    	this.$el.addClass('alteracao-operadora').addClass('disponivel-alteracao');
	    	if (this.distribuicao.isPPVPedidoPronto()) {
	    		this.$el.addClass('ppv-pronto');
	    	} else {
	    		this.$el.addClass('ppv-pendente');
	    	}
	    	this.renderCanais();
	    	this.renderPPV();
	    	return this;
	    },
	    comparaDistribuicoes: function(dist1, dist2) {
	    	var ret = dist1.canal.numeroDeOrdenacao - dist2.canal.numeroDeOrdenacao;
	    	if (ret == 0) {
	    		ret = dist1.canal.id - dist2.canal.id;
	    	}
	    	return ret;
	    },
	    renderCanais: function() {
	    	var distribuicoes = this.distribuicao.getDistribuicoesOperadoraCanaisAbertoFechados();
	    	distribuicoes.sort(this.comparaDistribuicoes);
	    	_.each(distribuicoes, this.renderDistribuicao, this);
	    },
	    renderPPV: function() {
	    	var distribuicoes = this.distribuicao.getDistribuicoesPrincipaisPPV();
	    	distribuicoes.sort(this.comparaDistribuicoes);
	    	_.each(distribuicoes, this.renderDistribuicao, this);
	    },
	    getNumeroSelecionados: function() {
	    	return this.$el.find('li.selecionado.disponivel').length;
	    },
	    getCanaisSelecionados: function() {
	    	var selecionados = [];
	    	this.$el.find('li.selecionado.disponivel').each(function(idx, el) {
	    		selecionados.push(parseInt($(el).data('canal')));
	    	});
	    	return selecionados;
	    }
	});
	
	var DistribuicaoView = Backbone.View.extend({
		tagName: 'li',
		templateUrl: '../js/module-templates/distribuicaoOperadora/DistribuicaoViewTemplate.html',
	    initialize: function(args) {
	    	this.controller = args.controller;
	    	this.distribuicao = args.distribuicao;
	    },
	    clicouCanal: function() {
	    	if (!this.controller.isPPVPronto() || this.$el.hasClass('selecionado')) {
		    	this.$el.toggleClass('selecionado');
		    	this.controller.clicouCanal(this.model);
	    	}
	    },
	    renderTemplate: function(template) {
	    	var result = template.process({view: this, controller: this.controller});
	    	this.$el.html(result);
	    	if (this.model.isDisponivel()) {
	    		this.$el.addClass('disponivel');
	    	}
	    	if (this.model.isSelecionado()) {
	    		this.$el.addClass('selecionado');
	    	}
	    	if (this.distribuicao.isPedido() && this.distribuicao.permiteAlteracao()) {
	    		this.$el.on('click', $.proxy(this.clicouCanal, this));
	    	}
	    	this.$el.data('canal', this.model.get('canal').id);
	    	
	    	this.$el.find("*:not(.escudo)").corner();
	    },
	    render: function() {
	    	LOADER.loadTemplate(this.templateUrl).done($.proxy(this.renderTemplate, this));
	        return this;
	    }
	});
	
	// Controllers
	var DistribuicaoOperadoraController = function(view, operadoraId, horario) {
		_.extend(this, Backbone.Events);
		
		this.view = view;
		this.operadoraId = operadoraId;
		this.horario = horario;

		this.distribuicao = new DistribuicoesOperadora();

    	this.carregaDados = function() {
    		this.distribuicao.once('sync', this.syncDistribuicao, this);
    		this.distribuicao.fetch({url : '../sidi/distribuicao-operadora/buscarDistribuicaoOperadora', data: {arg: [this.horario, this.operadoraId]}});
    	}
    	
    	this.isPPVPronto = function() {
	    	var selecionados = this.view.viewPedido.getNumeroSelecionados();
	    	var disponiveis = this.distribuicao.getCanaisDisponiveis();
	    	return selecionados >= disponiveis;
    	}
    	
    	this.isOriginalPPVPronto = function() {
	    	var selecionados = this.view.viewOriginal.getNumeroSelecionados();
	    	var disponiveis = this.distribuicao.getCanaisDisponiveis();
	    	return selecionados >= disponiveis;
    	}
    	
    	this.isPermitidoGravar = function() {
    		var liberada = this.distribuicao.get('liberada');
    		var finalizada = this.distribuicao.get('finalizada');
    		return liberada && !finalizada;
    	}
    	this.isPermitidoFinalizar = function() {
    		var liberada = this.distribuicao.get('liberada');
    		var finalizada = this.distribuicao.get('finalizada');
    		
    		var alteracao = this.distribuicao.get('alteracao');
    		
    		return (liberada && !finalizada) && (!alteracao.alteracao || !alteracao.alteracao.pendente);
    	}
    	this.isPermitidoAlterarCanais = function() {
    		var liberada = this.distribuicao.get('liberada');
    		var finalizada = this.distribuicao.get('finalizada');
    		return liberada && finalizada;
    	}
    	
    	this.clicouCanal = function(distribuicaoOperadoraModel) {
    		this.view.clicouCanal(distribuicaoOperadoraModel);
    	}

    	this.syncDistribuicao = function() {
    		this.view.render().done($.proxy(this.view.renderDistribuicoes, this.view));
    		
    		this.trigger('distribuicao.carregado', this.distribuicao.getStatus());
    	}
    	this.gravarAlteracoes = function(canaisSelecionados) {
    		$.holy('../templates/operadora/popup-justificativa.xml', { canais : canaisSelecionados, horario : this.horario, operadoraId : this.operadoraId});
    	}
    	this.finalizar = function() {
    		var alteracao = this.distribuicao.get('alteracao');
    		var alteracaoId = alteracao.alteracao != null ? alteracao.alteracao.id : -1;
			$.postJSON("../sidi/distribuicao-operadora/buscarDistribuicoesFinalizar",
					[this.horario, this.operadoraId], function(resultado) {
					$.holy('../templates/operadora/finalizar-distribuicoes.xml', {alteracaoId: alteracaoId, distribuicoes: resultado});
			});
    	}
    	this.alterarCanais = function() {
    		var alteracao = this.distribuicao.get('alteracao');
    		var alteracaoId = alteracao.alteracao != null ? alteracao.alteracao.id : -1;
			$.postJSON("../sidi/distribuicao-operadora/buscarDistribuicoesFinalizar",
				[this.horario, this.operadoraId], function(resultado) {
				$.holy('../templates/operadora/finalizar-distribuicoes.xml', {alteracaoId: alteracaoId, distribuicoes: resultado});
			});
    	}
	}
	var HeaderNavegacaoController = function(view, operadoraId, horario) {
		_.extend(this, Backbone.Events);

		this.view = view;
		this.operadoraId = operadoraId;
		this.horario = horario;
		
		this.operadoras = new OperadoraCollection();
		this.horarios = new Horarios();
    	
    	this.syncOperadoras = function() {
    		this.view.atualizaOperadoras();
    		this.view.exibeNomeOperadora();
    	}
    	this.syncHorarios = function() {
    		this.view.atualizaHorarios();
    	}

    	this.atualizarHeader = function(status) {
    		this.view.atualizaStatus(status);
    	}
  
    	this.carregaDados = function() {
    		this.operadoras.once('sync', this.syncOperadoras, this);
    		this.operadoras.fetch({url : '../sidi/usuario/buscarOperadorasUsuario'});
    		
    		this.horarios.once('sync', this.syncHorarios, this);
    		this.horarios.fetch({url : '../sidi/distribuicao-operadora/buscarHorariosDisponiveis', data: {arg: [this.horario, this.operadoraId]}});
    	}
    	
    	this.mudarOperadora = function(operadoraId) {
    		location.hash = 'operadora/negociar/' + operadoraId + '/' + this.horario;
    	}
    	this.mudarHorario = function(horario) {
    		location.hash = 'operadora/negociar/' + this.operadoraId + '/' + horario;
    	}
    	
		this.getDataFormatada = function() {
			return date.dateToString(this.horario);
		}
		this.getHorarioFormatado = function() {
			return date.dateToHourString(this.horario);
		}
		this.getOperadoraSelecionada = function() {
			return this.operadoras.findWhere({
				id : this.operadoraId
			});
		}
		this.getNomeOperadoraSelecionada = function() {
			var operadora = this.getOperadoraSelecionada();
			return operadora ? operadora.get('nome') : '';
		}
	}
	
    return {
    	init:  function(operadoraId, horario) {
    		var navView = new HeaderNavegacaoView({operadoraId: operadoraId, horario: horario});
    		navView.render();
    		navView.controller.carregaDados();
    		
    		var distOpView = new DistribuicaoOperadoraView({operadoraId: operadoraId, horario: horario});
    		distOpView.controller.carregaDados();
    		
    		navView.controller.listenTo(distOpView.controller, 'distribuicao.carregado', navView.controller.atualizarHeader, navView.controller);
    	}
    }
});