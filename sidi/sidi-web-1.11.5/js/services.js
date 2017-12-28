(function($) {

	$.ajaxPrefilter(function(options, originalOpts, jqXHR) {
		var contentType = originalOpts.contentType;
		if (!contentType) {
			options.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
		}
		var dataType = options.dataType;
		if (dataType === 'json') {
			var url = options.url;
			if (url.indexOf('?') < 0) {
				url += '?';
			} else {
				url += '&';
			}
			var p = Math.ceil(Math.random() * 1000000);
			url += p + '=' + p;
			options.url = url;
		}
	});
	
	$.ajaxSetup({
		cache : true,
		timeout : 1200000,
		error : function(resp) {
			if (resp.status == 500) {
				$('.message').message(i18n.get('processo-erro'), 'error', true);
				$('html, body').animate({scrollTop:0}, 'fast');
				$('#popup').xundialog();
			} else if (resp.status == 403) {
				$('.message').message(i18n.get('processo-proibido'), 'error', true);
				$('html, body').animate({scrollTop:0}, 'fast');
				$('#popup').xundialog();
			} else if (resp.status == 400) {
			    var error = $.parseJSON(resp.responseText);
				$('.message').message(i18n.get(error.message, error.args), 'error', true);
				$('html, body').animate({scrollTop:0}, 'fast');
				$('#popup').xundialog();
			} else if (resp.statusText == "timeout") {
				$('.message').message(i18n.get('processo-demorado'), 'error', true);
				$('html, body').animate({scrollTop:0}, 'fast');
				$('#popup').xundialog();
			}
		},
		traditional : true
	});
	
	if(!$.sidi){
		$.sidi = {};
	}
	
	function adapt(opts){
		return function(param) {
			if (typeof (param) == 'function') {
			}

			opts.dataType = 'json';
			if (param !== null) {
				if (opts.type == "GET") {
					opts.data = $.sidi.objectToFormParam(param);
				} else {
					if (!$.isArray(param)) {
						param = [param];
					}
					opts.contentType = 'application/json;charset=UTF-8';
					opts.data = JSON.stringify(param);
				}
			}
			return $.ajax(opts);
		}
	}

	function mount(desc, method, type, url){
		var prefix = '';
		if(url.trim().charAt(0) != '/'){
			prefix = prefix + '/sidi/';
		}
		var value = $.sidi;
		if(desc && desc.trim() != ''){
			if(!value[desc]){
				value[desc] = {};
			}
			value = value[desc];
			prefix = prefix+ 'sidi/' + desc + '/';
		}
		var opts = {};
		opts.url = prefix + url;
		opts.type = type;
		value[method] = adapt(opts);
		
	}
	
	function mountUsuario(method, type, url){
		mount('usuario', method, type, url);
		
	}
	
	function mountCanais(method, type, url){
		mount('canais', method, type, url);
		
	}
	
	function mountCampeonatos(method, type, url){
		mount('campeonatos', method, type, url);
		
	}       
	function mountDistribuicao(method, type, url){
        mount('distribuicao', method, type, url);
        
	}
	
	function mountJogos(method, type, url){
	        mount('jogos', method, type, url);
	        
	}
	
	function mountMosaicos(method, type, url){
	        mount('mosaicos', method, type, url);
	        
	}
	
	function mountEventos(method, type, url){
	        mount('eventos', method, type, url);
	        
	}

	
	mount('', 'getMessages', 'GET', 'messages');
	
	mountUsuario('buscarFuncionalidades', 'GET', 'buscarFuncionalidades');
	mountUsuario('buscarOperadorasUsuario', 'GET', 'buscarOperadorasUsuario');
	mountUsuario('getPerfilUsuarioLogado', 'GET', 'getPerfilUsuarioLogado');
	
	mountCanais('buscarTiposCanais', 'GET', 'buscarTiposCanais');
	mountCanais('buscarCanais', 'GET', 'buscarCanais');
	mountCanais('buscarCanalPorTipo', 'GET', 'buscarCanalPorTipo');
	mountCanais('excluirCanal', 'GET', 'excluirCanal');
	mountCanais('criar', 'POST', 'criar');
	mountCanais('salvar', 'POST', 'salvar');
	mountCanais('salvarOrdenacao', 'POST', 'salvarOrdenacao');
	
	mountCampeonatos('buscarCampeonatos', 'GET', 'buscarCampeonatos');
	
	mountDistribuicao('buscarQuantidadeDistribuicaoTabular', 'GET', 'buscarQuantidadeDistribuicaoTabular');
	mountDistribuicao('buscarDistribuicaoTabular', 'GET', 'buscarDistribuicaoTabular');
	mountDistribuicao('salvarDistribuicaoTabular', 'POST', 'salvarDistribuicaoTabular');
	mountDistribuicao('salvarDistribuicaoTabularMosaico', 'POST', 'salvarDistribuicaoTabularMosaico');
	
	mountJogos('todosEstadios', 'GET', 'todosEstadios');
	mountJogos('salvar', 'POST', 'salvar');
	
	mountEventos('salvarEvento', 'POST', 'salvarEvento');
	
	mountMosaicos('apagarMosaico', 'POST', 'apagarMosaico');
	mountMosaicos('salvarMosaico', 'POST', 'salvarMosaico');
	mountMosaicos('divisoes', 'GET', 'divisoes');
	
		
})(jQuery);
