/**
 * Created by tcw on 2015/5/28.
 */
var length=$('.banner h3').size();
<!--banner效果-->
$('.banner h3').each(function(i,elem){
    $(elem).on('click',function(){
        $('.banner h3').removeClass('active');
        $(this).addClass('active');
        $('.skill-test').css('display','none');
        $('.skill-test').eq(i).css('display','block');
        if(i==length-1){
            //让额外需求显示
            $('.last-wrap').css('display','block');
        }else{
            $('.last-wrap').css('display','none');
        }
    });
});
//根据页面节点数设置每个h3宽度
$('.banner h3').css('width',1002/$('.banner h3').size());
//测试内容区效果
$('.tickUnit').each(function(i,elem){
    $(elem).tickSelect();
});

//下一步点击效果============
$('.btn-next').on('click',function(){
    var currentindex=0;
    for(var i=0;i<length;i++){
        if($('.banner h3').eq(i).hasClass('active')){
            currentindex=i;
            break;
        }
    }
    if(currentindex<length-1){
        $('.skill-test').css('display','none');
        $('.skill-test').eq(currentindex+1).css('display','block');

        $('.banner h3').removeClass('active');
        $('.banner h3').eq(currentindex+1).addClass('active');
    }
    if(currentindex==length-2){
        //让额外需求显示
        $('.last-wrap').css('display','block');
    }
});
//职位额外需求========
$('.extra-demand .tickSel').each(function(i,elem){
    $(elem).on('click',function(){
        if($(this).html()=='√满足')
            $(this).html('我可以满足该条件');
        else{
            $(this).html('√满足');
        }
        $(this).parents('li').toggleClass('active');
    });
});
//保存按钮=======最终提交数据
$('.skillmeasure-submit').on('click',function(){
    var skillResult=[];//二维数组，每个一维数组对于存放的一组数据；
    var extraDemand=[];//额外需求;满足为true,否则为false
    $('.skill-test').each(function(i,elem){
        skillResult[i]=new Array();
        $(elem).find('.tickUnit').each(function(j,elem){
            $(elem).find('li').each(function(k,elem){
                if($(this).hasClass('active')){
                    skillResult[i].push(k);
                }
            });
        });
    });
    $('.extra-demand li').each(function(i,elem){
        if($(elem).hasClass('active')){
            extraDemand.push(true);
        }else{
            extraDemand.push(false);
        }
    });
    //test
    //alert(skillResult);
    //alert(extraDemand);
});