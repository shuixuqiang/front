var role = {
	init: function() {
		this.bindEle();
	},
	bindEle: function() {
	    $('#roleSelect>label').bind("click", this.roleSelect);
	    $('#submitRole').bind("click", this.submitData);
	},
    roleSelect: function() {
        var $this = $(this),
            $radio = $this.children(':radio');
        // 选中效果
        if ($radio.prop("checked")) {
            $this.addClass("active").siblings().removeClass("active");
        }
    },
    submitData: function() {
        var $learner = $('#learner'),
            $company = $('#company');
        if ($learner.prop("checked") || $company.prop("checked")) {
            $('#formRole').submit();
        } else {
            alert("请选择角色！");
        }
    }
}

$(function() {
	role.init();
});