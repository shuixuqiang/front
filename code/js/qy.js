var qy_submit = {
	init: function() {
		this.bindEle();
		this.logoUp();
		this.layDate();
		$('#qyLogo-btn').click(function() {
			$('#qyLogo .note.errTxt').remove();
		});
		this.companyIdUp();
	},
	bindEle: function() {
		$('#qySubmit').bind("click", this.submitCheck);
	},
	layDate: function() {
	    laydate({
	        elem: '#regTime',
	        event: 'focus',
	        max: nowTime
	    })
	},
	logoUp: function() {
		var uploader = WebUploader.create({
			// 选完文件后，是否自动上传。
			auto: true,
			// swf文件路径
			swf: '/js/plugin/Uploader.swf',
			// 文件接收服务端。
			server: '/company/ajaxUpload',
			pick: '#qyLogo-btn',
			// 只允许选择图片文件。
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			}
		});
		var thumbnailWidth = 1,
			thumbnailHeight = 1;

		// 当有文件添加进来的时候
		uploader.on('fileQueued', function(file) {
			// 创建缩略图
			uploader.makeThumb(file, function(error, src) {
				if (error) {
					$("#qyLogo").append('<div class="note errTxt">不能预览</div>');
					return;
				}
				$("#qyLogo img").attr('src', src);

			}, thumbnailWidth, thumbnailHeight);
		});

		// 文件上传成功
		uploader.on('uploadSuccess', function(file, response) {
		    $('#qyLogo-btn').find('input[name="imgurl"]').remove();
			$('<input type="hidden" name="imgurl" value="' + response.result.url + '" />').appendTo("#qyLogo-btn");
		});

		// 文件上传失败，显示上传出错。
		uploader.on('uploadError', function(file) {
			$error = $("#qyLogo .note.errTxt");
			// 避免重复创建
			if (!$error.length) {
				$error = $('<div class="note errTxt"></div>').appendTo('#qyLogo');
			}
			$error.text('上传失败,请重试');
		});
	},
	companyIdUp: function() {
        $('#companyIdPic').change(function() {
            var val = $(this)[0].files[0].name;
            $(this).parent().next('.note.static.successColor').remove();
            $(this).parent().after('<span class="note static successColor" style="margin-right: 10px">文件名：' + val + '</span>');
        })
	},
	submitCheck: function() {
	    var formNum = 9, formCount = 0;

		var $name = $('#qyName'),
			$overview = $('#qyOverview'),
			$tel = $('#qyTel'),
			$contact = $('#qyContact'),
			$email = $('#qyEmail'),
			$logo = $('#qyLogo'),
			$companyName = $('#companyName'),
			$regTime = $('#regTime'),
			$id = $('#companyIdPic');
	    var emailVal = $email.val().trim();
        var telVal = $tel.val().trim();
        var checkEmail = /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(emailVal);
        var checkPhone = /^\d+\d{10}/.test(telVal);

		$name.submitEmptyCheck({
			note: "请输入企业名称",
			callback: function() {
                formCount += 1;
			}
		});
		$overview.submitEmptyCheck({
			note: "请输入企业简介",
            callback: function() {
                formCount += 1;
            }
		});
		var logourl = $logo.find('input[name="imgurl"]').val();
        if (!logourl) {
            $logo.find('.note.errTxt').remove();
            $logo.append('<div class="note errTxt">请上传企业LOGO</div>')
        } else {
            formCount += 1;
        }
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
        $contact.submitEmptyCheck({
            note: "请输入联系人",
            callback: function() {
                formCount += 1;
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
        $companyName.submitEmptyCheck({
            note: "请输入企业注册名称",
            callback: function() {
                formCount += 1;
            }
        });
        $regTime.submitEmptyCheck({
            note: "请输入企业注册时间",
            callback: function() {
                formCount += 1;
            }
        });
        var idTarget = $id.parents('.item-cont');
        $id.submitEmptyCheck({
            note: "请上传营业执照扫描件",
            target: idTarget,
            callback: function() {
                formCount += 1;
            }
        });
        if (formCount == formNum) {
            $('#frm').submit();
        }
	}
}

$(function() {
	qy_submit.init();
});
