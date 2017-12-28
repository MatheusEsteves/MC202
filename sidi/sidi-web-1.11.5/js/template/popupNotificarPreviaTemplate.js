(function($) {
	
	var popupNotificarPrevia = {};

	popupNotificarPrevia.notificar = function(modalInstance){
		openForm({}, modalInstance);
	};
	
	
	var openForm = function(context, modalInstance){
		$.holy("../templates/distribuicao/popup-notificar-previa.xml").done(function(document){
			
			$('.data').setMask();
			$('#txtDataInicialPopup.data').datepicker();
			$('#txtDataFinalPopup.data').datepicker();
						
			$(this).css('z-index',10);			
			var offset = $("#popup").offset().top;
			$('html, body').animate({
				scrollTop : offset
			}, 300);

			$('#frmNotificacaoPreview').form();
			$('#frmNotificacaoPreview [title]').tipsy({trigger: 'focus', gravity: 'w', fade: true});
			$('#lblTxtMensagem').width(168);
			$('#lblNotificacaoSMS').width(220);
			
			$('#lblTxtMensagemSMS').width(168);
			$('#txtMensagemSMS').width(400);
			$('#txtMensagemSMS').height(80);
			
			$("#popup").xdialog({
				overlay: '#23557E',
				alpha: '3',
				width: 650
			});

			$('.maxlength').each(function() {
				$(this).charCount({
					allowed: parseInt($(this).attr('maxlength') || 20),
					warning: 1,
					counterText: 'Caracteres restantes: '
				});
	        });

			var callback = function(dataInicial, dataFinal, mensagem, assunto, enviarSMS, mensagemSMS){
				
				$.postJSON("../sidi/eventos/enviarNotificacaoPreview", [dataInicial, dataFinal, mensagem, assunto, enviarSMS, mensagemSMS], function(resultado) {
					$(window).scrollTop(0);
					$('.message').message(i18n.get('notificacao-sucesso'), 'success', true);
					$('#btnFiltrar').click();
				});
			};

			$('#btnEnviarNotificacao').click(function() {

				var mensagem = $("#txtMensagem").val();
				var assunto = $("#txtAssunto").val();
				var dataInicial = $('#txtDataInicialPopup.data').val();
				var dataFinal = $('#txtDataFinalPopup.data').val();
				var enviarSMS = $("#enviarSMS").is(":checked");
				var mensagemSMS = $("#txtMensagemSMS").val();

				if (mensagem && dataInicial && dataFinal && assunto) {
					
					if (enviarSMS) {
						if (mensagemSMS == "")
							$('#popup .message').message(i18n.get('campos-obrigatorios'), 'error', true);
						else {						
							callback(dataInicial, dataFinal, mensagem, assunto, enviarSMS, mensagemSMS);
							$("#popup").xundialog();						
						}
					}
					else {
						callback(dataInicial, dataFinal, mensagem, assunto, enviarSMS, mensagemSMS);
						$("#popup").xundialog();
					}
				} else {
					$('#popup .message').message(i18n.get('campos-obrigatorios'), 'error', true);
				}
			});
		});				
	}	
	
	if(!$.sidi){
		$.sidi = {};
	}
	if(!$.sidi.templates){
		$.sidi.templates = {};
	}
	
	$.sidi.templates.notificacaoPreview = popupNotificarPrevia;
})(jQuery);
