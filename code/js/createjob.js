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
        //滑动效果
        var $scale = $('.power-import-scale');
        $('.mod-range').each(function(i,elem){
            $(elem).range({
                scale: $scale.eq(i)
            });
        });

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
    //弹出层效果，用到common.js当中popupshow================
    //点击添加新技能需求；addprofessional.html页面
    btnEdit:function(btn){
        var This=this;
        btn.on('click',function(){
            $(this).popupshow({
                popupId: "pop-addprofessional",
                htmlUrl: "addprofessional.html",
                maskId: "mask",
                position: "fixed",
                callback:function(){
                    $('#pop-addprofessional .probtn').on('click',function(){
                        $('#mask').remove();
                        $('#pop-addprofessional').remove();
                        This.btnEdit2( $(this));
                        $(this).trigger('click');
                    });
                    //添加自定义专业点击事件
                    $('#pop-addprofessional .adduser-defined .btn-reverse').on('click',function(ev){
                        ev.preventDefault();
                        $('#mask').remove();
                        $('#pop-addprofessional').remove();
                        This.btnEdit3( $(this));
                        $(this).trigger('click');
                    });

                }
            })


        })
    },
    //编辑专业需求弹出层edimajor.html页面
    btnEdit2:function(btn){
        var This=this;
        btn.on('click',function(){
            $(this).popupshow({
                popupId: "pop-editmajor",
                htmlUrl: "editmajor.html",
                maskId: "mask",
                callback: function(){
                    <!--每个单独点击-->
                    $('.tickUnit').each(function(i,elem){

                        $(elem).tickSelect();
                    });
                    //全选======
                    $('.list ').each(function(s,elem){
                        selectAll($(elem));
                    });
                    //全选四个按钮功能实现
                    function selectAll(iblock){
                        var ihead=iblock.find('.select-head');
                        var ibody=iblock.find('.tickSelect');
                        var iheadLi=ihead.find('li');
                        var selectLength=iheadLi.size();
                        //添加点击事件
                        for(var i=0;i<selectLength;i++){
                            (function(i){
                                iheadLi.eq(i).on('click',function(){
                                    iheadLi.removeClass('active');
                                    $(this).addClass('active');
                                    //全选123
                                    if(i==selectLength-1){
                                        ibody.find('.tickUnit li').removeClass('active');
                                    }
                                    else{
                                        for(var j=0;j<selectLength-1;j++){
                                            if(iheadLi.eq(j).hasClass('active')){
                                                ibody.find('.tickUnit li').removeClass('active');
                                                ibody.find('.tickUnit').each(function(k,elem){
                                                    $(elem).find('li').eq(j+1).addClass('active');
                                                })
                                            }
                                        }
                                    }
                                })
                            })(i);
                        }

                    };
                    //自定义技能点监听事件
                    var mydefineNodes=$('.myskills .tickUnit');
                    delMyNode(mydefineNodes);
                    // 删除每一个节点
                    function delMyNode(mydefineNodes){
                        var length=mydefineNodes.size();
                        for(var i=0;i<length;i++){
                            (function(i){
                                var delNode=mydefineNodes.eq(i);
                                var delbtn=delNode.find('li').eq(0);
                                delbtn.on('click',function(){
                                    if($(this).hasClass('active'))
                                        delNode.remove();
                                })
                            })(i);
                        }
                    }
                    // 添加自定义知识点
                    This.userDefined($('#addSkill'));

                    // 保存并添加按钮事件=============================
                    $('#editmajor-submit').on('click',function(){
                        //遍历结果数组
                        var basicDegree=[];
                        var advanceDegree=[];
                        var highDegree=[];
                        var definedDegree=[];
                        var defineName=[];
                        //遍历========
                        search($('.basic-skills .tickUnit'),basicDegree);
                        search($('.advance-skills .tickUnit'),advanceDegree);
                        search($('.high-skills .tickUnit'),highDegree);
                        //前三个遍历方法
                        function search(obj,result){
                           obj.each(function(i,elem) {
                               var allLi = $(elem).find('li');
                               for (var i = 0; i < allLi.length; i++) {
                                   if (allLi.eq(i).hasClass('active')) {
                                       result.push(i);
                                       break;
                                   }
                               }
                           });
                        }
                        //自定义遍历name和degree
                        $('.myskills .tickUnit').each(function(i,elem){
                            //保存name
                            var temp=$(elem).find('.name').html();
                            defineName.push(temp);
                            //保存degree
                            var allLi=$(elem).find('li');
                            for(var i=0;i<allLi.length;i++){
                               if(allLi.eq(i).hasClass('active')){
                                    definedDegree.push(i);
                                     break;
                               }
                               return result;
                            }
                        });


                        //test=============
                        //alert(basicDegree);
                        //利用上面四个数组组织数据====================

                        //$.post({
                        //    url:'',
                        //    data:{},
                        //    success:function(data){
                        //
                        //    },
                        //    error:function(){
                        //
                        //    }
                        //});

                    });
                }
            });

        })
    },
    //myprofessional.html页面
    btnEdit3:function(btn){
        var This=this;
        btn.on('click',function(){
            $(this).popupshow({
                popupId: "pop-myprofessional",
                htmlUrl: "myprofessional.html",
                maskId: "mask",
                callback: function(){
                    <!--每个单独点击-->
                    $('.tickUnit').each(function(i,elem){

                        $(elem).tickSelect();
                    })
                    //自定义技能点监听事件
                    var mydefineNodes=$('.myskills .tickUnit');
                    delMyNode(mydefineNodes);
                    // 删除每一个节点
                    function delMyNode(mydefineNodes){
                        var length=mydefineNodes.size();
                        for(var i=0;i<length;i++){
                            (function(i){
                                var delNode=mydefineNodes.eq(i);
                                var delbtn=delNode.find('li').eq(0);
                                delbtn.on('click',function(){
                                    if($(this).hasClass('active'))
                                        delNode.remove();
                                })
                            })(i);
                        }
                    }
                    // 添加自定义知识点
                    This.userDefined($('#addSkill'));
                    //    保存并添加按钮事件=============================
                    $('#myprofessional-submit').on('click',function(){
                        //遍历结果数组
                        var professionName='';
                        var definedDegree=[];
                        var definedName=[];
                        //遍历========
                        search($('.myskills .tickUnit'),definedDegree,definedName);
                        professionName=$('.pro-name input').val();
                        //遍历方法
                        function search(obj,result,name){
                            obj.each(function(i,elem){
                                var allLi=$(elem).find('li');
                                for(var i=0;i<allLi.length;i++){
                                    if(allLi.eq(i).hasClass('active')){
                                        result.push(i);
                                        name.push($(this).html());
                                        break;
                                    }
                                }
                            });
                        }
                        //组织数据========================
                        //test==========
                        //alert(professionName);

                        $.post({
                            url:'',
                            data:{},
                            success:function(data){

                            },
                            error:function(){

                            }
                        });
                    });

                }
            })

        })
    },
    //extrademond.html页面js效果
    btnEdit4:function(btn){
        btn.on('click',function(){
            $(this).popupshow({
                popupId: "pop-extrademand",
                htmlUrl: "extrademand.html",
                maskId: "mask",
                callback: function(){
                    $('.selectArea li').on('click',function(){
                        var html=$(this).find('span').text();
                        $('.selectArea .head strong').html(html);
                        $('.selectArea .con').css('display','none');
                        $('.selectArea .icon').css('background','url('+"img/ui/icon-select-2.jpg"+')  no-repeat left top');
                        $('.content .btn-reverse').css('display','block');

                    });
                    $('.selectArea .icon').on('click',function(){
                        $('.selectArea .con').css('display','block');
                        $(this).css('background','url('+"img/ui/icon-select-1.jpg"+')  no-repeat left top');
                        $('.content .btn-reverse').css('display','none');
                    });
                    //    保存并添加按钮事件
                    $('#extrademand-submit').on('click',function(){
                        $.post({
                            url:'',
                            data:{},
                            success:function(data){

                            },
                            error:function(){

                            }
                        });
                    });
                }
            })
        })
    },
    userDefined:function(obj){
        obj.on('click',function(){
            var strHtml='<div class="newAdd "><div class="tickUnit proneed " > <div class="name">' +
                '<input type="text" value=""  placeholder="输入新的自定义知识点" class="text"/></div> ' +
                '<ul class="selectArea">  <li class="color2"></li>'+
                '<li class=" color3"></li> <li class="color4"></li> </ul> </div> <div class="operation">'+
                '<a href="javascript:;">取消</a> <a href="javascript:;">确认</a> </div> </div>';
            //添加新节点========
            $('.myskills').append(strHtml);
            $(this).attr('disabled',true);
            //新节点添加js效果================
            var newNode=$('.newAdd .tickUnit');
            newNode.tickSelect();

            var This=$(this);
            //取消确认按钮=================
            var opA=$('.newAdd .operation a');
            //取消按钮
            opA.eq(0).on('click',function(){
                $(this).parentsUntil('.tickSelect').find('.newAdd').remove();

                This.attr('disabled',false);
            })
            //确认按钮
            opA.eq(1).on('click',function(){
                var newNodeHtml=$('.myskills .newAdd .text').val();
                //对输入内容限制条件======
                var tips=textFilter(newNodeHtml);
                if(tips==-1){
                    //新节点点击的位置
                    var index=0;
                    for(var i=0;i<3;i++){
                        if(newNode.find('li').eq(i).hasClass('active')){
                            index=i;
                            break;
                        }
                    }
                    var addNode=' <div class="tickUnit proneed definenewadd" data-newNodeIndex="1">'+
                        '<div class="name">'+newNodeHtml+'</div>'+
                        '<ul class="selectArea"><li class="del"></li><li class=" color2"></li> <li class="color3"></li> ' +
                        '<li class=" color4"></li>  </ul> </div>';

                    $(this).parentsUntil('.tickSelect').find('.newAdd').remove();
                    $('.myskills .tickSelect').append(addNode);
                    ////新节点设置数据
                    $('.definenewadd').each(function(i,elem){
                        //新节点点击效果
                        $(elem).tickSelect();
                        //删除效果
                        (function(node){
                            node.find('.del').on('click',function(){
                                node.remove();
                            });
                        })($(elem));
                    })
                    //传输用户选择的数据
                    $('.definenewadd:last').find('li').eq(index+1).addClass('active');

                    This.attr('disabled',false);
                }else{
                    alert(tips);
                }
                function textFilter(str){
                    var result=-1;
                    //var re=//g;正则，更好的判断方法
                    if(str.length>100){
                        result="您输入的字符过长，请重新输入";
                    }else if(str==""||str=="输入新的自定义知识点"){
                        result="请输入内容";
                    }
                    return result;
                }
            })

        });
    },
    movefn:function(obj,direct){
        //注意curindex从1开始编号的
        if(direct=='top'){
            obj.on('click',function(){
                var curNode=$(this).parents('.pr-list');
                var curindex=curNode.index();
                if(curindex>=2)
                    curNode.insertBefore($('.pr-list').eq(curindex-2));
            });
        }else if(direct=='bottom'){
            obj.on('click',function(){
                var curNode=$(this).parents('.pr-list');
                var curindex=curNode.index();
                var length=$('.pr-list').size();

                if(curindex<length)
                    //$('.pr-list').eq(curindex-2).insertBefore(curNode);
                    curNode.insertAfter($('.pr-list').eq(curindex));
            });
        }

    },
    moveNode:function(objArr,direct){
        var length=objArr.size();
        for(var i=0;i<length;i++){
            this.movefn(objArr.eq(i),direct);
        }
    }


}

$(function() {
	createJob.init();
	createJob.btnEdit($('.power-require .addnew'));
	createJob.btnEdit2($('.power-require .btn-edit'));
	createJob.btnEdit4($('#addOtherRequire'));
    //移动节点==
    createJob.moveNode($('.btn-movetop'),'top');
    createJob.moveNode($('.btn-movebottom'),'bottom');

});