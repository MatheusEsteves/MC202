(function(t) {

    t.module('login module');
    
    t.pageTest("login as admin", function(page) {

    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('second step', [ '.menu-principal' ], function(menu, distContent) {
        	t.equal(menu.find('li.head').length, 4);
        	t.equal(menu.find('ul.submenu li').length, 15);
        });
        
        
    });
    
    t.pageTest("login as test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAs(page,'test','user');
        
        page.step('second step', [ '.menu-principal' ], function(menu) {
        	t.equal(menu.find('li.head').length, 2);
        	t.equal(menu.find('ul.submenu li').length, 3);
        });
        
        
    });
})(QUnit);