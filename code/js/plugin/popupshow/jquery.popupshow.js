/* -----------------------------------------/
 * 功能：弹出层显示及居中显示
 * 参数：
 * 返回：
 * 作者：ZHANGHAIBIN
/ ---------------------------------------- */

(function($) {
	$.fn.popupshow = function(options) {

		var settings = $.extend({
			'popupId': null, //弹出层id
			'node': null, //要插入的节点,可选
			'htmlUrl': null, //要载入的html,可选
			'maskId': null, //遮罩id,默认不显示
			'position': 'fixed', //定位类别,可选
			'closeCallback': null //关闭回调,可选
		}, options);

		var $popup = $("#" + settings.popupId);
		var $node = settings.node;

		//弹出层显示
		if ($popup.length > 0) {
			$popup.show().attr("popmark", "popmark");
			_popupPsotion(settings.popupId, settings.position);
			//关闭弹层
			$("#" + settings.popupId + " .close").click(_close);

		} else if (settings.node !== null) {
			$('body').append($node);
			if (settings.htmlUrl !== null) {
				$node.load(settings.htmlUrl, function() {
					_popupPsotion(settings.popupId, settings.position);
					//关闭弹层
					$("#" + settings.popupId + " .close").click(_close);
				});
			}
		} else {
			return false;
		}

		//判断是否启用遮罩
		if (settings.maskId !== null) {
			var $mask = $("#" + settings.maskId);
			if ($mask.length > 0) {
				$mask.show();
			} else {
				var maskNode = $("<div class='mask' id='" + settings.maskId + "'>");
				$('body').append(maskNode);
			}
		}

		//关闭弹层
		function _close() {
			if (settings.closeCallback !== null) {
                settings.closeCallback();
			} else {
				var _popup = $(this).parents("#" + settings.popupId);
				var _mark = _popup.attr("popmark");

				if (_mark == "popmark") {
					_popup.hide();
				} else {
					_popup.remove();
				}
				$("#mask").hide();
			}
		}

		//弹层定位
		function _popupPsotion(popupId, position) {
			var $popup = $("#" + popupId),
				$win = $(window),
				winW = $win.width(),
				winH = $win.height(),
				popupW = $popup.width(),
				popupH = $popup.height(),
				scrollT = $win.scrollTop();
                scrollL = $win.scrollLeft();

			if (position == "fixed") {
				var popupTop = (winH - popupH) / 2,
					popupLeft = (winW - popupW) / 2;

				$popup.css({
					position: "fixed",
					top: popupTop,
					left: popupLeft,
					margin: 0
				});
			} else if (position == "absolute") {
				var popupTop = (winH - popupH) / 2 + scrollT,
					popupLeft = (winW - popupW) / 2 + scrollL;

				$popup.css({
					position: "absolute",
					top: popupTop,
					left: popupLeft,
					margin: 0
				});
			}
		}
		$(window).resize(function() {
			_popupPsotion(settings.popupId, settings.position);
		})
	}
})(jQuery);
