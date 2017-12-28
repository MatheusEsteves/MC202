/*Copyright 2011/2012 Dextra Sistemas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/

(function($) {
	$.fn.message = function(msg, type, unclosable) {
		var ul = $(this);
		ul.prepend('<li />');
		var li = ul.children('li:first');
		li.hide();
		if(type) {
			li.addClass(type);
		}
		if(!unclosable) {
			li.addClass('closable');
		}
		li.text(msg);
		li.show();	
		setupCount(li);
	}
	var setupCount = function(li) {
		li.data('count', []);
		for (var i = 0; i <= 5; i++) {
			var countFunc = function() {
				var span = li.children('span.time');
				if(!span.length) {
					li.append('<span class="time"/>');
					span = li.children('span.time');
					span.hide();
					span.fadeIn('fast');
				}
				span.text(li.data('count').pop());
			}
			var text = (i) + 's';
			li.data('count').push(text), text;
			setTimeout(countFunc, (1000 * i) + 2000);			
		}
		var closeFunc = function() {
			$(li).fadeOut(function() {
				$(this).remove();
			});			
		}
		setTimeout(closeFunc, 8000);		
	}

	$('.message li').delegate('a', 'click', function() {
		$(this).parent('li').fadeOut();
	});
})(jQuery);
