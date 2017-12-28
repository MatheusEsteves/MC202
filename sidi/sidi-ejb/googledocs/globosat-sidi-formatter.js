(function() {

	sidi = $ = function() {
	}
    
    sidi.LOG_SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LOG');
    
    sidi.log = function(msg) {
      sidi.LOG_SHEET.appendRow([msg]);
    }

	/**
	 * Este metodo e responsavel por copiar os dados da planilha principal para
	 * a planilha Eventos. Tambem e sua responsabilidade fazer a formatacao de
	 * cores da tabela.
	 */
	sidi.formataEventos = function() {
		var ss = SpreadsheetApp.getActiveSpreadsheet();
		var principal = ss.getSheetByName('principal');
		var distribuicaoObjects = principal.getDataRange().getValues();
		var shEventos = ss.getSheetByName('Eventos');

		var header = ss.getSheetByName('header');
		var headerValues = header.getDataRange().getValues();

		var totalCampeonatos = 1;
		for ( var i = 0; i < headerValues[0].length; i++) {
			if (headerValues[0][i] === '__FIXA__') {
				break;
			}
			totalCampeonatos++;
		}
		shEventos.insertColumns(1, totalCampeonatos);
		// definir tamanho das colunas com nome de campeonato
		for ( var i = 0; i < totalCampeonatos; i++) {
			shEventos.setColumnWidth(1 + i, 30);
		}

		var completo = [];
		var corBackground = [];
		var corFont = [];
		for ( var i = 0; i < distribuicaoObjects.length; i++) {
			var linha = [];
			var cor = [];
			var font = [];
			for ( var f = 1; f < 7; f++) {
				linha.push(distribuicaoObjects[i][f]);
				if (f < 4 && distribuicaoObjects[i][8]) {
					var corCel = distribuicaoObjects[i][8];
					cor.push(corCel);
					font.push($.corTexto(corCel.substring(1, 7)));
				} else {
					cor.push('#FFFFFF');
					font.push('#000000');
				}
			}
			corBackground.push(cor);
			corFont.push(font);
			completo.push(linha);
		}

		var escritaRange = shEventos.getRange(5, totalCampeonatos + 1,
				distribuicaoObjects.length, 6);
		escritaRange.setValues(completo);
		escritaRange.setBackgroundColors(corBackground);
		escritaRange.setFontColors(corFont);
	}

	sidi.corTexto = function(corBack) {
		var r = parseInt(corBack.substring(0, 2), 16);
		var g = parseInt(corBack.substring(2, 4), 16);
		var b = parseInt(corBack.substring(4, 6), 16);

		var indexWhite = (255 - r) + (255 - g) + (255 - b);
		var indexBlack = r + g + b;
		if (indexWhite > indexBlack) {
			return '#FFFFFF';
		} else {
			return '#000000';
		}
	}

	/**
	 * Para cada planilha existente com o nome 'id=[horario]', o metodo cria uma
	 * nova planilha com o nome [horario], copia o conteudo da planilha Eventos
	 * e popula a nova planilha com os dados originais da 'id=[horario]'
	 * original
	 */
	sidi.criarPlanilhaJogos = function() {
		var ss = SpreadsheetApp.getActiveSpreadsheet();
		var sheets = ss.getSheets();

		var header = ss.getSheetByName('header');
		var headerValues = header.getDataRange().getValues();

		var headerJogo = ss.getSheetByName('header_jogo');
		var headerJogoValues = headerJogo.getDataRange().getValues();

		for ( var i = 0; i < sheets.length; i++) {
			if (sheets[i].getName().substring(0, 3) === 'id=') {
				var sheetValues = sheets[i].getDataRange().getValues();

				// SpreadsheetApp.getActiveSpreadsheet().getSheetByName("started").getRange("F"+i+":F"+i).setValue(sheets[i].getRange("A1:A1").getValue()
				// + ", "+ i);
				if (sheets[i].getRange("A1:A1").getValue() != "") {

					var novaSheet = ss.getSheetByName(sheets[i].getName()
							.substring(3));
					if (!novaSheet) {
						novaSheet = ss.insertSheet(sheets[i].getName()
								.substring(3), 1);
					}

					// copia planilha principal
					var shEventos = ss.getSheetByName('Eventos');
					var eventosRange = shEventos.getDataRange();
					var eventosValue = eventosRange.getValues();
					var novoRange = novaSheet.getRange(1, 1,
							eventosValue.length, eventosValue[0].length);
					eventosRange.copyTo(novoRange);

					$.popularPlanilhaJogos(headerValues, headerJogoValues,
							sheetValues, novaSheet, (eventosValue.length + 2));
				}
			}
		}
	}

	/**
	 * Recebe um planilha com dados e copia os dados de forma formatada para uma
	 * nova planilha
	 * 
	 * PARAMS: headerValues []: array com os dados da planilha do cabecalho
	 * headerJogoValues []: array com dados da planilha de cabecalho referentes
	 * a jogos sheetDados []: array com os dados que devem ser copiados
	 * sheetDestino Sheet: planilha que ira receber os dados altura Int: altura
	 * da planilha principal para posicionamento da nova planilha
	 */
	sidi.popularPlanilhaJogos = function(headerValues, headerJogoValues,
			sheetDados, sheetDestino, altura) {
		var rangeDados = [];
		var linha = [];
		var coluna = [];
		var contadorColunas = 1;
		var qtdePremiere = 0;
		var eventosRange = sheetDestino.getDataRange();

		var totalCampeonatos = 0;
		var passouFixa = false;
        
        var largura = 0;

		// criar header
		var novaLinhaDado = []; // primeira linha do header da tabela
		var linhaDado = []; // segunda linha do header da tabela
		for ( var i = 0; i < headerValues[0].length; i++) {
			if (headerValues[0][i] === '__FIXA__') {
				passouFixa = true;
				novaLinhaDado.push('');
				linhaDado.push('Headend');
				novaLinhaDado.push('');
				linhaDado.push('Apresent.');
				novaLinhaDado.push('');
				linhaDado.push('Região');
				novaLinhaDado.push('');
				linhaDado.push('UF');
				novaLinhaDado.push('');
				linhaDado.push('OPERADORAS');
				novaLinhaDado.push('');
				linhaDado.push('DISTÂNCIA DA CAPITAL');
				novaLinhaDado.push('');
				linhaDado.push('AFILIADAS TVG');

				// colocando canais Premiere
				qtdePremiere = headerValues[0][i + 1];
				for ( var j = 0; j < qtdePremiere; j++) {
					linhaDado.push(j + 1);
					if (j == 0) {
						novaLinhaDado.push('Premiere Esportes');
					} else {
						novaLinhaDado.push('');
					}
				}
				i++;
			} else {
				novaLinhaDado.push('');
				linhaDado.push(headerValues[0][i]);
			}
			if (!passouFixa) {
				totalCampeonatos++;
			}

		}

		// header com nome do canal Premiere e na outra linha o jogo principal
		for ( var i = 0; i < headerJogoValues.length; i++) {
			if (headerJogoValues[i][0] === sheetDestino.getName()) {
				novaLinhaDado.push(headerJogoValues[i][1]);
				linhaDado.push(headerJogoValues[i][2]);
			}
		}

		rangeDados.push(novaLinhaDado);
		rangeDados.push(linhaDado);
        largura = Math.max(largura, linhaDado.length);
        
		// criar dados
		for ( var i = 0; i < sheetDados.length; i++) {
			linhaDado = [];
			coluna = [];
			for ( var j = 0; j < sheetDados[i].length; j++) {
				if (sheetDados[i][j] === true) {
					linhaDado.push('X');
				} else if (!sheetDados[i][j]) {
					linhaDado.push(null);
				} else {
					linhaDado.push(sheetDados[i][j]);
					coluna.push(j);
				}
			}
			linha.push(coluna);
			rangeDados.push(linhaDado);
            largura = Math.max(largura, linhaDado.length);
		}
        
		// Formata tamanho da colunas de campeonatos
		for ( var i = 0; i < totalCampeonatos; i++) {
			sheetDestino.setColumnWidth(1 + i, 30);
		}

		// Formata tamanho das colunas do Premiere
		for ( var i = 0; i < qtdePremiere; i++) {
          sidi.log((8 + totalCampeonatos + i) + '');
          sheetDestino.setColumnWidth((8 + totalCampeonatos + i), 30);
		}
        

		// Merge da coluna com nome do Premiere
		sheetDestino
				.getRange(altura + 1, totalCampeonatos + 8, 1, qtdePremiere)
				.merge();

		var corFonte = {};
		var backgroundColor = {};
		var nomesCanais = [];
		var canaisAtivos = [];
		var indices = [];

		// loop que constroi os mapas contendo as cores de cada canal
		for ( var l = 5; l <= eventosRange.getNumRows(); l++) {
			var nome = eventosRange.getCell(l, 3).getValue();
			var cor = eventosRange.getCell(l, 3).getBackgroundColor();
			var fonte = eventosRange.getCell(l, 3).getFontColor();
			backgroundColor[nome] = cor;
			corFonte[nome] = fonte;
		}
        for (var idxR = 0; idxR < rangeDados.length ; idxR++) {
         // sidi.log(idxR + ' ' + rangeDados[idxR].length);
          if (rangeDados[idxR].length != largura) {
            for (var idxC = 0; idxC < (largura - rangeDados[idxR].length + 1) ; idxC++) {
              rangeDados[idxR].push(idxR + ',' + idxC);
            }
          }
        }
		var escritaRange = sheetDestino.getRange(1 + altura, 1,
				rangeDados.length, largura);
		escritaRange.setValues(rangeDados);
		var rangeAux = escritaRange;

		// vetor de canais ativos para aquela aba da planilha
		for ( var c = 18; c <= escritaRange.getNumColumns(); c++) {
			canaisAtivos.push(escritaRange.getCell(1, c).getValue());
		}
        
		// loop de edição de cores na planilha
		for ( var lin = 0; lin < linha.length; lin++) {
			for ( var col = 0; col < linha[0].length; col++) {
				rangeAux = escritaRange.getCell(lin + 3, linha[lin][col] + 1);
				var nomeCanal = canaisAtivos[linha[lin][col] - 17];

				if (linha[lin][col] >= 17) {
					rangeAux.setBackgroundColor(backgroundColor[nomeCanal]);
					rangeAux.setFontColor(corFonte[nomeCanal]);
				}

				if (lin < 3) {
					var celula = escritaRange.getCell(lin + 1,
							linha[lin][col] + 1);
					celula.setBackgroundColor(backgroundColor[nomeCanal]);
					celula.setFontColor(corFonte[nomeCanal]);
				}
			}
		}
       
	}
})();

function onOpen() {
	var lock = null;
	try {
		lock = LockService.getPublicLock();
		if (!lock.tryLock(500)) {
			return;
		}
		var ss = SpreadsheetApp.getActiveSpreadsheet();
		var header = ss.getSheetByName('started').getRange("A1:A1");
		if (!header.getValue()) {
			$.formataEventos();
			$.criarPlanilhaJogos();
			ss.getSheetByName('started').getRange("A1:A1").setValue(true);
		}
	} catch (e) {
		sidi.log(e);
		var ss = SpreadsheetApp.getActiveSpreadsheet();
		ss.getSheetByName('started').getRange("A1:A1").setValue(false);
		ss.getSheetByName('started').getRange("A2:A2").setValue(e.toString());
	} finally {
		if (lock) {
			lock.releaseLock();
		}
	}
}