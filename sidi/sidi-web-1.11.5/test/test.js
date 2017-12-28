(function(t, $) {
	$(window).ready(function() {
		var tests = [];
		var test = $.querystring().get('t');
		if (test) {
			tests.push(test);
		} else {
			tests.push('loginTest');
			tests.push('operadoraTest');
			tests.push('canalTest');
			tests.push('eventoTest');
			tests.push('comutacaoTest');
		}
		t.loadTests(tests);
	});
})(QUnit, jQuery);