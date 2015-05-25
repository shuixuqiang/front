var editor = new Simditor({
	textarea: $('#editor'),
	placeholder: '这里输入职位描述(最多1500字符)',
	upload: false,
	tabIndent: true,
	toolbarFloat: false,
	toolbarFloatOffset: 0,
	toolbarHidden: false,
	pasteImage: false,
	toolbar: [
		'bold',
		'italic',
		'underline',
		'color',
		'ol',
		'ul',
		'hr',
		'indent',
		'outdent'
	]
});
var createJob = {
	init: function() {
		this.bindEle();

        //var $scale = $('.power-import-scale');
        //$('.mod-range').range({
        //    scale: $scale
        //});
	},
	bindEle: function() {
		$('#jobSubmit').bind("click", this.submitCheck);
		editor.on("focus", function() {
			$('#editor').parents('.item-cont').find('.note.errTxt').remove();
		})
	},
	submitCheck: function() {
		var formNum = 4,
			formCount = 0;
		var $name = $('#jobName'),
			$laborage = $('#laborage'),
			$location = $('#location');
		var editorLen = editor.getValue();

		$name.submitEmptyCheck({
			note: "请输入职位名称",
			callback: function() {
                formCount += 1;
			}
		});
		$laborage.submitEmptyCheck({
			note: "请输入职位工资",
			callback: function() {
                formCount += 1;
			}
		});
		$location.submitEmptyCheck({
			note: "请输入工作地点",
			callback: function() {
                formCount += 1;
			}
		});
		$('#editor').parents('.item-cont').find('.note.errTxt').remove();
		if (!editorLen) {
			$('#editor').parents('.item-cont').append('<div class="note errTxt">请输入职位描述</div>');
		} else {
            formCount += 1;
		}

		if (formCount == formNum) {
			$('#formJob').submit();
		}
	},
    //弹出层效果，依赖jquery.popupshow.js
    btnEdit:function(btn){
        btn.on('click',function(){
            var feedbackNode = $("<div class='addprofessional' id='pop-addprofessional'>");

            $(this).popupshow({
                popupId: "pop-addprofessional",
                node: feedbackNode,
                htmlUrl: "addprofessional.html",
                maskId: "mask",
                position: "fixed"
            })
        })
    }

}

$(function() {

	createJob.init();
	createJob.btnEdit($('.power-require .addnew'));
});