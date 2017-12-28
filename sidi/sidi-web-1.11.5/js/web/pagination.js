var sidi = sidi || {};

sidi.Pagination = (function() {
	
	return function(container) {

		var montaPaginacao = function(pagina, total, clickAction) {
			var paginas = [];
			paginas.push({"numero": pagina+1, "selected": true, "onclick": false});
			
			var left = pagina - 1;
			var right = pagina + 1;
			var countLeft = 0;
			var countRight = 0;
			
			for (var i = 0; i < 4; i++) {
				if (countLeft <= countRight || right == total) {
					// tenta colocar na esquerda
					if (left > -1) {
						paginas.unshift({"numero": left+1, "selected": false, "onclick": clickAction(left)});
						left--;
						countLeft++;
						continue;
					}
				}
				
				if (right < total) {
					paginas.push({"numero": right+1, "selected": false, "onclick": clickAction(right)});
					right++;
					countRight++;
					continue;
				}
			}
			
			return paginas;
		};
		
		this.render = function(json, pagina, elementosPorPagina, criaPaginacaoOnclick) {
			var totalPaginas = Math.ceil(json.length / elementosPorPagina);
			var paginas = montaPaginacao(pagina, totalPaginas, criaPaginacaoOnclick);
			var htmlPaginacao = "";

			var selected = -1;
			for (var i = 0; i < paginas.length; i++) {
				var p = paginas[i];
				if (!p.selected) {
					htmlPaginacao = htmlPaginacao + "<span class=\"paginacao-botoes paginacao-botoes-link\" data-pagina=\"" + i + "\">" + p.numero + "</span>";
				} else {
					selected = i;
					htmlPaginacao = htmlPaginacao + "<span class=\"paginacao-botoes paginacao-botoes-selected\">" + p.numero + "</span>";
				}
			}
			
			if (!paginas[0].selected) {
				var left = selected - 1;
				htmlPaginacao = "<span class=\"paginacao-botoes paginacao-botoes-link\" data-pagina=\"" + left + "\">&lt;&lt;</span>" + htmlPaginacao;
			}
			
			if (paginas[paginas.length -1].numero != totalPaginas) {
				htmlPaginacao = htmlPaginacao + "<span class=\"paginacao-botoes\">...</span>";
			}
			
			if (!paginas[paginas.length -1].selected) {
				var right = selected + 1;
				htmlPaginacao = htmlPaginacao + "<span class=\"paginacao-botoes paginacao-botoes-link\" data-pagina=\"" + right + "\">&gt;&gt;</span>";
			}
			
			container.html(htmlPaginacao);
			$(".paginacao-botoes-link").each(function() {
				var num = $(this).data("pagina");
				if (num != undefined) {
					var index = parseInt(num);
					if (index > -1) {
						$(this).unbind("click").click(paginas[index].onclick);
					}
				}
			});

		};
	};

})();