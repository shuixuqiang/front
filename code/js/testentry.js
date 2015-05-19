
// 模拟数据
var scaleObj = {
    "HTML5": {
        "scale": 50,
        "color": "#dc4d10",
        "score": 76
    },
    "CSS": {
        "scale": 20,
        "color": "#3799d6",
        "score": 90
    },
    "JavaScript": {
        "scale": 30,
        "color": "#d32024",
        "score": 60
    }
};

var testentry = {
	init: function() {
		this.bindEle();
		this.chart();
	},
	bindEle: function() {
	},
	chart: function() {
        var $scaleChart = $('#scaleChart');
        $.ajax({
            url: "",
            type: "GET",
            dataType: "json",
            success: function(res) {
                var scale_a = new COMMON.scaleChart($scaleChart, res);
            }
        })
	}
}

$(function() {
	testentry.init();
});