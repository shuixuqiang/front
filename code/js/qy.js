var qy_submit = {
	init: function() {
		this.bindEle();
		this.logoUp();
		$('#qyLogo-btn').click(function() {
			$('#qyLogo .note.errTxt').remove();
		});
	},
	bindEle: function() {
		$('#qySubmit').bind("click", this.submitCheck);
	},
	logoUp: function() {
		var uploader = WebUploader.create({
			// 选完文件后，是否自动上传。
			auto: true,
			// swf文件路径
			//			swf: 'http://127.0.0.1:8020' + '/js/plugin/Uploader.swf',
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
	submitCheck: function() {
		var $name = $('#qyName'),
			$overview = $('#qyOverview'),
			$tel = $('#qyTel'),
			$contact = $('#qyContact'),
			$email = $('#qyEmail'),
			$logo = $('#qyLogo-btn :file');
		var emailVal = $email.val().trim();
		var check = /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(emailVal);

		$name.submitEmptyCheck({
			note: "请输入企业名称"
		});
		$overview.submitEmptyCheck({
			note: "请输入企业简介"
		});
		$tel.submitEmptyCheck({
			note: "请输入联系人电话"
		});
		$contact.submitEmptyCheck({
			note: "请输入联系人姓名"
		});
		$email.submitEmptyCheck({
			note: "请输入联系人邮箱",
			callback: function() {
				if (!check) {
					var note = $('<div class="note errTxt">您输入的邮箱格式不正确</div>');
					$email.parent().append(note);
					return false;
				} else {
					$("#frm").submit();
				}
			}
		});
	}
}

$(function() {
	qy_submit.init();
});