


define(function () {

	menu = {};
	menu.loading = function() {
		$.loading({
			text : 'Carregando...',
			overlay : '#23557E',
			opacity : '60'
		});
	}
	menu['mapping'] = {
		'jogos/consultar$' : function(groups) {

			var data = {
					path : [
					        '/sidi/campeonatos/buscarCampeonatosAtivos'
					        ]
			} 
			$.getJSON("../sidi", data, function(json) {
				$.holy("../templates/cadastros/jogos/cadastro-jogos.xml", {'campeonatos' : json[0]});
			});

		},
		'distribuicao/configuracao/(\\d+)$' : function(groups) {
			var idCampeonato = parseInt(groups[1]);

			var data = {
					path : [
					        '/sidi/campeonatos/buscarCampeonatoPorId',
					        '/sidi/clubes/buscarClubesParaRelacionarPorCampeonato',
					        '/sidi/distribuicao/buscarCanaisParaRelacionar',
					        '/sidi/distribuicao/buscarOperadorasParaRelacionar',
					        '/sidi/distribuicao/buscarEstados',
					        '/sidi/clubes/buscarJogosRelacionadosCampeonato',
					        '/sidi/distribuicao/buscarCanaisRelacionados',
					        '/sidi/distribuicao/buscarOperadorasRelacionadas'
					        ],
					arg : [idCampeonato, idCampeonato, idCampeonato, idCampeonato, idCampeonato, idCampeonato, idCampeonato, idCampeonato]
			}
			$.getJSON("../sidi", data, function(json) {
				var campeonato = json[0];
				var clubes = json[1];
				var canais = json[2];
				var operadoras = json[3];
				var estados = json[4];
				var clubesRelacionados = json[5];
				var canaisRelacionados = json[6];
				var operadorasRel = json[7];

				$.holy("../templates/cadastros/campeonato/configuracao.xml", {
					'clubes' 	  : clubes,
					'clubesRelacionados' : clubesRelacionados,
					'canais' 	  : canais,
					'canaisRelacionados' : canaisRelacionados,
					'operadoras'  : operadoras,
					'operadorasRelacionadas' : operadorasRel,
					'estados'     : estados,
					'idCamp'      : idCampeonato,
					'campeonato'  : campeonato
				});
			});
		},
		'distribuicao/tabular' : function(groups) {
			$.sidi.templates.tabular.mainPanel();
		},
		
		'distribuicao/liberacao/principal$' : function(groups) {
			$.holy("../templates/distribuicao/liberar-distribuicao-principal-inicio.xml");
		},
		
		'distribuicao/liberacao/principal/(\\d+)$' : function(groups) {
			var data = parseInt(groups[1]);
			$.getJSON("../sidi/distribuicao/buscarDistribuicaoNovo", {arg : data}, function(json) {
				$.getJSON("../sidi/comutacao/buscarComutacoes", {arg : data}, function(comutacao) {
				$.ajax({
					type : 'GET',
					url : '../templates/distribuicao/liberar-distribuicao-principal.xml',
					context : {async:false, data: data, 'distribuicaoJson' : json,'comutacao' : comutacao },
					dataType : 'holy',
					success : function() {
						$.holy("../templates/distribuicao/distribuicao-principalNovo.xml", {'distribuicaoJson' : json,'comutacao' : comutacao });
					}
				});
			});
		  });
		},
		
		'distribuicao/liberacao/operadora$' : function(groups) {
			$.holy("../templates/distribuicao/liberar-distribuicao-operadora-inicio.xml");
		},
		
		'distribuicao/liberacao/operadora/(\\d+)$' : function(groups) {
			var data = parseInt(groups[1]);
			$.getJSON("../sidi/distribuicao/buscarDistribuicaoNovo", {arg : data}, function(json) {
				json.distribuicaoOperadora.afiliadas.sort();
				
				var nomeComparator = function(a,b) {
					return a.nome.trim().localeCompare(b.nome.trim());
				};
				
				json.regioes.sort(nomeComparator);
				
				json.headEnds.sort(nomeComparator);
				
				json.sort = {};
				
				json.sort.operadoras = json.distribuicaoOperadora.operadoras.slice().sort(nomeComparator);
				
				json.sort.afiliadas = json.distribuicaoOperadora.operadoras.slice().sort(function(a, b) {
					var afiliadaA = a.afiliada || "";
					var afiliadaB = b.afiliada || "";
					return afiliadaA.trim().localeCompare(afiliadaB.trim());
				});
				
				json.filter = {};
				
				json.filter.uf = function(uf) {
					return function(v) {
						return !uf || v.UF == uf;
					};
				};
				
				json.filter.id = function(id) {
					return function(v) {
						return !id || v.id == id;
					};
				};
				
				json.filter.regiao = function(regiao) {
					return function(v) {
						return !regiao || v.regiao == regiao;
					};
				};
				
				json.filter.semAfiliada = function(v) {
					return v.afiliada;
				};
				
				/**
				 * Assume que a array estah ordenada
				**/
				json.filter.duplicates = function(el, i, all) {
					var prev = (i == 0) ? null : all[i - 1];
					return el != prev;
				};
					
				json.map = {};
					
				json.map.afiliadas = function(operadora) {
					return operadora.afiliada;
				};
				
				$.ajax({
					type : 'GET',
					url : '../templates/distribuicao/liberar-distribuicao-operadora.xml',
					context : {async:false, data: data, 'distribuicaoJson' : json},
					dataType : 'holy',
					success : function() {
						$.holy("../templates/distribuicao/distribuicao-operadoraNovo.xml", {
							"distribuicaoJson" : json
						});
					}
				});
			});
		},
		
		'campeonatos/consultar$' : function() {
			$.holy("../templates/cadastros/campeonato/cadastro-campeonato.xml");
		},

		'clubes/consultar$':function(){
			$.holy("../templates/cadastros/clube/cadastro-clube.xml");
		},
		'operadora/consultar$' : function(){
			$.sidi.usuario.buscarOperadorasUsuario().done(function(data){
				if (operadoras.length > 0) {
					location.hash = 'operadora/consultar/' + operadoras[0].id;
				}
			});
		},
		'operadora/consultar/distribuicao$' : function(){
			$.holy("../templates/operadora/consultar/distribuicao/consultar-distribuicao-tabular.xml");
		},
		'operadora/consultar/(\\d+)$' : function(groups){
			var data = new Date().getTime();
			var operadoraId = parseInt(groups[1]);
			$.getJSON("../sidi/distribuicao-operadora/buscarHorariosDisponiveis", {arg : [JSON.stringify(data), operadoraId]}, function(resultado) {
				if (resultado.horarios.length > 0) {
					location.hash = 'operadora/consultar/' + operadoraId + '/' + resultado.horarios[0];
				} else {
					location.hash = 'operadora/consultar/' + operadoraId + '/' + data;
				}
			});
		},
		'operadora/consultar/(\\d+)/(\\d+)$' : function(groups) {
			var operadoraId = parseInt(groups[1]);
			var data = parseInt(groups[2]);
			$.getJSON("../sidi/distribuicao-operadora/buscarHorariosDisponiveis", {arg : [JSON.stringify(data), operadoraId]}, function(resultado){
				$.holy("../templates/operadora/consultar-distribuicao.xml", $.extend(resultado, {"horarioSelecionado": data, operadoraId : operadoraId}));
			});
		},
		'operadora/negociar/(\\d+)/(\\d+)$' : function(groups) {
			requirejs(['modules/distribuicaoOperadora'], 
				function(distribuicaoOperadora) {
					distribuicaoOperadora.init(parseInt(groups[1]), parseInt(groups[2]));
			});
		},
		'operadora/cadastrar$':function(){
			var headendDef = $.getJSON("../sidi/operadora/buscarHeadEnds");
			var regioesDef = $.getJSON("../sidi/operadora/buscarRegioes");
			var estadosdDef = $.getJSON("../sidi/operadora/buscarEstados");
			var canaisDef = $.getJSON("../sidi/canais/buscarCanais");
			var afiliadasDef = $.getJSON("../sidi/afiliada/buscarAfiliadas");
			
			$.when(headendDef, regioesDef, estadosdDef, canaisDef, afiliadasDef).done(function(headends, regioes, estados, canais, afiliadas){
				$.holy("../templates/cadastros/operadora/cadastro-operadora.xml",{'headends':headends[0],'regioes':regioes[0],'estados':estados[0],'canais':canais[0], 'afiliadas': afiliadas[0]});
			})
		},
		'operadora/distribuicao/visaogeral$':function(){
			$.holy("../templates/operadora/consultar/distribuicao/distribuicao-visao-geral.xml");
		},
		'horarios/cadastrar$':function(){
			$.getJSON("../sidi/horario/buscarHorarios", function(horarios) {
				$.holy("../templates/cadastros/horarios/cadastro-horario.xml", {horarios : horarios});
			});
		},
		'canais/novo' : function(){
			$.sidi.templates.canal.mainPanel();
		},
		'lineup/novo' : function(){
			$('#content-info').html('');
			$.getJSON("../sidi/operadora-canal/buscarOperadoraCanalPorMatriz", function(json) {
				
				$.holy("../templates/cadastros/lineup/lineup-canais.xml", { 'matrizes' : json });
			});
		},
		'regioes/cadastrar': function(){
			var data = {
					path : [
					        '/sidi/regioes/buscarRegioes'
					],
					arg : []
				}
				$.getJSON("../sidi", data, function(json) {
					var todasRegioes = json[0];
					$.holy("../templates/cadastros/regioes/cadastro-regioes.xml", {
						regioes	: todasRegioes
					});
				});
		},
		'comutacao/buscar': function() {
			$('#content-info').html('');
			$.holy("../templates/cadastros/comutacao/base-comutacoes.xml",{activate:'#btnListaDeComutacoes',target: "#content-info"});
			$.holy("../templates/cadastros/comutacao/busca-comutacoes.xml"); 
		},
		'comutacao/cadastrar': function() {
			$('#content-info').html('');
			$.holy("../templates/cadastros/comutacao/base-comutacoes.xml",{activate:'#btnCadastrarComutacao',target: "#content-info"});
			$.holy("../templates/cadastros/comutacao/cadastro-comutacoes.xml", {target: "#content-details", comutacao: {}}); 
		},
		'usuario/cadastrar': function(){
			$.getJSON("../sidi/usuario/buscarPerfis",function(json){
				$.holy("../templates/cadastros/usuario/cadastro-usuarios.xml",
						{perfis:json}
				);
			});
		},
		'usuario/alterarEmail': function(){
			$.getJSON("../sidi/usuario/getUsuarioLogado", function(usuarioLogado){
				$.holy("../templates/cadastros/usuario/alterar-email.xml",{usuarioLogado:usuarioLogado});
			});
		},
		'usuario/alterarSenha': function(){
			$.getJSON("../sidi/usuario/getUsuarioLogado", function(usuarioLogado){
				$.holy("../templates/cadastros/usuario/alterar-senha.xml",{usuarioLogado:usuarioLogado});
			});
		},
		'perfil/cadastrar':function(){
			$.getJSON("../sidi/perfil/buscarPerfis", function(perfis){
				$.getJSON("../sidi/perfil/buscarFuncionalidades",function(funcionalidades){
					$.holy("../templates/cadastros/perfil/cadastro-perfil.xml",{"perfis":perfis,"funcionalidades":funcionalidades});
				})
			});
		},
		'log/buscar':function(){
			$('#content-info').html('');
			$.getJSON("../sidi/log/buscarGroupUsuarios", function(logGroupUsuario){
				$.getJSON("../sidi/log/listarTelas", function(logGroupTelas){
					$.holy("../templates/log/lista.xml",{"logGroupUsuario":logGroupUsuario, "logGroupTelas" : logGroupTelas});
				});
			});
		},
		'configuracao/buscar':function(){
			$('#content-info').html('');
			$.getJSON("../sidi/config/buscarConfiguracao", function(configuracao){
				$.getJSON("../sidi/peso-sistema/buscarPesoSistema", function(pesoSistema){
					$.holy("../templates/cadastros/configuracao/configuracao.xml",{"configuracao":configuracao, "pesoSistema":pesoSistema});				
				});
			});
		},
		'vazada/consultar' : function(){			
			$('#content-info').html('');
			$.sidi.campeonatos.buscarCampeonatos().done(function(json) {
				$.holy("../templates/relatorio/controle-vazada.xml", {"campeonatos" : json});
			});
		}
	};
	return menu;
});