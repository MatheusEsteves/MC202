(function(t) {

    t.module('evento module');
    
    t.pageTest("open test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .distribuicao .submenu a' ], function(distribuicaoSubMenus) {
        	page.click($(distribuicaoSubMenus.get(1)));
        });
        
        page.step('search events', [ '#filtroEdicaoTabular ' ], function(filtros) {
        	t.equal(filtros.find('#sltCampeonatoFiltro option').size(), 3);
        	page.click(filtros.find('#btnFiltroEdicaoTabular'));
        });
        
        page.step('assert result', ['#divTblJogosTabular .dateContainer', '#divTblJogosTabular table'], function(dateContainer, fixedTable) {
        	t.equal(dateContainer.text().trim(), 'Qua - 03 de Julho')
        	t.equal(fixedTable.find('tr[class^=jogo-tabular]').size(), 10);
        });
        
    });
    
    t.pageTest("add event test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .distribuicao .submenu a' ], function(distribuicaoSubMenus) {
        	page.click($(distribuicaoSubMenus.get(1)));
        });
        
        page.step('open add event', [ '#filtroEdicaoTabular #btnFiltroNovoEvento' ], function(button) {
        	page.click(button);
        });
        
        page.step('add event', [ '#popup #frmNovoEvento', '#popup #btnCriarNovoEvento', '#extraInfo .container'], function(form, saveBtn) {
        	form.find('input[name=nome]').val('Evento Teste')
        	form.find('input[name=data]').val('03/07/2013')
        	form.find('input[name=inicio]').val('09:00')
        	page.click(saveBtn)
        });
        
        page.step('add event', [ '.message .success', '#filtroEdicaoTabular #btnFiltroEdicaoTabular'], function(successMessage, searchBtn) {
        	page.click(searchBtn)
        });
        
        page.step('assert result', [ '#divTblJogosTabular .dateContainer', '#divTblJogosTabular table'], function(dateContainer, fixedTable) {
        	var fixedLine = fixedTable.find('tr[class^=jogo-tabular]:last-child');
        	t.equal(dateContainer.text().trim(), 'Qua - 03 de Julho')
        	t.equal(fixedTable.find('tr[class^=jogo-tabular]').size(), 11);

        	t.equal(fixedLine.find('td.evento').text().trim(), 'Evento Teste');
        });
        
    });
    
    t.pageTest("add mosaic test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .distribuicao .submenu a' ], function(distribuicaoSubMenus) {
        	page.click($(distribuicaoSubMenus.get(1)));
        });
        
        page.step('open add mosaic', [ '#filtroEdicaoTabular #btnFiltroNovoMosaico' ], function(button) {
        	page.click(button);
        });
        
        page.step('add mosaic', [ '#popup #frmNovoMosaico', '#popup #btnCriarNovoMosaico', '#extraInfo .container'], function(form, saveBtn) {
        	form.find('input[name=nome]').val('Teste')
        	form.find('input[name=data]').val('03/07/2013')
        	form.find('input[name=efetivo]').val('23:23')
        	form.find('input[name=aberturaSinal]').val('23:23')
        	form.find('input[name=fechamentoSinal]').val('23:23')
        	form.find('select[name=canal]').val(5)
        	form.find('select[name=divisaoMosaico]').val('DUAS')
        	page.click(saveBtn)
        });
        
        page.step('add mosaic', [ '.message .success', '#filtroEdicaoTabular #btnFiltroEdicaoTabular'], function(successMessage, searchBtn) {
        	page.click(searchBtn)
        });
        
        page.step('assert result', [ '#divTblJogosTabular .dateContainer', '#divTblJogosTabular table'], function(dateContainer, fixedTable) {
        	var fixedLine = fixedTable.find('tr[class^=jogo-tabular]:last-child');
        	t.equal(dateContainer.text().trim(), 'Qua - 03 de Julho')
        	t.equal(fixedTable.find('tr[class^=jogo-tabular]').size(), 11);

        	t.equal(fixedLine.find('td.evento').text().trim(), 'Teste');
        	t.equal(fixedLine.find('td .canal').text().trim(), 'PPV 1');
        });
        
    });
    
    t.pageTest("remove mosaic test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .distribuicao .submenu a' ], function(distribuicaoSubMenus) {
        	page.click($(distribuicaoSubMenus.get(1)));
        });
        
        page.step('search events', [ '#filtroEdicaoTabular #btnFiltroEdicaoTabular'], function(searchBtn) {
        	page.click(searchBtn)
        });
        
        page.step('remove', [ '#apagar_evento_9' ], function(removeButton) {
        	page.click(removeButton)
        });
        
        page.step('confirm remove', [ '#popup #btnConfirmar' ], function(confirmButton) {
        	page.click(confirmButton)
        });
        
        page.step('assert', [ function() {
        	if(page.global('jQuery')('#divTblJogosTabular table tr[class^=jogo-tabular]').size() == 9){
                return page.global('jQuery')('#divTblJogosTabular table tr[class^=jogo-tabular]');
        	}
        }], function(fixedTable) {
        	t.equal(fixedTable.find('tr.jogo-tabular-9').size(), 0);
        });
        
    });
    
    t.pageTest("remove event test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .distribuicao .submenu a' ], function(distribuicaoSubMenus) {
        	page.click($(distribuicaoSubMenus.get(1)));
        });
        
        page.step('search events', [ '#filtroEdicaoTabular #btnFiltroEdicaoTabular'], function(searchBtn) {
        	page.click(searchBtn)
        });
        
        page.step('remove', [ '#apagar_evento_10' ], function(removeButton) {
        	page.click(removeButton)
        });
        
        page.step('confirm remove', [ '#popup #btnConfirmar' ], function(confirmButton) {
        	page.click(confirmButton)
        });
        
        page.step('assert', [ function() {
        	if(page.global('jQuery')('#divTblJogosTabular table tr[class^=jogo-tabular]').size() == 9){
                return page.global('jQuery')('#divTblJogosTabular table tr[class^=jogo-tabular]');
        	}
        }], function(fixedTable) {
        	t.equal(fixedTable.find('tr.jogo-tabular-10').size(), 0);
        });
        
    });
    
})(QUnit);