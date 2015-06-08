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
		var telVal = $tel.val().trim();
		var checkEmail = /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(emailVal);
		var checkPhone = /^\d+\d{10}/.test(telVal);

		$name.submitEmptyCheck({
			note: "请输入真实姓名",
			callback: function() {
			    formCount += 1;
			}
		});
		$tel.submitEmptyCheck({
			note: "请输入联系人手机",
            callback: function() {
                if (!checkPhone) {
                    $tel.siblings('.note.errTxt').remove();
                    var note = $('<div class="note errTxt">您输入的手机号不正确</div>');
                    $tel.parent().append(note);
                    return false;
                } else {
                    formCount += 1;
                }
            }
		});
		$email.submitEmptyCheck({
			note: "请输入联系人邮箱",
			callback: function() {
				if (!checkEmail) {
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