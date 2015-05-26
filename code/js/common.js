(function($) {
	/* -----------------------------------------/
	 * 功能：提交为空校验
	 * 参数：
	 * 返回：
	 * 作者：ZHANGHAIBIN
	/ ---------------------------------------- */
	$.fn.submitEmptyCheck = function(options) {
		var settings = $.extend({
			'note': '该项为必填项', // 提示文本
			'target': null, // 文本插入目标位置
			'callback': null // 回调函数
		}, options);

		var $this = $(this);
		var val = $this.val().trim();
		var _note = '<div class="note errTxt">' + settings.note + '</div>';
		var $note = $this.siblings('.note.errTxt');

		if (!val) {
			// 删除错误提示
			if (settings.target !== null) {
				settings.target.find('.note.errTxt').remove();
			} else {
				$note.remove();
			}
			// 判断提示文本是否设置
			if (settings.note === null) {
				// 判断文本插入目标是否设置
				if (settings.target === null) {
					$(this).parent().append('<div class="note errTxt">该项为必填项</div>');
				} else {
					settings.target.append('<div class="note errTxt">该项为必填项</div>');
				}
			} else {
				// 判断文本插入目标是否设置
				if (settings.target === null) {
					$(this).parent().append(_note);
				} else {
					settings.target.append(_note);
				}
			}
			// 获取焦点时删除错误提示
			$this.bind("focus", function() {
				var $note = $this.siblings('.note.errTxt');
				if (settings.target !== null) {
					settings.target.find('.note.errTxt').remove();
				} else {
					$note.remove();
				}
			});
			return false;
		} else if (settings.callback !== null) {
			// 回调函数
			return settings.callback();
		}
	};

	/* -----------------------------------------/
	 * 功能：提交为空校验
	 * 参数：
	 * 返回：
	 * 作者：ZHANGHAIBIN
	/ ---------------------------------------- */
	$.fn.popupshow = function(options) {

		var settings = $.extend({
			'popupId': null, //弹出层id
			'node': null, //要插入的节点,可选
			'htmlUrl': null, //要载入的html,可选
			'maskId': null, //遮罩id,默认不显示
			'position': 'fixed', //定位类别,可选
			'closeCallback': null, //关闭回调,可选
            'callback': null // 弹出回调
		}, options);

		var $popup = $("#" + settings.popupId);
		var $node = settings.node;

		//弹出层显示
		if ($popup.length > 0) {
			$popup.show().attr("popmark", "popmark");
			_popupPsotion(settings.popupId, settings.position);
			//关闭弹层
			$("#" + settings.popupId + " .close").click(_close);
            if (settings.callback !== null) {
                settings.callback();
            }
		} else if (settings.node !== null) {
			$('body').append($node);
			if (settings.htmlUrl !== null) {
				$node.load(settings.htmlUrl, function() {
					_popupPsotion(settings.popupId, settings.position);
					//关闭弹层
					$("#" + settings.popupId + " .close").click(_close);

                    if (settings.callback !== null) {
                        settings.callback();
                    }
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
				scrollT = $win.scrollTop(),
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
	};

    /* -----------------------------------------/
     * 功能：范围控件
     * 参数：
     * 返回：
     * 作者：ZHANGHAIBIN
    / ---------------------------------------- */
    $.fn.range = function(options) {
        var settings = $.extend({
            'bar': '.range-bar',    // 进度条
            'ctrl': '.range-ctrl',  // 滑块
            'scale': null,          // 比率
            'def': null             // 默认比率
        }, options);

        var $this = $(this),
            $bar = $this.children(settings.bar),
            $ctrl = $this.children(settings.ctrl);

        // 如果默认值不为空
        if (settings.def !== null) {
            def(settings.def);
        }

        // 绑定滑块移动事件
        $ctrl.bind("mousedown", moveEvent);
        $this.bind("click", function(e){
            var gangeW = $this.width(),
                gangeL = $this.offset().left,
                percent = gangeW / 100;
            move(e, gangeW, gangeL, percent);
        });
        // 鼠标抬起后解绑鼠标移动事件
        $('body').bind("mouseup", function() {
            $(this).unbind("mousemove");
        });

        // 设置默认值
        function def(scale) {
            if (settings.scale !== null) {
                settings.scale.html(scale);
            }
            $bar.width(scale + "%");
            $ctrl.css({left: scale + "%"});
        }
        // 滑块移动事件
        function moveEvent() {
            var gangeW = $this.width(),
                gangeL = $this.offset().left,
                percent = gangeW / 100;

            $('body').bind("mousemove", function(e) {
                move(e, gangeW, gangeL, percent);
            });
        }
        // 滑块移动函数
        function move(e, width, left, percent) {
            var nowCtrlL = e.pageX - left;
            // 滑块移动范围
            if (nowCtrlL > -1 && nowCtrlL <= width) {
                var _ctrlL = Math.ceil(e.pageX - left);
                var _scale = Math.ceil(_ctrlL / percent);

                // 分数
                if (settings.scale !== null) {
                    settings.scale.html(_scale);
                }
                // 滑块和进度条样式
                $ctrl.css({left: _scale + "%"});
                $bar.width(_scale + "%");
            }
            stopSelect();
        }
        // 禁止选中内容
        function stopSelect() {
            if (window.getSelection) {
                window.getSelection().removeAllRanges(); //w3c
            } else if (document.selection) {
                document.selection.empty(); //IE
            }
        }
    };
    /* -----------------------------------------/
     * 功能：勾选功能
     * 参数：
     * 返回：选择的结果集合
     * 作者：TANGCIWEI
     / ---------------------------------------- */
    $.fn.tickSelect=function(){
        $this=$(this);
        var selIndex=0//返回选择结果索引
        var allLi=$this.find('li');
        var counts=allLi.size()//勾选个数
        allLi.on('click',function(){
            allLi.removeClass('active');
            $(this).toggleClass('active');
            selIndex=$(this).index();//当前元素的索引值
        })
        return selIndex;
    };
})(jQuery);

var COMMON = {
	init: function() {
		this.bindEle();
		this.filtersort();
	},
	bindEle: function() {

	},
	filtersort: function() {
		// 筛选选中效果
		var $fs = $('.filtersort');
		$fs.find('dl').each(function() {
			$(this).find('dd li a').bind("click", function() {
				$(this).parent("li").addClass("active").siblings().removeClass("active");
			});
		})
	},
	scaleChart: function(target, data) {
		var dataLen = 0,
			scoreLen = 0;
		for (prop in data) {
			dataLen++;
			if (data[prop].score) {
				scoreLen++;
			}
		}
		// 如果数据长度为0则返回
		if (!dataLen) return;

		var scaleChart = $('<ul>'),
			scoreChart = $('<ul class="score">');

		$.each(data, function(key, val) {
			var scale_li = $('<li>'),
				scale_bar = $('<div class="bar">');
			// 创建权重图表
			scale_bar.css({
				backgroundColor: val.color
			}).html(key);
			scale_li.css({
				width: val.scale + "%"
			}).append(scale_bar).appendTo(scaleChart);
			scale_bar.animate({
				width: "100%"
			}, 600);

			// 创建得分图表
			if (dataLen == scoreLen) {
				var score_li = $('<li>'),
					score_bar = $('<div class="bar">');
				score_bar.css({
					backgroundColor: val.color
				}).html(val.score + "分");

				score_li.css({
					width: val.scale + "%"
				}).append(score_bar).appendTo(scoreChart);
				score_bar.animate({
					width: val.score + "%"
				}, 600);
			}
		});

		// 插入权重图表
		target.html(scaleChart);
		// 插入得分图表
		if (scoreLen == dataLen) {
			target.append(scoreChart);
		}
	}
};

$(function() {
	COMMON.init();
})