(function(t, $) {

	QUnit.config.autostart = false;
	
	$.extend(t, {
		eq : function() {
			this.equal.apply(this.equal, arguments);
		},
		match : function(actual, expected, message) {
			QUnit.push(typeof (actual) == 'string' && actual.match(expected), actual, expected, message);
		}
	});

	t.testStart(function(details) {
		if(console.clear) {
			console.clear();
		}
		console.log("Starting test: ", details.module, ', ', details.name);
	});
	
	t.results = [];
	
	t.testDone(function(details) {
		t.results.push(details);
	});

	t.done(function(details) {
		$('#qunit').addClass('finished');
		if (details.failed > 0) {
			$('#qunit').addClass('failed');
		}
		$('#qunit').addClass('success');
		showResults();
	});
	
	function showResults(){
		if(t.results.length > 0){
			console.log('====================================== RESULT ======================================');
			for(var i=0;i<t.results.length;i++){
				var result = t.results[i];
				var messages = result.failed == 0 ? 'SUCCESS' : 'FAIL   '; 
				console.log(messages,' - ',result.module,' - ',result.name, ' - Assertions: ', result.total, ' - Passed: ', result.passed, ' - Failed: ',result.failed, ' - ', result.duration,'ms');
			}
			t.results = [];
		}
	}

	function loadTests(tests) {
		if (!tests.length) {
			t.start();
			return;
		}
		var test = tests.shift();
		$.getScript('modules/' + test + '.js', function() {
			loadTests(tests);
		});
	}
	t.loadTests = loadTests;

	$(window).ready(function() {
		var hash = '' + location.hash;
		if (hash == '#hidden') {
			$('#qunit-fixture').addClass('fixture-hidden');
		}
	});

})(QUnit, jQuery);