$(function() {

    //意见反馈
    $("#feedback, #feedback_1").click(function() {
    	
    	var feedbackNode = $("<div class='popup pop-feedback' id='pop-feedback' style='width: 700px'>");
    	
    	$(this).popupshow({
    		popupId: "pop-feedback",
    		node: feedbackNode,
    		htmlUrl: "form/feedback.html",
    		maskId: "mask",
    		position: "fixed"
    	})
    });
    //预约理财师
    $("#order, #order_1").click(function() {
    	
    	var feedbackNode = $("<div class='popup pop-order' id='pop-order' style='width: 700px'>");
    	
    	$(this).popupshow({
    		popupId: "pop-order",
    		node: feedbackNode,
    		htmlUrl: "form/order.html",
    		maskId: "mask",
    		position: "fixed"
    	})
    });
    //关注微信
    $("#weixin").click(function() {
    	   	
    	$(this).popupshow({
    		popupId: "pop-weixin",
    		maskId: "mask",
    		position: "fixed"
    	})
    });
})
