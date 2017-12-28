(function(t) {

    t.module('comutacao module');
    
    t.pageTest("crud test", function(page) {
    	t.testHelper.logout(page);
    	t.testHelper.loginAsAdmin(page);
        
        page.step('open panel', [ '#header .cadastros .submenu .head' ], function(cadastroSubMenus) {
        	page.click($(cadastroSubMenus.get(8)));
        });
        
        
        page.step('open form', [ '#btnCadastrarComutacao' ], function(btn) {
        	page.click(btn);
        });
        
        page.step('fill form', [ '#frmNovaComutacao' ,'#frmNovaComutacao #sltCanalPrincipal .canal_principal','#frmNovaComutacao #sltCanalComutacao .canal_comutacao'], 
        		function(form) {
        	form.find('#txtNomeComutacao').val('Comutacao teste auto');
        	form.find('#txtLocalComutacao').val('Comutacao teste auto local');
        	form.find('#txtDataComutacao').val('12/12/2013');
        	form.find('#txtHoraComutacao').val('13:13');
        	form.find('#sltCanalPrincipal').val(form.find('#sltCanalPrincipal option').eq(1).val());
        	form.find('#sltCanalComutacao').val(form.find('#sltCanalComutacao option').eq(1).val());
        });
        
        page.step('select afiliadas', [ '#sltAfiliadas_chzn', '#imgAddAfiliada' ], function(sltAfiliadas, addButton) {
        	sltAfiliadas.mousedown();
        	sltAfiliadas.find(".uf_TO").mouseup();
        	addButton.click();

        	sltAfiliadas.mousedown();
        	sltAfiliadas.find(".afiliada_FAB").mouseup();
        	addButton.click();
        });
        page.step('check afiliadas table', [ '#tblAfiliadasBloqueadas' ], function(afiliadasTable) {
        	var resultLines = afiliadasTable.find(afiliadasTable.find("tbody tr:not(.template-row)"));
        	t.equal(resultLines.length, 4);
        	t.equal(resultLines.eq(0).find(".field-column.nome").text(), "TV ANHANGUERA DE ARAGUAÍNA",'check afiliadas table');
        	t.equal(resultLines.eq(1).find(".field-column.nome").text(), "TV ANHANGUERA GURUPI",'check afiliadas table');
        	t.equal(resultLines.eq(2).find(".field-column.nome").text(), "TV ANHANGUERA PALMAS",'check afiliadas table');
        	t.equal(resultLines.eq(3).find(".field-column.nome").text(), "INTER TV DOS VALES",'check afiliadas table');
        });
        
        page.step('add comutacao',["#btnNovaComutacao"], function(addBt){
        	page.click(addBt);
        	
        });

        
        page.step('check clean form', [ '.message .success', '#frmNovaComutacao' ], function(message, form) {
        	t.equal(form.find('#txtNomeComutacao').val(), "");
        	t.equal(form.find('#txtLocalComutacao').val(), "");
        	t.equal(form.find('#txtDataComutacao').val(), "");
        	t.equal(form.find('#txtHoraComutacao').val(), "");
        	t.equal(form.find('#sltCanalPrincipal').val(), "");
        	t.equal(form.find('#sltCanalComutacao').val(), "");
        	t.equal(form.find('#sltAfiliadas').val(), "");
        });
        
        page.step('list comutacao',["#btnListaDeComutacoes"], function(listBt){
        	page.click(listBt);
        });

        
        page.step('check list result', [ '#tblComutacoesCadastradas tbody tr:not(.template-row)' ], function(result) {
        	var result1 = result.eq(0);
        	t.equal(result1.find(".nome").text(), "COMUTACAO 1",'check list result');
        	t.equal(result1.find(".data").text(), "03/07/2013 08:00",'check list result');
        	t.equal(result1.find(".canal-principal").text(), "Canal 1 HD",'check list result');
        	t.equal(result1.find(".canal-comutacao").text(), "Alternativo 1",'check list result');
        	var afiliadas1 = $.map(result1.find(".afiliadas ul li"), function(mapElement){
        		return $(mapElement).text().trim()
        	}).join(",");

        	t.equal(afiliadas1, "EPTV CAMPINAS",'check list result');

        	var result2 = result.eq(1);
        	t.equal(result2.find(".nome").text(), "Comutacao teste auto",'check list result');
        	t.equal(result2.find(".data").text(), "12/12/2013 13:13",'check list result');
        	t.equal(result2.find(".canal-principal").text(), "Canal 1 HD",'check list result');
        	t.equal(result2.find(".canal-comutacao").text(), "Alternativo 1",'check list result');
        	var afiliadas2 = $.map(result2.find(".afiliadas ul li"), function(mapElement){
        		return $(mapElement).text().trim()
        	}).join(",");

        	t.equal(afiliadas2, "TV ANHANGUERA DE ARAGUAÍNA,TV ANHANGUERA GURUPI,TV ANHANGUERA PALMAS,INTER TV DOS VALES",'check list result');
        	
        });
        
        page.step('edit comutacao',[ '#tblComutacoesCadastradas tbody tr:not(.template-row)' ], function(result){
        	page.click(result.eq(1).find(".edit"));
        });
        
        page.step('check fill form', [ '#frmNovaComutacao' ,'#frmNovaComutacao #sltCanalPrincipal .canal_principal','#frmNovaComutacao #sltCanalComutacao .canal_comutacao'], 
        		function(form) {
        	t.equal('Comutacao teste auto', form.find('#txtNomeComutacao').val());
        	t.equal('12/12/2013', form.find('#txtDataComutacao').val());
        	t.equal('13:13', form.find('#txtHoraComutacao').val());
        	t.equal(form.find('#sltCanalPrincipal option').eq(1).val(), form.find('#sltCanalPrincipal').val());
        	t.equal(form.find('#sltCanalComutacao option').eq(1).val(), form.find('#sltCanalComutacao').val());
        });
        

        page.step('check edit afiliadas table', [ '#tblAfiliadasBloqueadas' ], function(afiliadasTable) {
        	var resultLines = afiliadasTable.find(afiliadasTable.find("tbody tr:not(.template-row)"));
        	t.equal(resultLines.length, 4,'check edit afiliadas table');
        	t.equal(resultLines.eq(0).find(".field-column.nome").text(), "TV ANHANGUERA DE ARAGUAÍNA",'check edit afiliadas table');
        	t.equal(resultLines.eq(1).find(".field-column.nome").text(), "TV ANHANGUERA GURUPI",'check edit afiliadas table');
        	t.equal(resultLines.eq(2).find(".field-column.nome").text(), "TV ANHANGUERA PALMAS",'check edit afiliadas table');
        	t.equal(resultLines.eq(3).find(".field-column.nome").text(), "INTER TV DOS VALES",'check edit afiliadas table');
        });
        

        page.step('fill edit form', [ '#frmNovaComutacao', "#frmNovaComutacao #sltAfiliadas_chzn"], function(form, sltAfiliadas) {
        	form.find('#txtNomeComutacao').val('Comutacao teste auto 2');
        	form.find('#txtDataComutacao').val('13/12/2013');
        	form.find('#txtHoraComutacao').val('21:23');
        	form.find('#sltCanalPrincipal').val(form.find('#sltCanalPrincipal option').eq(2).val());

        	sltAfiliadas.mousedown();
        	sltAfiliadas.find(".afiliada_CAM").mouseup();
        	page.click(form.find("#imgAddAfiliada"));
        });

        page.step('check edit afiliadas table', [ '#tblAfiliadasBloqueadas' ], function(afiliadasTable) {
        	var resultLines = afiliadasTable.find(afiliadasTable.find("tbody tr:not(.template-row)"));
        	t.equal(resultLines.length, 5,'check edit afiliadas table');
        	t.equal(resultLines.eq(0).find(".field-column.nome").text(), "TV ANHANGUERA DE ARAGUAÍNA",'check edit afiliadas table');
        	t.equal(resultLines.eq(1).find(".field-column.nome").text(), "TV ANHANGUERA GURUPI",'check edit afiliadas table');
        	t.equal(resultLines.eq(2).find(".field-column.nome").text(), "TV ANHANGUERA PALMAS",'check edit afiliadas table');
        	t.equal(resultLines.eq(3).find(".field-column.nome").text(), "INTER TV DOS VALES",'check edit afiliadas table');
        	t.equal(resultLines.eq(4).find(".field-column.nome").text(), "EPTV CAMPINAS",'check edit afiliadas table');
        });
        
        page.step('confirm edit', [ '#btnNovaComutacao'], function(editBt) {
        	page.click(editBt);
        });
        
        page.step('check edit list result', [ ".message[data-last-message='sucesso-alterar-comutacao']", '#tblComutacoesCadastradas tbody tr:not(.template-row)' ], 
        		function(message, result) {
        	var result1 = result.eq(0);
        	t.equal(result1.find(".nome").text(), "COMUTACAO 1",'check edit list result');
        	t.equal(result1.find(".data").text(), "03/07/2013 08:00",'check edit list result');
        	t.equal(result1.find(".canal-principal").text(), "Canal 1 HD",'check edit list result');
        	t.equal(result1.find(".canal-comutacao").text(), "Alternativo 1",'check edit list result');
        	var afiliadas1 = $.map(result1.find(".afiliadas ul li"), function(mapElement){
        		return $(mapElement).text().trim()
        	}).join(",");

        	t.equal(afiliadas1, "EPTV CAMPINAS",'check edit list result');

        	var result2 = result.eq(1);
        	t.equal(result2.find(".nome").text(), "Comutacao teste auto 2",'check edit list result');
        	t.equal(result2.find(".data").text(), "13/12/2013 21:23",'check edit list result');
        	t.equal(result2.find(".canal-principal").text(), "Canal 2 HD",'check edit list result');
        	t.equal(result2.find(".canal-comutacao").text(), "Alternativo 1",'check edit list result');
        	var afiliadas2 = $.map(result2.find(".afiliadas ul li"), function(mapElement){
        		return $(mapElement).text().trim()
        	}).join(",");

        	t.equal(afiliadas2, "TV ANHANGUERA DE ARAGUAÍNA,TV ANHANGUERA GURUPI,TV ANHANGUERA PALMAS,INTER TV DOS VALES,EPTV CAMPINAS",'check edit list result');
        	
        });
        
        page.step('remove comutacao',[ '#tblComutacoesCadastradas tbody tr:not(.template-row)' ], function(result){
        	page.click(result.eq(1).find(".delete"));
        });
        
        page.step('confirm remove',["#btnRealizarExclusao"],function(confirmDeleteBtn){
        	page.click(confirmDeleteBtn);
        });
        
        page.step('check remove list result', [".message[data-last-message=sucesso-apagar-comutacao]",  '#tblComutacoesCadastradas tbody tr:not(.template-row)' ],
        		function(message, result) {
        	t.equal(result.length, 1,'check remove list result');
        	
        	var result1 = result.eq(0);
        	var result1 = result.eq(0);
        	t.equal(result1.find(".nome").text(), "COMUTACAO 1",'check remove list result');
        	t.equal(result1.find(".data").text(), "03/07/2013 08:00",'check remove list result');
        	t.equal(result1.find(".canal-principal").text(), "Canal 1 HD",'check remove list result');
        	t.equal(result1.find(".canal-comutacao").text(), "Alternativo 1",'check remove list result');
        	var afiliadas1 = $.map(result1.find(".afiliadas ul li"), function(mapElement){
        		return $(mapElement).text().trim()
        	}).join(",");

        	t.equal(afiliadas1, "EPTV CAMPINAS",'check remove list result');

        });

//        page.step('confirm edit', [], function() {
//        	page.stop();
//        });

        
    });
    
})(QUnit);