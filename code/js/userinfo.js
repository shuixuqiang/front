var userInfo = {
	init: function() {
		this.bindEle();
	},
	bindEle: function() {
		$('#submitUserInfo').bind("click", this.submitCheck);
	},
	submitCheck: function() {
	    var formNum = 3, formCount = 0;

		var $name = $('#userName'),
			$sex = $('#userSex'),
			$email = $('#userEmail'),
			$tel = $('#userTel');
		var emailVal = $email.val().trim();
		var check = /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(emailVal);

		$name.submitEmptyCheck({
			note: "请输入真实姓名",
			callback: function() {
			    formCount += 1;
			}
		});
		$tel.submitEmptyCheck({
			note: "请输入联系人电话",
            callback: function() {
                formCount += 1;
            }
		});
		$email.submitEmptyCheck({
			note: "请输入联系人邮箱",
			callback: function() {
				if (!check) {
					$email.siblings('.note.errTxt').remove();
					var note = $('<div class="note errTxt">您输入的邮箱格式不正确</div>');
					$email.parent().append(note);
					return false;
				} else {
                    formCount += 1;
				}
			}
		});
		if (formCount == formNum) {
        		$("#formUserInfo").submit();
		}
	}
}

$(function() {
	userInfo.init();
});