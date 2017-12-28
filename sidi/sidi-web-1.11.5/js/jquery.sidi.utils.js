(function($) {
	if (!$.sidi) {
		$.sidi = {};
	}

	function deepCompare() {
		var i, l, leftChain, rightChain;

		function compare2Objects(x, y) {
			var p;

			if (isNaN(x) && isNaN(y) && typeof x === 'number'
					&& typeof y === 'number') {
				return true;
			}

			if (x === y) {
				return true;
			}

			if ((typeof x === 'function' && typeof y === 'function')
					|| (x instanceof Date && y instanceof Date)
					|| (x instanceof RegExp && y instanceof RegExp)
					|| (x instanceof String && y instanceof String)
					|| (x instanceof Number && y instanceof Number)) {
				return x.toString() === y.toString();
			}

			if (!(x instanceof Object && y instanceof Object)) {
				return false;
			}

			if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
				return false;
			}

			if (x.constructor !== y.constructor) {
				return false;
			}

			if (x.prototype !== y.prototype) {
				return false;
			}

			if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
				return false;
			}

			for (p in y) {
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				} else if (typeof y[p] !== typeof x[p]) {
					return false;
				}
			}

			for (p in x) {
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				} else if (typeof y[p] !== typeof x[p]) {
					return false;
				}

				switch (typeof (x[p])) {
				case 'object':
				case 'function':

					leftChain.push(x);
					rightChain.push(y);

					if (!compare2Objects(x[p], y[p])) {
						return false;
					}

					leftChain.pop();
					rightChain.pop();
					break;

				default:
					if (x[p] !== y[p]) {
						return false;
					}
					break;
				}
			}

			return true;
		}

		if (arguments.length < 1) {
			return true;
		}

		for (i = 1, l = arguments.length; i < l; i++) {

			leftChain = [];
			rightChain = [];

			if (!compare2Objects(arguments[0], arguments[i])) {
				return false;
			}
		}

		return true;
	}

	function objectToFormParam(param) {
		var array = [];
		for ( var i in param) {
			if (typeof (param[i]) == 'object') {
				param[i] = JSON.stringify(param[i]);
				param[i] = encodeURIComponent(param[i]);
			}
			array.push(i + "=" + param[i]);
		}
		return array.join("&");
	}

	function getTemplateSelector(document) {
		return document.getElementsByTagName("template")[0]
				.getAttribute('selector');
	}

	function getDocumentTemplate(document) {
		return $(getTemplateSelector(document));
	}

	function applyMasks(context) {
		context = context != null ? context : $(document);
		context.find('input:text').setMask();
		context.find('.number').setMask('999999999');
		context.find('.data').datepicker();
		context.find('.maxlength').each(function() {
			$(this).charCount({
				allowed : parseInt($(this).attr('maxlength') || 20),
				warning : 1,
				counterText : 'Caracteres restantes: '
			});
		});
	}
	function serializeObject(form) {
		var o = {};
		var a = form.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || null);
			} else {
				o[this.name] = this.value || null;
			}
		});
		return o;
	}
	;

	function deserializeObject(form, jsonValues) {
		$.each(jsonValues, function(key, value) {
			var fields = form.find("[name=" + key + "]");
			if (fields.length == 0) {
				fields = form.find("[data-field=" + key + "]");
			}
			if (fields.length != 0) {
				for ( var i = 0; i < fields.length; i++) {
					var field = fields.eq(i);
					if (field[0].tagName == "INPUT"
							&& field.attr("data-type") == "date") {
						field.val(date.dateToString(value));
					} else if (field[0].tagName == "INPUT"
							&& field.attr("data-type") == "hour") {
						field.val(date.dateToHourString(value));
					} else if (field[0].tagName == "SELECT") {
						field.find("option").filter(function() {
							var element = $(this);
							if (element.data()) {
								return deepCompare(element.data(), value);
							}
							return element.val() == value;
						}).attr('selected', true);
					} else {
						field.val(value);
					}
				}
			}
		});
	}
	;

	$.sidi.objectToFormParam = objectToFormParam;
	$.sidi.getDocumentTemplate = getDocumentTemplate;
	$.sidi.getTemplateSelector = getTemplateSelector;
	$.sidi.applyMasks = applyMasks;
	$.sidi.serializeObject = serializeObject;
	$.sidi.deserializeObject = deserializeObject;
})(jQuery);
