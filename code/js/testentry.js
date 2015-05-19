var testentry = {
	init: function() {
		this.bindEle();
		this.chart();
	},
	bindEle: function() {
	},
	chart: function() {
        var $scaleChart = $('#scaleChart');
        COMMON.scaleChart($scaleChart, scaleObj);
	}
}

$(function() {
	testentry.init();
});