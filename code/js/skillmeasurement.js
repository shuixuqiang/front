/**
 * Created by tcw on 2015/5/28.
 */
//模拟效果
$(function() {
    var length = $('.banner h3').size();
    <!--banner效果-->
    //根据页面节点数设置每个h3宽度
    $('.banner h3').css('width', 100 / $('.banner h3').size() + "%");
    //测试内容区效果
    $('.tickUnit').each(function(i, elem) {
    	$(elem).tickSelect();
    });

    if (length == 1) {
        $('.last-wrap').show();
    } else if (length > 1) {

        //下一步点击效果============
        $('.btn-next').each(function(i, elem) {
            $(elem).on('click', function() {
                //数据区域==========
                var currentData = [];
                $('.skill-test').eq(i).find('.tickUnit').each(function(j, elem) {
                    $(elem).find('li').each(function(k, elem) {
                        if ($(elem).hasClass('active')) {
                            currentData.push(k);
                        }
                    });
                });
                //test===============
                //alert(currentData);
                //ajax提交区域=======ajax===========
                $.ajax({
                    type: 'POST',
                    url: '',
                    data: '',
                    success: function() {

                    },
                    error: function() {

                    }
                });
                //显示效果区域=====
                if (i < length - 1) {
                    $('.skill-test').css('display', 'none');
                    $('.skill-test').eq(i + 1).css('display', 'block');
                    $('.banner h3').removeClass('active');
                    $('.banner h3').eq(i + 1).addClass('active');
                }
                if (i == length - 2) {
                    //让额外需求显示

                    $('.last-wrap').css('display', 'block');
                    //让下一步消失
                    $('.btn-next').eq(length - 1).remove();
                }

            });
        });

    }
    //职位额外需求========
    $('.extra-demand .tickSel').each(function(i, elem) {
    	$(elem).on('click', function() {
    		if ($(this).html() == '√满足')
    			$(this).html('我可以满足该条件');
    		else {
    			$(this).html('√满足');
    		}
    		$(this).parents('li').toggleClass('active');
    	});
    });
    //保存按钮=======最终提交数据
    $('.skillmeasure-submit').on('click', function() {
    	var skillResult = []; //测评数据
    	var extraDemand = []; //额外需求;满足为true,否则为false
    	$('.skill-test').eq(length - 1).find('.tickUnit').each(function(i, elem) {
    		$(elem).find('li').each(function(j, elem) {
    			if ($(this).hasClass('active')) {
    				skillResult.push(j);
    			}
    		});
    	});
    	$('.extra-demand li').each(function(i, elem) {
    		if ($(elem).hasClass('active')) {
    			extraDemand.push(true);
    		} else {
    			extraDemand.push(false);
    		}
    	});
    	//test===================
    	//alert(skillResult);
    	//alert(extraDemand);
    	//ajax区域====================ajax=========
    	//$.ajax({
    	//    type:'POST',
    	//    url:'',
    	//    data:'',
    	//    success:function(){
    	//
    	//    },
    	//    error:function(){
    	//
    	//    }
    	//});

    });
    COMMON.addTitle($('.tickUnit.skillmeasure-page').find('.name'));
    COMMON.titleTips('.tickUnit .name');
});