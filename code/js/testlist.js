var testlist = {
	init: function() {
		this.bindEle();
		this.interleave("statistic");
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
	},
	interleave: function(id) {
        var $this = $('#' + id),
            $tr = $this.children('tbody').children('tr'),
            trLen = $tr.length;
        for (var i = 0; i <= trLen; i += 4) {
            $tr.eq(i).addClass("bg-odd");
        }
	}
}

$(function() {
	testlist.init();
});