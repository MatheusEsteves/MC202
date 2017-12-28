<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<link rel="icon" type="image/png" href="<%=request.getContextPath()%>/images/favicon-gsat.png" />
		<title>Globosat :: Sistema de Distribui&ccedil;&atilde;o</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<!-- CSS LIBS -->
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/navigation/jquery.navigation.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/loading/jquery.loading.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/dialog/jquery.dialog.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/forms/jquery.forms.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/third/tooltip.tipsy/jquery.tipsy.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/holy/message/jquery.message.css" />

		<!-- SIDI theme -->
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/theme/sidi.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/jquery-ui-1.8.17.custom.css" />
		<link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/css/custom.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/style.css"></link>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-ui-1.8.19.custom.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-corner.js"></script>
		<!-- i18n -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.sidi.utils.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/services.js"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/web/i18n.js"></script>

		<!-- HOLY -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.holycomponents.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.loadtext.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/trimpath.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.holyavenger.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/lib/jquery.holyavenger.trimpath.js"></script>

		<!-- JS LIBS -->
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/navigation/jquery.navigation.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/loading/jquery.loading.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/dialog/jquery.dialog.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/forms/jquery.forms.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/third/tooltip.tipsy/jquery.tipsy.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/third/jquery.meio.mask.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/holy/message/jquery.message.js"></script>
	</head>
	<body>
		<div id="wrapper">
			<div id="content">
				<div id="login">
					<form action="<%=request.getContextPath()%>/j_security_check" method="post" class="forms liquidForm" accept-charset="UTF-8">
						<fieldset>
						<div class="logo">
							<span class="logo-globosat">GLOBOSAT</span>
						</div>
							<ul>
								<li>
									<div id="errorMessage" style="display: none">					
										<span class="login-error">Login/Senha Inv&aacute;lidos</span>
									</div>
								</li>
								<li class="require">
									<label for="name">Login:</label>
									<input type="text"name="j_username" />
								</li>
								<li class="require">
									<label for="name">Senha:</label>
									<input type="password"name="j_password" />
								</li>
							</ul>
							<button type="submit" class="button">Entrar</button>
							<a href="javascript:void(0)" id="btnRecuperarSenha" class="">Recuperar senha</a>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<div id="popup" class="dialog">
		</div>

		<div id="footer">
		    Sistema de Distribui&ccedil;&atilde;o Globosat - <span class="versao-globosat"></span> - Desenvolvido pela Dextra Sistemas
		</div>
		<script type="text/javascript">
			$.sidi.getMessages().done(function(data){
				i18n.setMessages(data);
			})
			
			$('#login form').form();
			$.holy("<%=request.getContextPath()%>/versao.xml", {path: '<%=request.getContextPath()%>/'});
			
			console.log('path: ' + '<%=request.getContextPath()%>/');

			var error = <%= request.getParameter("error") %>;
	        if (error) {
		        $('#errorMessage').toggle();
	        }
	        
			$(document).ready(function() {
				$("#login fieldset").corner();
			});

			$('#btnRecuperarSenha').click(function(){
				$.holy("<%=request.getContextPath()%>/recuperar-senha.xml", {path: '<%=request.getContextPath()%>/'});
			});
	        
		</script>
	</body>
</html>