$(function() {
	fileCtrl();
})

function fileCtrl() {
	var $this = $(".file-ctrl"),
		$upload = $this.children('.btn');
	
	$upload.bind('click', function() {
		_file = $(this).parent().children(':file');
		_file.click().change(function() {
			var fileName = $(this).val();
			$(this).parent().children('.txt').val(fileName);
		})
	});
}
