(function(t, $) {
var testHelper = {};

testHelper.reset = function(page){
    page.open('../reset');
};

testHelper.logout = function(page){
	page.open('../logout');
};

testHelper.loginAs = function(page, name, pass){
    page.step('login as', [ '#login' ], function(loginContainer) {
    	loginContainer.find('input[type=text]').val(name);
    	loginContainer.find('input[type=password]').val(pass);
    	page.click(loginContainer.find('button'));
    });
};

testHelper.loginAsAdmin = function(page){
	testHelper.loginAs(page, 'admin', 'user');
    page.step('wait default panel', ['#content-info .titulo' ], function(distContent) {
    	t.equal(distContent.text(), 'Liberar Distribui\u00E7\u00E3o Principal');
    });
	
}

t.testHelper = testHelper;
	
})(QUnit, jQuery);