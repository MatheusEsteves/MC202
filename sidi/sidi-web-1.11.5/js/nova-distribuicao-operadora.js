var sidi = sidi || {};

sidi.DistribuicaoOperadora = (function() {
	
	var staticHeader = [{"field" : "status", "key" : "status"},
						{"field" : "headend", "key" : "headend"},
						{"field" : "apresentacao", "key" : "operadora-apres"},
						{"field" : "regiao", "key" : "regiao"},
						{"field" : "UF", "key" : "uf"},
						{"field" : "nome", "key" : "operadora"},
						{"field" : "distanciaCapital", "key" : "distancia-capital-abrev"},
						{"field" : "afiliada", "key" : "afiliada"},
						{"field" : "numeroPPV", "key" : "ppv"}];

    var DistribuicaoOperadora = function(distribuicao) {
		
		var canais =  distribuicao.canais.sort(ordernarCanais);
		var headends = idNomeArrayToMap(distribuicao.headEnds);
		var regioes = idNomeArrayToMap(distribuicao.regioes);
		var horarioEventos = horarioAtual(distribuicao.distribuicaoOperadora.horarios);
		var operadoras = operadorasHorario(distribuicao, horarioEventos);
		
		var eventosDisponiveis = distribuicao.eventosDisponiveis;
		
		var buildMappers = function() {
			fieldMapper = new FieldMapper(headends, regioes, horarioEventos);

			var mappers = [];
			for (var i = 0; i < staticHeader.length; i++) {
				var field = staticHeader[i].field;
				mappers.push(mapper(fieldMapper, field));
			}

			for (var j = 0; j < canais.length; j++) {
				var canal = canais[j];
				mappers.push(canalMap(canal, horarioEventos, eventosDisponiveis));
			}

			return function(operadora) {
				var values = [];
				for (var k = 0; k < mappers.length; k++) {
					var m = mappers[k];
					values.push(m(operadora));
				}
				return values;
			};
		};
		
		var mappers = buildMappers(headends, regioes, distribuicao.canais, horarioEventos);
		
		this.canal = function(id) {
			return canais.filter(filterById(id))[0];
		};
		
		this.header = staticHeader.map(tituloHeader).concat(canais.map(nomeCanal));
		
		this.horario = horarioEventos.horario;
		
		this.horarioEventos = horarioEventos;
		
		this.indexOf = function(column) {
			return staticHeader.map(fieldHeader).indexOf(column);
		}; 
		
		this.length = operadoras.length;
		
		this.operadora = function(id) {
			return operadoras.filter(filterById(id))[0];
		};
		
		this.range = function(i, j) {
			return operadoras.slice(i, j).map(mappers);
		};
        
    };
	
	/**
	 * Dado um canal e uma distribuicao, retorna uma funcao que recebe
	 * uma operadora e devolve o nome evento para aquela operadora e canal.
	**/
	var canalMap = function(canal, horarioEventos, eventosDisponiveis) {
		
		if (!horarioEventos.operadoras) {
			return function() {
				return "";
			};
		}
		
		return function(operadora) {
			var operadoraEvento = horarioEventos.operadoras[operadora.id.toString()].eventoPorCanal;
			var eventoCanal = operadoraEvento[canal.id.toString()] || {};
			var evento = eventosDisponiveis[eventoCanal.evento] || {};
			var descricao = evento.descricaoEventoAbreviado || eventoCanal.alternativo || "";
			var temCanal = operadora.canais.indexOf(canal.id) > -1;
						
			if (temCanal && !descricao && canal.tipo == "PPV") {
				
				var eventosPPV = horarioEventos.eventosDisponiveis.filter(function(id) {
					var e = eventosDisponiveis[id.toString()];
					var aceitaCanal = e.canaisDisponiveis.indexOf(canal.id) > -1;
					var aceitaEstado = e.estadosPossiveis.indexOf(operadora.UF) > -1;
					var aceitaOperadora = e.operadorasDisponiveis.indexOf(operadora.id) > -1;
					
					return aceitaCanal && aceitaEstado && aceitaOperadora;
				});
				
				if (eventosPPV.length) {
					var e = eventosDisponiveis[eventosPPV[0]];
					operadoraEvento[canal.id.toString()] = {
						"alternativo" : null,
						"conflito" : false,
						"evento" : e.id,
						"pendente" : false,
						"canalId" : canal != null ? canal.id : 0
					};
					
					return {
						"canal" : true,
						"display" : e.descricaoEventoAbreviado,
						"evento" : e.id,
						"ppv" : true,
						"conflito" : operadoraEvento[canal.id] != null ? operadoraEvento[canal.id].conflito : false,
						"pendente" : operadoraEvento[canal.id] != null ? operadoraEvento[canal.id].pendente : false,
						"canalId" : canal != null ? canal.id : 0
					};
				}
			}

			
			if (temCanal) {
				return {
					"canal" : true,
					"display": descricao,
					"evento": evento.id,
					"ppv": canal.tipo == "PPV",
					"temCanal" : true,
					"conflito" : operadoraEvento[canal.id] != null ? operadoraEvento[canal.id].conflito : false,
					"pendente" : operadoraEvento[canal.id] != null ? operadoraEvento[canal.id].pendente : false,
					"canalId" : canal != null ? canal.id : 0
				};
			} else {
				return {
					"canal" : true,
					"temCanal" : false
				};
			}
		};
	};
	
	/**
	 *  Dado uma distribuicao e um campo, retorna uma funcao que recebe
	 *  uma operadora e devolve o valor daquele campo (na distribuicao)
	**/
	var mapper = function(fieldMapper, field) {
		if (fieldMapper[field]) {
			return fieldMapper[field];
		}
		
		return function(operadora) {
			return fieldMapper.default(operadora, field);
		}
	};
	
	var FieldMapper = function(headends, regioes, horarioEventos) {
	
		this.headend = function(operadora) {
			var headend = operadora.headend || "";
			return {
				"val": headend,
				"display" : headends[headend.toString()]
			};
		};
		
		this.nome = function(operadora) {
			return {
				"val": operadora.id,
				"display": operadora.nome
			};
		};
		
	
		
		this.regiao = function(operadora) {
			var regiao = operadora.regiao || "";
			return {
				"val" : regiao,
				"display" : regioes[regiao.toString()] || ""
			};
		};
		
		
		this.status = function(operadora) {
			if (horarioEventos.operadoras) {
				var operadoraEvento = horarioEventos.operadoras[operadora.id.toString()];
				if (operadoraEvento.status) {
					return {
						"display" : operadoraEvento.status
					};
				}
			}
			return {
				"display" : "nao-liberado"
			};
		};
		
		this.default = function(operadora, field) {
			return {
				display: operadora[field] != null ? (operadora[field] + "") : ""
			};
		};
	};
	
	/**
	 * Converte uma array no formato [{"id" : 123, "nome": "xpto"}, ...]
	 * em um mapa {"123" : "xpto", "124" : "foobar", ...}
	**/
	var idNomeArrayToMap = function(array) {
		var map = {};
		for (var i = 0; i < array.length; i++) {
			var el = array[i];
			map[el.id.toString()] = el.nome;
		}
		return map;
	};
	
	var fieldHeader = function(header) {
		return header.field;
	};
	
	var tituloHeader = function(header) {
		return i18n.get(header.key);
	};
	
	var nomeCanal = function(canal) {
		return {
			"canal" : true,
			"display" : canal.nome,
			"ppv" : canal.tipo === "PPV",
			"val" : canal.id
		};
	};
	

	var ordernarCanais = function (x,y) {
      return x.numeroDeOrdenacao - y.numeroDeOrdenacao; 
    };

	/**
	 * Mantem apenas as operadoras que tem uma distribuicao no horario dado
	**/
	var operadorasHorario = function(distribuicao, horarioEventos) {
		var todasOperadoras = distribuicao.distribuicaoOperadora.operadoras || [];
		var operadoras = horarioEventos.operadoras || {};
		return todasOperadoras.filter(function(operadora) {
			return operadoras[operadora.id.toString()] !== undefined;
		});
	};
	
	
	/**
	 * Pega o primeiro horario nao vazio
	 *
	 * @return {
	 *    "eventosDisponiveis" : [1234, 1235, 1235],
	 *    "horario" : 1384308600000,
	 *    "operadoras" : {op1_id : {...}, op2_id : {...}, ... } (OperadoraEventoVO)
	 * }
	**/
	var horarioAtual = function(horarios) {
		for (var h = 0; h < horarios.length; h++) {
			var horario = horarios[h];
			if (horario.operadoras && horario.operadoras.length) {
				return {
					"eventosDisponiveis" : horario.eventosDisponiveis,
					"horario" : horario.horario,
					"operadoras" : operadoraEventoMap(horario.operadoras)
				}
				
				
				return horario;
			}
		}
		return {};
	};
	
	/**
	 * Recebe uma lista de OperadoraEventoVO e retorna
	 * um mapa onde a chave eh o id da operadora
	**/
	var operadoraEventoMap = function(operadorasEventos) {
		var map = {};
		for (var i = 0; i < operadorasEventos.length; i++) {
			var operadoraEventos = operadorasEventos[i];
			map[operadoraEventos.operadora.toString()] = operadoraEventos;
		}
		return map;
	};
	
	
	
	
	var filterById = function(id) {
		return function(o) {
			return o.id == id;
		};
	}
    
    return DistribuicaoOperadora;

})();