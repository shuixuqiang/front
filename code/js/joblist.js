var jobList = {
    init: function() {
        this.bindEle();
        this.toolbar();
    },
    bindEle: function() {

    },
    toolbar: function() {
        // 职位列表toolbar
        var $jobList = $("#jobList");
        var _mouseover = function() {
            $(this).find('.icon').addClass("hover");
        }
        var _mouseout = function() {
            $(this).find('.icon').removeClass("hover");
        }

        $jobList.find('.mod-job').each(function() {
            $this = $(this);

            // icon 高亮事件
            $this.find('.job-operate a:not(:first)').bind("mouseover", _mouseover).bind("mouseout", _mouseout);

            // 开启按钮事件
            var $switch = $this.find('.switch');
            if (!$switch.hasClass("off")) {
                $switch.html('<i class="icon"></i>开启');
                $switch.hover(function() {
                    $(this).html('<i class="icon"></i>关闭');
                }, function() {
                    $(this).html('<i class="icon"></i>开启');
                });
            } else {
                $switch.html('<i class="icon"></i>已关闭');
                $switch.hover(function() {
                    $(this).html('<i class="icon"></i>开启');
                }, function() {
                    $(this).html('<i class="icon"></i>已关闭');
                });
            }
        });


    }
}
$(function() {
    jobList.init();
})
