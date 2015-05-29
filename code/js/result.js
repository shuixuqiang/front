var result = {
	init: function() {
		this.bindEle();
		this.chart();
	},
	bindEle: function() {},
	chart: function() {
		var $scaleChart = $('#scaleChart');
		COMMON.scaleChart($scaleChart, scaleObj);
	},
    popPage:function(btn){
        btn.on('click',function(){
            $(this).popupshow({
                popupId: "pop-nomaster",
                htmlUrl: "nomaster.html",
                maskId: "mask",
                callback: function () {
                    $('.tickUnit').each(function(i,elem){
                        $(elem).tickSelect();
                    });
                }
            });
        });
    }
}

$(function() {
	result.init();
	result.popPage($('.desc a'));
});