(function($) {
	date = {
		stringToDate : function(data) {
			return $.datepicker.parseDate('dd/mm/yy', data);
		},
		stringToDateHour : function(data, hora) {
			data = $.trim(data);
			hora = $.trim(hora);
			data = data ? data : '01/01/1970';
			hora = hora ? hora : '00:00';
			return moment(data + '-' + hora, "DD/MM/YYYY[-]HH:mm");
		},
		dateToString : function(dataLongUTC) {
			return $.datepicker.formatDate('dd/mm/yy', new Date(dataLongUTC));
		},
		dateUTCToHourString : function(dataLongUTC) {
			var now = new Date();
			var dt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, dataLongUTC);

			var hora = dt.getHours() < 10 ? '0' + dt.getHours() : '' + dt.getHours();
			var minuto = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : '' + dt.getMinutes();
			return hora + ':' + minuto;
		
		},
		dateToHourString : function(dataLongUTC) {
			if(!dataLongUTC){
				return '';
			}
			var dt = new Date(dataLongUTC);
			var hora = dt.getHours() < 10 ? '0' + dt.getHours() : '' + dt.getHours();
			var minuto = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : '' + dt.getMinutes();
			return hora + ':' + minuto;
		},
		dateToWeek : function(dataLongUTC) {
			var dt = new Date(dataLongUTC);
			return i18n.get('semana-' + dt.getDay());
		},
		getDayFromDate : function(dataLongUTC){
			var dt = new Date(dataLongUTC);
			var dia = dt.getDate() < 10 ? '0' + dt.getDate() : '' + dt.getDate();
			return dia;
		},
		getMonthFromDate : function(dataLongUTC){
			var dt = new Date(dataLongUTC);
			return i18n.get('mes-' + dt.getMonth());
 		},
		hourToMiliseconds : function(hourString) {
			var hr = hourString.substring(0,2) * 60 * 60 * 1000;
			var min = hourString.substring(3,5) * 60 * 1000;
			return hr + min;
		},
		round : function (data) {
			var long = data.getTime();
			long = long - (data.getHours() * 60 * 60 * 1000);
			long = long - (data.getMinutes() * 60 * 1000);
			long = long - (data.getSeconds() * 1000);
			long = long - data.getMilliseconds();
			return new Date(long);
		},
		setHour : function (hour) {
			var data = new Date();
			var long = data.getTime();
			long = long - (data.getHours() * 60 * 60 * 1000);
			long = long - (data.getMinutes() * 60 * 1000);
			long = long - (data.getSeconds() * 1000);
			long = long - data.getMilliseconds();
			return new Date(long + hour).getTime();
		}
	}
	
	utils = {
		map : function(arr) {
			var ret = {};
			$.each(arr, function(idx, elem) {
				ret[elem.id] = elem;

			})
			return ret;
		},
		find : function(arr, id) {
			for (var i = 0; i < arr.length ; i++) {
				if (arr[i]['id'] == id) {
					return arr[i];
				}
			}
			return null;
		},
		findByField : function(arr, field, value) {
			for (var i = 0; i < arr.length ; i++) {
				if (arr[i][field] == value) {
					return arr[i];
				}
			}
			return null;
		},
		findByFields : function() {
			var arr = arguments[0];
			var value = arguments[1];
			for (var i = 0; i < arr.length ; i++) {
				var item = arr[i];
				var field = item;
				for (var j = 2; j < arguments.length ; j++) {
					var key = arguments[j];
					item = field;
					field = field[key];
				}
				if (field == value) {
					return item;
				}
			}
			return null;
		},
		inArray : function() {
			var arr = arguments[0];
			var value = arguments[1];
			for (var i = 0; i < arr.length ; i++) {
				var item = arr[i];
				var field = item;
				for (var j = 2; j < arguments.length ; j++) {
					var key = arguments[j];
					item = field;
					field = field[key];
				}
				if (field == value) {
					return arr[i];
				}
			}
			return null;
		},
		remove: function(arr, idx) {
			var begin = arr.slice(0, idx);
			var end = arr.slice(idx + 1);
			return begin.concat(end);
		},
		removeById: function(arr, id) {
			for (var i = 0; i < arr.length ; i++) {
				if (arr[i]['id'] == id) {
					return utils.remove(arr, i);
				}
			}
		},
		removeByField: function(arr, field, value) {
			for (var i = 0; i < arr.length ; i++) {
				if (arr[i][field] == value) {
					return utils.remove(arr, i);
				}
			}
		},
		validaFormularioPopUp : function(form, messages, seletorErro) {
			return utils.validaFormulario(form, messages, seletorErro);
		},

		validaFormulario : function(form, messages, seletorErro) {
			var mandatoryFields = $(form).find("li.required").children('input[type=text], textarea, select,input[type=password]');
			var emptyFields = [];
			
			$(mandatoryFields).each(function() {
				var value = $(this).val();
				if (!value || value == undefined || value == "") {
					emptyFields.push(this);
				}
			});
			
			if (emptyFields.length < 1) {
				return true;
			}
			
			var target = arguments[1];
			var msgs = target != null ? $('.'+target) : $(seletorErro);
			msgs.html('');
			$(emptyFields).each(function(){
				var label = $(this).siblings("label")[0];
				if (label) {
					var field = $(label).text();
					field = field.replace('*', '');
					field = field.replace(':', '');
					msgs.message(i18n.get('campo-obrigatorio', field), 'error');
					$('html,body').animate({scrollTop:0},'fast');
				}
			});
			
			return false;
		},
		validate: function(form, messages, selector) {
			var messageSelector = selector ? selector : '.message';
			return utils.validaFormulario(form, messages, messageSelector);
		},
		bind: function(form, json) {
			if (!json) {
				json = {};
			}
			var controle = $(form).find('input[alt="integer"]').each(function(idx, input) {
				var name = $(input).attr('name');
				if (name) {
					var valor = $.trim($(input).val());
					json[name] = (valor && valor != "" ? parseInt(valor) : null); 
				}
			});
			controle = controle.add($(form).find('input[type=checkbox]').each(function(idx, input) {
				var name = $(input).attr('name');
				if (name) {
					json[name] = input.checked;
				}
			}));
			controle = controle.add($(form).find('input[alt=date]').each(function(idx, input) {
				var name = $(input).attr('name');
				var valor = $.trim($(input).val());
				if (name && valor) {
					json[name] = date.stringToDate(valor).getTime()
				} else {
					json[name] = null;
				}
			}));
			controle = controle.add($(form).find('input.ui-autocomplete-input').each(function(idx, input) {
				var name = $(input).attr('name');
				var valor = $(input).data('sidi.autocomplete');
				if ($.trim($(input).val())) {
					if (name && valor) {
						json[name] = valor;
					}
				} else {
					json[name] = null;
				}
			}));
			controle = controle.add($(form).find('input[type=text], textarea').each(function(idx, input) {
				if (controle.index(input) < 0) {
					var name = $(input).attr('name');
					if (name) {
						json[name] = $.trim($(input).val());
					}
				}
			}));
			controle = controle.add($(form).find('select').each(function(idx, input) {
				var name = $(input).attr('name');
				var valor = $.trim($(input).val());
				if (name && valor) {
					json[name] = $(input).data('sidi.select') || valor;
				} else {
					json[name] = null;
				}
			}));
			controle = controle.add($(form).find('input[type=radio]').each(function(idx, input) {
				var name = $(input).attr('name');
				var value = $(input).attr('value');
				if (name && input.checked) {
					json[name] = value;
				}
			}));
			return json;
		},
		clear: function(form) {
			$(form).find("input[type=text], textarea").each(function(idx, input) {
				$(input).val("");
			});
			$(form).find("input[type=password]").each(function(idx, input){
				$(input).val("");
			});
			$(form).find("input[type=checkbox]").each(function(idx, input) {
				$(input).attr("checked", "");
			});
			$(form).find("input.ui-autocomplete-input").each(function(idx, input) {
				$(input).data('sidi.autocomplete', null);
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
		trim: function(str, tamanho) {
			return utils.reduzirTamanho($.trim(str), tamanho);
		},
		getPropriedadeClasseCSS: function(className, prop) {
			var $inspetor = $('<div class="' + className + '"/>').hide().appendTo('body');
			try {
				return $inspetor.css(prop);
			} finally {
				$inspetor.remove();
			}
		}
	}
	
	$.postJSON = function(optsOrUrl, data, callback) {
		var url = optsOrUrl;
		if ($.isPlainObject(optsOrUrl)) {
			url = optsOrUrl.url;
			data = optsOrUrl.data;
			callback = optsOrUrl.callback;
			
			if (optsOrUrl.paths) {
				url += '?' +$.param({path : optsOrUrl.paths});
			}
		}
		var json = data;
		if (!$.isArray(data)) {
			json = [data];
		}
		
		return $.ajax({
				url: url,
				type: 'POST',
				contentType: 'application/json;charset=UTF-8',
				dataType: 'json',
				data: JSON.stringify(json),
				success: callback
			});
	}
	
	$.fn.sidiAutocomplete = function(dict, json) {
		if (! dict.minLength && dict !== 0) {
			dict.minLength = 2;
		}
		
		var temp = dict.select;
		
		dict.select = function(event, ui) {
			var obj = null;
			$(json).each(function() {
				if (this.id == ui.item.value) {
					obj = this;
					return false;
				}
			});
			$(event.target).data({'sidi.autocomplete': obj});
			$(event.target).data("id", obj.id);
			
			if (dict.select.original) {
				return dict.select.original(event, ui);
			}
			return false;
		};
		dict.select.original = temp;
		
		temp = dict.focus;
		dict.focus = function(event, ui) {
			$(event.target).val(ui.item.label);
			
			if (dict.focus.original) { 
				return dict.focus.original(event, ui);
			}
			return false;
		};
		dict.focus.original = temp;
		
	    return this.each(function() {
	        $(this).autocomplete(dict);
	    });
	};

	$.fn.isEmail = function() {
		var regexp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var value = $(this).val();
		return regexp.test(value);
	}

	$.fn.isValidPassword = function() {
		var value = $.trim($(this).val());
		if (value != '') {
			var regexp = /(?=.*[a-zA-Z].*)(?=.*[0-9].*)/;
			return regexp.test(value) && value.length >= 6;
		}
		return true;
	}
	
	$.fn.getOptions = function() {
		var ret = [];
		$(this).find('option').each(function(idx, opt) {
			ret.push($(opt).attr('value'));
		});
		return ret;
	}

	$.fn.floatScroll = function(container) {
		var max = 0;
		$(container).children().each(function() {
			var w = $(this).width();
			if (w > max) {
				max = w;
			}
		});

		var rate = Math.round(max / 5);

		$(this).find("a.next").click(function() {
			var l = $(container).scrollLeft();
			$(container).scrollLeft(l + rate);
			$('.container-table-scroll .headerOnly').scrollLeft(l + rate);
			return false;
		});

		$(this).find("a.prev").click(function() {
			var l = $(container).scrollLeft();
			$(container).scrollLeft(l - rate);
			$('.container-table-scroll .headerOnly').scrollLeft(l - rate);
			return false;
		});

	}
	
	$.moveHeader = function(scrollPosition){
		var width = ($('#divTabelas').width()) - ($('.container-table-fixa').width()) - 13;
		$('.container-table-fixa .tabela-distribuicao-operadora').first().addClass('headerOnly').css({'display': 'block', 'height': '21px', 'width': '100%', 'position': 'absolute','top':scrollPosition});
		$('.container-table-scroll .tabela-distribuicao-operadora').css('width',width);
		$('.container-table-scroll .tabela-distribuicao-operadora').first().addClass('headerOnly').css({'display': 'block', 'height': '21px', 'position': 'absolute','top':scrollPosition, 'left':$('.container-table-fixa').width()});
	}

	$(document).ready(function() {
//		$('.message').messageMonitor(7000);
	});
	
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
	
    $.deach = function(arr, func, opts) {
        var dfd = new $.Deferred();
        var step = opts && opts.step ? opts.step : Math.max(2, Math.round(0.1 * arr.length));
        var idx = 0;
        var ifunc = function() {
            var loopIdx = 0;
            while (idx < arr.length && loopIdx < step) {
                try {
                    func.apply(arr[idx], [idx, arr[idx]]);
                } catch (e) {
                    dfd.reject(e, idx, arr[idx]);
                    throw e;
                }
                idx++; loopIdx++;
            }
            loopIdx = null;
            dfd.notify(idx - 1, arr[idx - 1]);       
            if (idx < arr.length) {
                window.setTimeout(ifunc, 1);
            } else {
                dfd.resolve(arr);
            }
        }
        window.setTimeout(ifunc, 0);
        return dfd.promise();
    }
    $.fn.deach = function(func, opts) {
        return $.deach.apply(this, [this, func, opts]);
    }
    $.whenAll = function(dfds) {
    	var master = new $.Deferred();
    	var count = 0;
    	var masterDone = function() {
			count++;
			if (count == dfds.length) {
				master.resolve();
			}
		}
    	var masterFail = function() {
			master.reject();
		}
    	$(dfds).each(function(idx, dfd) {
    		dfd.done(masterDone);
    		dfd.fail(masterFail);
    	});
    	return master.promise();
    }
    
    $.yield = function(func) {
    	var dfd = new $.Deferred();
    	try {
    		var dfdFunc = function() {
    			func.call();
    			dfd.resolve();
    		}
    		window.setTimeout(dfdFunc, 0);
    	} catch(e) {
    		dfd.reject(e);
    	}
    	return dfd.promise();
    }
    
    
    // funcao auxiliar para testes de performance
    $.Timer = function() {
		this.time = null,
		this.start = function() {
			this.time = new Date().getTime();
			return this;
		},
		this.end = function(msg) {
			try {
				console.info(msg, (new Date().getTime() - this.time) + ' ms');
			} catch(e) {}
			this.time = null;
			return this;
		}
    }
    
    $.fn.extend({
    	intVal: function() {
    		var val = $(this).val();
    		if (val) {
				return parseInt(val);
    		} else {
    			return 0;
    		}
    	}
    });
		
})(jQuery);
