var testlist = {
	init: function() {
		this.bindEle();
	},
	bindEle: function() {
		$('#statistic .t-view').bind("click", this.unfold);
	},
	unfold: function() {
		var $this = $(this),
			$arrow = $this.children('.arrow');

		if ($arrow.hasClass("bottom-solid")) {
			var scorelist = $this.parents('tr').next('tr[data-scorelist]');
			if (scorelist.length) {
				$arrow.removeClass("bottom-solid").addClass("top-solid");
				scorelist.show();
			}
		} else if ($arrow.hasClass("top-solid")) {
			var scorelist = $this.parents('tr').next('tr[data-scorelist]');
			if (scorelist.length) {
				$arrow.removeClass("top-solid").addClass("bottom-solid");
				scorelist.hide();
			}
		}
	}
}

$(function() {
	testlist.init();
});