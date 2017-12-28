(function($) {

	var ModalInstance = function(deferred) {
		this.deferred = deferred;
	}
	ModalInstance.prototype.open = function(popSelector, opts) {
		this.popSelector = popSelector;
		
		$(this.popSelector).popDialog(opts);
	}
	
	ModalInstance.prototype.close = function() {
		$(this.popSelector).unpopDialog();
		this.deferred.resolve.apply(this, arguments);
	}
	
	ModalInstance.prototype.cancel = function() {
		$(this.popSelector).unpopDialog();
		this.deferred.reject();
	}
	
	var modal = {};
	
	modal.open = function(templateFunction, context){
		var deferred = $.Deferred();
		templateFunction(new ModalInstance(deferred),context)
		return deferred.promise();
	}

	if (!$.sidi) {
		$.sidi = {};
	}
	$.sidi.modal = modal;
})(jQuery);
