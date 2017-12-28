(function($) {
	if(!$.sidi){
		$.sidi = {};
	}
	
	var getMsgTarget = function(selector){
		return selector != null ? $(selector) : $('.message');
	};
	
	var showMessage = function(msg, type, unclosabe, targetSelector){
		getMsgTarget(targetSelector).message(i18n.get(msg), type, true);
	};
	
	var messages = {
			success : function(msg, targetSelector){
				showMessage(msg, 'success', true,targetSelector);
			},
			error : function(msg,targetSelector){
				showMessage(msg, 'error', true, targetSelector);
			},
			clean : function(targetSelector){
				getMsgTarget(targetSelector).html('');
			}
	}
	$.sidi.messages = messages;
	
})(jQuery);
