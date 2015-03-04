/**
  * drone.io autoscroll
  * @author misak113
  */
(function ($) {
	var cookieKey = 'drone-io_autoscroll_checkbox';
	var labelId = 'drone-io_autoscroll_label';
	var checkboxId = 'drone-io_autoscroll_checkbox';
	var checkboxElement = $('<label id="' + labelId + '" style="position: fixed; bottom: 10px; left: 10px; display: block; border: 1px solid grey; padding: 3px 11px; border-radius: 4px; background-color: lightgrey;">'
		+ '<input type="checkbox" id="' + checkboxId + '" style="display: inline-block; margin-top: -1px;"> '
		+ '<img src="' + chrome.extension.getURL('icon.png') + '" style="display: inline-block; margin-right: 2px;">'
		+ '<span style="font-weight: bold; font-size: 15px;">autoscroll</span></label>');
	var buildPatern = /^https:\/\/drone\.io\/[^\/]+\/[^\/]+\/[^\/]+\/\d+$/;
	var height = $(document).height();
	var changeHeightInterval;

	function isHeightChanged() {
		var isChanged = $(document).height() != height;
		height = $(document).height();
		return isChanged;
	}

	function setCookie(value) {
		document.cookie = cookieKey + "=" + parseInt("" + (value + 0));
	}

	function isCookie() {
		return document.cookie.indexOf(cookieKey + "=1") !== -1;
	}

	function handleScrolling() {
		if(isHeightChanged()) {
			$(document).scrollTop($(document).height());
		}
	};

	function bindAutoscroll() {
		setCookie(true);
		changeHeightInterval = setInterval(handleScrolling, 200);
	}

	function unbindAutoscroll() {
		setCookie(false);
		clearInterval(changeHeightInterval);
	}

	function checkScrolling() {
		var label = $('#' + labelId);
		var autoscroll = $('#' + checkboxId).is(':checked');
		if (autoscroll) {
			label.css('background-color', '#dff0d8');
			label.css('border-color', '#d6e9c6');
			bindAutoscroll();
		} else {
			label.css('background-color', '#f4f4f4');
			label.css('border-color', '#dee3e6');
			unbindAutoscroll();
		}
	}

	function addCheckbox() {
		$('body').append(checkboxElement);
		var checkbox = $('#' + checkboxId);
		checkbox.change(function(e) {
			checkScrolling();
		});
	}

	if (buildPatern.test(window.location.href)) {
		addCheckbox();
		var checkbox = $('#' + checkboxId);
		checkbox.prop("checked", isCookie());
		checkScrolling();
	}
})(jQuery);
