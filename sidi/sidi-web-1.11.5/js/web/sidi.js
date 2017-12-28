var sidi = sidi || {};

(function($, sidi) {
    
	sidi.nomePerfil = [];
    
    sidi.setPerfil = function(perfil) {
		sidi.nomePerfil = perfil;
	};
	
	sidi.funcionalidades = [];
	sidi.nomePerfil = [];
    
    sidi.setFuncionalidades = function(funcionalidades) {
		sidi.funcionalidades = funcionalidades;
	};
    
	sidi.setPerfil = function(perfil) {		
		sidi.nomePerfil = perfil;
	};
	
    sidi.possuiTodasAutorizacoes = function() {
		var autorizado = true;
		$.each(arguments, function(idx, funcionalidade) {
            autorizado = autorizado && ($.inArray(funcionalidade, sidi.funcionalidades) > -1);
		});
		return autorizado;
	};
    
    sidi.possuiAutorizacao = function() {
        var autorizado = false;
        jQuery.each(arguments, function(idx, funcionalidade) {
            if (jQuery.inArray(funcionalidade, sidi.funcionalidades) > -1) {
                autorizado = true;
                return;
            }
        });
        return autorizado;
    };
    
    sidi.isOperadora = function() {
    	
    	if (sidi.nomePerfil) {
    		return (sidi.nomePerfil === "Operadora");
    	}
    	
    	return false;
    };
    
    sidi.temPerfil = function(perfil) {
    	if (sidi.nomePerfil) {
    		return (sidi.nomePerfil === perfil);
    	}
    	
    	return false;
    };

	$.keys = function(map) {
		var ret = [];
		$.each(map, function(key, value) { 
			  ret.push(key);
		});
		return ret;
	};
	
	sidi.isOperadora = function() {
     	
     	if (sidi.nomePerfil) {
    		return (sidi.nomePerfil === "Operadora");
    	}
     	
     	return false;
	};
		
	sidi.temPerfil = function(perfil) {
		if (sidi.nomePerfil) {
			return (sidi.nomePerfil === perfil);
		}
	     	
		return false;
	};
    
})(jQuery, sidi);
