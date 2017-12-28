<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
{
	"estados" : ["AC", "AP", "SP", "TO"],
	"canais" : {
		"3" : {
			"nome": "Globo",
			"tipoCanal" : "ABERTO"
		},
		"4" : {
			"nome": "Band",
			"tipoCanal" : "ABERTO"
		},
		"5" : {
			"nome": "Sportv",
			"tipoCanal" : "FECHADO"
		},
		"6" : {
			"nome": "PPV",
			"tipoCanal" : "PPV"
		},
		"7" : {
			"nome": "PPV 2",
			"tipoCanal" : "PPV"
		},
		"8" : {
			"nome": "PPV 3",
			"tipoCanal" : "PPV"
		},
		"9" : {
			"nome": "PPV 4",
			"tipoCanal" : "PPV"
		},
		"10" : {
			"nome": "PPV 5",
			"tipoCanal" : "PPV"
		}
	},
	"clubes" : {
		"1" : {
			"apelido" : "São Paulo",
			"sigla" : "SPO",
			"slug" : "saopaulo"
		},
		"2" : {
			"apelido" : "Palmeiras",
			"sigla" : "PAL",
			"slug" : "palmeiras"
		},
		"3" : {
			"apelido" : "Portuguesa",
			"sigla" : "POR",
			"slug" : "portuguesa"
		},
		"4" : {
			"apelido" : "Santos",
			"sigla" : "SAN",
			"slug" : "santos"
		}
	},
	"eventosDisponiveis" : {
		"1" : {
			"descricaoEvento" : "JOGAO!",
			"data" : 1354759200000,
			"mandante" : 1,
			"visitante" : 2,
			"tipoEvento" : "JOGO",
			"alterado" : true,
			"campeonato" : "Brasileiro"
			
		},
		"2" : {
			"descricaoEvento" : "BRA x SPO",
			"data" : 1231312412413,
			"mandante" : 1,
			"visitante" : 2,
			"tipoEvento" : "JOGO",
			"alterado" : true,
			"campeonato" : "Brasileiro"
			
		},
		"3" : {
			"descricaoEvento" : "COR X PAL",
			"data" : 1231312412413,
			"mandante" : 1,
			"visitante" : 2,
			"tipoEvento" : "JOGO",
			"alterado" : true,
			"campeonato" : "Brasileiro"
			
		},
		"4" : {
			"descricaoEvento" : "AMG X OMG",
			"data" : 1231312412413,
			"mandante" : 1,
			"visitante" : 2,
			"tipoEvento" : "JOGO",
			"alterado" : true,
			"campeonato" : "Brasileiro"			
		}
	},
	"distribuicaoOperadora" : {
		"horarios" : [
			{
				"horario" : 1354413600000,
				"eventosDisponiveis" : [1,2,3,4],
				"operadoras" : [
					{
						"id" : 123,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 124,
						"eventos" : { 
							"3" : 2 ,
							"4" : 2,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 125,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : 1,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 126,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : null,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 127,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 128,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : null,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 129,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : 4
						}
					},
					{
						"id" : 130,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 3,
							"6" : null,
							"7" : null,
							"8" : 2,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 131,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 3,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 132,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 133,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 134,
						"eventos" : { 
							"3" : 2 ,
							"4" : 2,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 135,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : 1,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 136,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : null,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 137,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 138,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : null,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 139,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : 4
						}
					},
					{
						"id" : 140,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 3,
							"6" : null,
							"7" : null,
							"8" : 2,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 141,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 3,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 142,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 143,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 3,
							"6" : null,
							"7" : null,
							"8" : 2,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 144,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 3,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 145,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 146,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 147,
						"eventos" : { 
							"3" : 2 ,
							"4" : 2,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 148,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : 1,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 149,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : null,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 150,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 151,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : null,
							"8" : 4,
							"9" : null,
							"10" : null
						}
					},
					{
						"id" : 152,
						"eventos" : { 
							"3" : 2 ,
							"4" : null,
							"5" : 1,
							"6" : null,
							"7" : 3,
							"8" : 4,
							"9" : null,
							"10" : 4
						}
					},
					{
						"id" : 153,
						"eventos" : { 
							"3" : 1 ,
							"4" : null,
							"5" : 3,
							"6" : null,
							"7" : null,
							"8" : 2,
							"9" : null,
							"10" : null
						}
					}
				]
			}
		],
		"operadoras" : {
		<% for (int i = 0; i < 60; i++) {%>
			
			"<%= (123 + i) %>"  : {
				"status" : "Nao liberada",
				"headend" : "headend <%=i %>",
				"apresentacao" : "",
				"regiao" : "",
				"uf" : "",
				"nome" : "asdf",
				"distanciaCapital" : null,
				"afiliada" : false,
				"numeroPPV" : 1
			}<%= (i < 59 ? "," : "") %>
		<%} %>
		}
	},
	"distribuicaoPrincipal" : {
		"canais" : {
			"3" : [
					{ "eventoId" : 1, "estados" : ["SP", "RJ", "PA"]},
					{ "eventoId" : 2, "estados" : ["SP", "RJ", "PA"]},
					{ "eventoId" : 3, "estados" : ["SP", "RJ", "PA"]},
					{ "eventoId" : 4, "estados" : ["SP", "RJ", "PA"]}
				],				
			"4" : [
					{ "eventoId" : 1, "estados" : ["SP", "RJ", "PA"]},
					{ "eventoId" : 4, "estados" : ["SP", "RJ", "PA"]}
				]
		}
	}
}
