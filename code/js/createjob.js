var createJob = {
	init: function() {
		this.bindEle();
	},
	bindEle: function() {
		$('#jobSubmit').bind("click", this.submitCheck);
	},
	submitCheck: function() {
		var $name = $('#jobName'),
			$laborage = $('#laborage'),
			$location = $('#location');

		$name.submitEmptyCheck({
			note: "请输入职位名称"
		});
		$laborage.submitEmptyCheck({
			note: "请输入职位工资"
		});
		$location.submitEmptyCheck({
			note: "请输入工作地点",
			callback: function() {
				$('#formJob').submit();
			}
		});
	}
}

$(function() {
	createJob.init();
});