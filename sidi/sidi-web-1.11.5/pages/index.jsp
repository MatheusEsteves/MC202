<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<!-- CSS LIBS -->
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/navigation/jquery.navigation.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/loading/jquery.loading.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/dialog/jquery.dialog.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/forms/jquery.forms.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/third/tooltip.tipsy/jquery.tipsy.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/message/jquery.message.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/datatable/jquery.datatable.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/forms/jquery.form.css" />

		<!-- SIDI theme -->
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/jquery-ui-1.8.17.custom.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/reset.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/jquery.dataTables.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/dataTables.fixedColumns.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/chosen.css"></link>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/style.css"></link>		
		
		<link rel="icon" type="image/png" href="<%=request.getContextPath()%>/images/favicon-gsat.png"></link>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/jquery.jscrollpane.css" type="text/css" media="all"></link>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/jquery.ui.resizable.css" type="text/css"></link>
		<title>Globosat :: Sistema de Distribui&ccedil;&atilde;o</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
	</head>
	<body>
		<div id="header">
		</div>
		
		<div id="wrapper">
			<div class="content" id="main">
				<div id="content-navigation"></div>
				<ul class="message"></ul>
				<div id="content-info"></div>
				<div id="content-details"></div>
			</div>
		</div>

		<div id="popup" class="dialog">
		</div>

		<script type="text/javascript" src="<%=request.getContextPath()%>/js/moment.min.js"></script>
		
		<!-- jQuery -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-ui-1.8.19.custom.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.ui.datepicker-pt-BR.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-corner.js"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/modules/underscore-min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/modules/backbone-min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/modules/require.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/modules/jquery.dataTables.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/modules/dataTables.fixedColumns.js"></script>
		<script type="text/javascript">
		requirejs.config({
		    baseUrl: '<%=request.getContextPath()%>/js',
		});
		</script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/functions.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.sidi.utils.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.sidi.messages.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/modal.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/services.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/templateUtils.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/popupMessageTemplate.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/canalTemplate.js"></script>		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/eventoTemplate.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/mosaicoTemplate.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/jogoTemplate.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/popupNotificarPreviaTemplate.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/template/tabularTemplate.js"></script>
		
		<!-- i18n -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/web/i18n.js"></script>
		
		<!-- seguranca -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/web/sidi.js"></script>

		<!-- HOLY -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.holycomponents.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.ba-hashchange.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.loadtext.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/trimpath.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.holyavenger.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.holyavenger.trimpath.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.form.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.meio.mask.js"></script>

		<!-- JS LIBS -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/navigation/jquery.navigation.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/loading/jquery.loading.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/dialog/jquery.dialog.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/forms/jquery.forms.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/third/tooltip.tipsy/jquery.tipsy.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/third/jquery.meio.mask.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/message/jquery.message.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/datatable/jquery.datatable.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/sendformbyframe/jquery.sendformbyframe.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/json2.js"></script>

		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.ui.mouse.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/chosen.jquery.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.mousewheel.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.jscrollpane.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/distribuicao-operadora.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/nova-distribuicao-operadora.js"></script>


		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.cookie.js"></script>

		<!-- SIDI Scripts -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/web/distribuicao/distribuicao.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/web/operadora/consultar-distribuicao.js"></script> 
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/web/pagination.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/prefixfree.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/respond.min.js"></script>

				
		<script>
			var messagesRequest = $.sidi.getMessages().done(function(data){
				i18n.setMessages(data);
			});
			
			var funcRequest = $.sidi.usuario.buscarFuncionalidades().done(function(data){
				sidi.setFuncionalidades(data);
			});
			
			$.sidi.usuario.getPerfilUsuarioLogado().done(function(data){
				sidi.setPerfil(data);
			});
			
			$(document).keydown(function(e) {
				var popup=$('.dialog');
				if (e.keyCode == 27 && popup) {
					popup.xundialog();
					return false;
			    }
			});
		
			$.when(messagesRequest, funcRequest).done(function() {
				requirejs(['modules/menu'],function(menu) {
					menu.loading();
					if (sidi.possuiAutorizacao('CONSULTAR_DISTRIBUICAO')) {
						menu.defaultHash = 'distribuicao/liberacao/principal';
					} else if (sidi.possuiAutorizacao('CONSULTAR_DISTRIBUICAO_OPERADORA')) {
						menu.defaultHash = 'operadora/consultar/distribuicao';
					} else {
						menu.defaultHash = '';
					}
					
					$(window).hashchange(function() {
						var found = false;
						$.each(menu.mapping, function(pat, func) {
							var ret = new RegExp(pat).exec(location.hash);
							if (ret) {
								func(ret);
								found = true;
								return false;
							}
						});
						if (!found && menu['defaultHash']) {
							location.hash = menu['defaultHash'];
						}
					});
					$(window).hashchange();
					$.holy("../templates/ping.xml");
					$.holy("../templates/menu.xml");
				});
			});

			$('.ttip').tipsy();

			window.onresize = function(e) {
				// No IE, quando a janela eh redimensionada, e === undefined
				if (!e || e.target == window) {
					distribuicaoOperadoraTemplate.ajustDinamicTable();
				}
			}

		</script>
	</body>
</html>
