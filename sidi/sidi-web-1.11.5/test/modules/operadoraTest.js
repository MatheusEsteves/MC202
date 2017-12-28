(function(t) {

    t.module('modulo operadora');
    
    t.pageTest("simple test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('second step', [ '.head.operadora .submenu li a' ], function(subMenuOption) {
        	page.click(subMenuOption);
        });
        
        page.step('second step', [ '.lista-de-exibicao-operadora #operadorasDisponiveis option' ], function(operadorasDisponiveis) {
        	t.equal(operadorasDisponiveis.length, 1)
        });
        
        
        
    });
})(QUnit);