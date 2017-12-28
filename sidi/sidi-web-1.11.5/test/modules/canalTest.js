(function(t) {

    t.module('canal module');
    
    t.pageTest("search test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .cadastros .submenu .head' ], function(cadastroSubMenus) {
        	page.click($(cadastroSubMenus.get(5)));
        });
        
        page.step('assert result', [ '#tblCanaisCadastrados tbody tr' ], function(resultLines) {
        	t.equal(resultLines.length, 7);
        	t.equal($(resultLines.get(0)).find('td').get(0).innerHTML, 'CANAL 1');
        	t.equal($(resultLines.get(1)).find('td').get(0).innerHTML, 'CANAL 2');
        	t.equal($(resultLines.get(2)).find('td').get(0).innerHTML, 'CANAL 1 HD');
        	t.equal($(resultLines.get(3)).find('td').get(0).innerHTML, 'CANAL 2 HD');
        	t.equal($(resultLines.get(4)).find('td').get(0).innerHTML, 'PPV 2');
        	t.equal($(resultLines.get(5)).find('td').get(0).innerHTML, 'PPV 1');
        	t.equal($(resultLines.get(6)).find('td').get(0).innerHTML, 'ALTERNATIVO 1');
        });
        
    });
    
    t.pageTest("add test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .cadastros .submenu .head' ], function(cadastroSubMenus) {
        	page.click($(cadastroSubMenus.get(5)));
        });
        
        
        page.step('open form', [ '#btnCadastroDeCanais' ], function(btn) {
        	page.click(btn);
        });
        
        page.step('fill form', [ '#frmNovoCanal' ], function(form) {
        	form.find('#txtNome').val('Canal Test');
        	form.find('#sltTiposCanais').val('PPV');
        });
        
        page.step('save', [ '#btnNovoCanal' ], function(btn) {
        	page.click(btn);
        	
        });
        
        page.step('assert result', [ '#tblCanaisCadastrados tbody tr:nth-child(8)', '#tblCanaisCadastrados tbody tr' ], function(waitElement, resultLines) {
        	t.equal(resultLines.length, 8);
        	var resultLine = $(resultLines.get(0));
        	t.equal(resultLine.find('td').get(0).innerHTML, 'Canal Test');
        	t.equal(resultLine.find('td').get(1).innerHTML, 'PPV');
        	t.equal(resultLine.find('td').get(2).innerHTML, 'Não');
        });
        
    });
    
    t.pageTest("edit test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .cadastros .submenu .head' ], function(cadastroSubMenus) {
        	page.click($(cadastroSubMenus.get(5)));
        });
        
        page.step('open edit', [ '#divCanaisCadastrados tbody tr:nth-child(1)' ], function(firstLine) {
        	page.click(firstLine.find('#editarCanal_0'));
        });
        
        page.step('edit', [ '#informacoesBasicas form','#btnRealizarEdicao' ], function(form, btn) {
        	form.find('#txtEditarNome').val('Canal editado');
        	form.find('#sltEditarTiposCanais').val('FECHADO');
        	page.click(btn);
        	
        });
        
        page.step('check',['#tblCanaisCadastrados tbody tr:nth-child(1)'], function(canal){
        	if(canal.find('td:nth-child(1)').text() == 'Canal editado'){
        		var columns = canal.find('td');
        		t.equal(columns.get(1).innerHTML, 'FECHADO');
        		t.equal(columns.get(2).innerHTML, 'Não');
        	}else{
        		page.retry();
        	}
        });
        
    });
    
    t.pageTest("remove test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .cadastros .submenu .head' ], function(cadastroSubMenus) {
        	page.click($(cadastroSubMenus.get(5)));
        });
        
        page.step('remove', [ '#divCanaisCadastrados tbody tr:nth-child(1)' ], function(firstLine) {
        	page.click(firstLine.find('#apagarCanal_0'));
        });
        
        page.step('confirm', [ '#btnRealizarExclusao' ], function(confirmButton) {
        	page.click(confirmButton);
        });
        
        page.step('check',['#tblCanaisCadastrados tbody'], function(tableBody){
        	var global = page.global('jQuery');
        	t.waitFor(function() {
        		return global('#tblCanaisCadastrados tbody tr').length == 6;
        	}).done(function() {
        		t.equal(global('#tblCanaisCadastrados tbody tr').length, 6);
        	});
        });
        
    });
    
})(QUnit);