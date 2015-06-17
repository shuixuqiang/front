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
	 * 功能：弹出层
	 * 参数：
	 * 返回：
	 * 作者：ZHANGHAIBIN
	/ ---------------------------------------- */

    $.fn.popupshow = function(options) {
        var settings = $.extend({
            'popupId': null, // 弹出层id
            'htmlUrl': null, // 要插入的HTML的URL, 如果弹层隐藏在页面中, 则不用设置
            'maskId': 'mask', // 遮罩id,null不显示遮罩
            'position': 'fixed', // 定位类别(参数fixed和absolute)
            'zindex': null, // z-index值
            'countdown': null,   // 倒计时关闭(正整数,以秒为单位)
            'timer': null,   // 倒计时输出位置
            'jump': null,    // 关闭时跳转URL
            'callback': null, // 弹出调用函数
            'closeCallback': null // 关闭回调
        }, options);

            // 如果popupId不存在, 则返回
            if (!settings.popupId) return false;
        // 重命名参数名称
        var _popupId = settings.popupId,
            _url = settings.htmlUrl,
            _maskId = settings.maskId,
            _position = settings.position,
            _zindex = settings.zindex,
            _countdown = settings.countdown,
            _timer = settings.timer,
            _jump = settings.jump;

        var $popup = $("#" + _popupId);
        // 倒计时节点
        var $countdown = $('<div class="countdownTxt">');

        //弹出层显示
        if ($popup.length > 0) {
            // 如果弹层已弹出, 则返回
            if ($popup.is(':visible')) return;
            // 关闭已弹出弹层
            closeActive();
            // 给页面自有弹层添加属性
            $popup.attr({popup: "show", popmark: "own"}).show();
            // 设置zIndex值
            if (_zindex !== null) {
                $popup.css({zIndex: _zindex});
            }
            // 弹层定位
            popupPsotion(_popupId, _position);
            //判断是否启用遮罩
            if (_maskId !== null) mask();
            //关闭弹层
            $("#" + _popupId + " .close").bind('click', function() {
                close($(this));
                $("#" + _maskId).hide();
            });
            // 弹出回调
            if (settings.callback !== null) settings.callback();
            // 倒计时关闭
            if (_countdown !== null) {
                // 参数类型判断
                if (typeof _countdown == 'number' && _countdown > 0) {
                    countdown(_countdown, _timer, _jump);
                } else {
                    throw new TypeError();
                }
            }
        } else if (_url !== null) {
            $.ajax({
                type: "GET",
                url: _url,
                success: function(res) {
                    // 如果弹层已弹出, 则返回
                    if ($('body').find("#" + _popupId).length) return;
                    // 关闭已弹出弹层
                    closeActive();
                    // 插入弹层
                    $('body').append(res);
                    //判断是否启用遮罩
                    if (_maskId !== null) mask();

                    var $popup = $("#" + _popupId);
                    // 添加属性
                    $popup.attr("popup", "show");
                    // 设置zIndex值
                    if (_zindex !== null) {
                        $popup.css({zIndex: _zindex});
                    }
                    // 弹层定位
                    popupPsotion(_popupId, _position);
                    //关闭弹层
                    $("#" + _popupId + " .close").bind('click', function() {
                        close($(this));
                        $("#" + _maskId).hide();
                    });
                    // 弹出回调
                    if (settings.callback !== null) settings.callback();
                    // 倒计时关闭
                    if (_countdown !== null) {
                        // 参数类型判断
                        if (typeof _countdown == 'number' && _countdown > 0) {
                            countdown(_countdown, _timer, _jump);
                        } else {
                            throw new TypeError();
                        }
                    }
                }
            });
        } else {
            return false;
        }

        //遮罩
        function mask() {
            var $mask = $("#" + _maskId);
            if ($mask.length > 0) {
                if ($mask.is(":visible")) return;
                $mask.show();
            } else {
                var maskNode = $("<div class='mask' id='" + _maskId + "'>");
                $('body').append(maskNode);
            }
        }
        // 关闭已弹出弹层
        function closeActive() {
            $('body').find('[popup="show"]').attr("popup","hide").find('.close').click();
        }
        // 倒计时关闭
        function countdown(time, node, url) {
            // 参数说明:
            // 1. time是设定的倒计时时间;
            // 2. node是自定义显示倒计时的位置;
            // 3. url是倒计时结束时跳转的url

            var _time = Math.ceil(time) - 1;
            var _popup = $("#" + _popupId);
            if (_time <= 0) return;
            // 如果自定义了时间显示节点名, 则在指定位置显示倒计时
            if (node !== null) {
                _popup.find(node).text(_time + "秒");
            } else {
                _popup.find("." + $countdown[0].className).remove();
                _popup.children('.wrap').append($countdown).find($countdown).text(_time + "秒");
            }
            // 清除倒计时
            window.clearTimeout(this._t);
            this._t = window.setTimeout(function() {
                _time--;
                if (_time > 0) {
                    // 如果自定义了时间显示节点名, 则在指定位置显示倒计时
                    if (node !== null) {
                        _popup.find(node).text(_time + "秒");
                    } else {
                        _popup.children('.wrap').append($countdown).find($countdown).text(_time + "秒");
                    }
                   return countdown(time - 1, node, url);
                } else {
                    $("#" + _popupId + " .close").click();
                    if (url !== null) {
                        document.location = url;
                        window.clearTimeout(this._t);
                    }
                }
            }, 1000);
        }
        //关闭按钮
        function close(obj) {
            // 清除倒计时
            window.clearTimeout(this._t);
            // 关闭回调
            if (settings.closeCallback !== null) settings.closeCallback();
            if (_jump !== null) {
                document.location = _jump;
            }
            var _popup = obj.parents("#" + _popupId);
            var _mark = _popup.attr("popmark");
            // 设置弹层属性
            _popup.attr("popup", "hide");
            // 如果popmark属性为own则隐藏，否则删除
            if (_mark == "own") {
                _popup.hide();
            } else {
                _popup.remove();
            }
//          $("#" + _maskId).hide();
        }
        //弹层定位
        function popupPsotion(popupId, position) {
            var $popup = $("#" + popupId),
                $win = $(window),
                winW = $win.width(),
                winH = $win.height(),
                popupW = $popup.width(),
                popupH = $popup.height(),
                scrollT = $win.scrollTop(),
                scrollL = $win.scrollLeft();
            if (popupH > winH) {
                // 如果弹层高度大于视窗高度, popupTop为滚动条Top值
                var popupTop = scrollT,
                    popupLeft = (winW - popupW) / 2 + scrollL;

                $popup.css({
                    position: "absolute",
                    top: popupTop,
                    left: popupLeft,
                    margin: 0
                });
            } else if (position == "fixed") {
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
        // 窗口调整是重新定位
        $(window).resize(function() {
            popupPsotion(_popupId, _position);
        });
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
            if (nowCtrlL > 0 && nowCtrlL <= width) {
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
        allLi.on('click',function(){
            allLi.removeClass('active');
            $(this).addClass('active');
            selIndex=$(this).index();//当前元素的索引值
        })
        return selIndex;
    };
})(jQuery);

var COMMON = {
	init: function() {
		this.bindEle();
		this.filtersort();
		this.titleTips('a[title]');
		this.addTitle($('.job-company>span'));
		this.titleTips('.job-company>span');
		this.addTitle($('.job-location>span'));
		this.titleTips('.job-location>span');
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
			if (data[prop].score !== undefined) {
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
			}).html(val.name);
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

                if (val.score > 0) {
                    score_bar.css({
                        backgroundColor: val.color
                    }).html(val.score + "分");

                    score_li.css({
                        width: val.scale + "%"
                    }).append(score_bar).appendTo(scoreChart);

                    score_bar.animate({
                        width: val.score + "%"
                    }, 600);
                } else {
                    score_bar.css({
                        backgroundColor: '#ddd'
                    }).html(val.score + "分");

                    score_li.css({
                        width: val.scale + "%"
                    }).append(score_bar).appendTo(scoreChart);

                    score_bar.animate({
                        width: 100 + "%"
                    }, 600);
                }

			}
		});

		// 插入权重图表
		target.html(scaleChart);
		// 插入得分图表
		if (scoreLen == dataLen) {
			target.append(scoreChart);
		}
	},
    addTitle: function(obj) {
        obj.each(function() {
            $(this).hover(function() {
                if (!($(this).attr("title"))) {
                    var text = $(this).text();
                    $(this).attr("title", text);
                }
            })
        })
    },
	titleTips: function(obj) {
	    $('body').delegate(obj, "mouseover", function(e) {
            var $this = $(this);
            var title = $this.attr("title");
            var thisH = $this.height();
            var thisT = $this.offset().top;
            var thisL = $this.offset().left;
            var node = $('<div class="title-tips" id="titleTips">');
            var temp;
            if (title) {
                $('#titleTips').remove();
                temp = title;
                $this.removeAttr('title');
                node.text(temp).appendTo('body').fadeIn(300);
                node.css({top: thisT + thisH, left: e.pageX, zIndex: 900});
                var nodeW = node.outerWidth();
                var regNum = /[0-9]+/;
                var nodeMaxW = Number(regNum.exec(node.css("max-width"))[0]);
                if (nodeW >= nodeMaxW) {
                    node.addClass("break");
                }
                if ($("#mask")) {
                    var mask_zIndex = $("#mask").css("z-index");
                    node.css("z-index", mask_zIndex * 2);
                }
            }
            $this.unbind("mouseout").bind("mouseout", function() {
                $('#titleTips').remove();
                $this.attr("title", temp);
            });
	    });
	}
};

$(function() {
	COMMON.init();
})
