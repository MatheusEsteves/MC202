(function($) {
	$.fn.popDialog = function(opts){
		var defaultOpts = {
				overlay: '#23557E',
				alpha: '3'
			}
		opts = $.extend(opts, defaultOpts);
		$(this).xdialog(opts)
	}
	$.fn.unpopDialog = function(){
		$(this).xundialog()
	}
})(jQuery);
