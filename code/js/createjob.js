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

        // 上下移动禁用
        this.moveDisabled($('.pr-list'));
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
		    // 正文长度
            var regAttr = /<[a-z]+[^>]*[a-z]=['"]([^"]*)['"].*?[^>]*>/g;
            var regTag = /(<([a-z]+)>)*(<\/([a-z]+)>)*(&nbsp;)*/g;
            var text = editorLen.replace(regAttr, "").trim();
            text = text.replace(regTag, "").trim();
            var setLength = 1500;
            if(text.length > setLength) {
                $('#editor').parents(".item-cont").find('.note.errTxt').remove();
                var node = $('<div class="note errTxt"><i class="icon icon-warn" style="margin-right:5px"></i>正文内容长度超出' + setLength + '个字符</div>');
                $('#editor').parents(".item-cont").append(node);
            } else {
                formCount += 1;
            }
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
                    btn.trigger('blur');
                    $('#pop-addprofessional .probtn:not(".disabled")').on('click',function(){
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
                    btn.trigger('blur');
                    <!--每个单独点击-->
                    $('.tickUnit').each(function(i,elem){

                        COMMON.addTitle($(elem).find('.name'));
                        COMMON.titleTips('.tickUnit .name');
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
                            }
                        });

                        //test=============
                        //alert(basicDegree);
                        //利用上面四个数组组织数据====================

                        //$.ajax({
                        //    type:'POST',
                        //    url:'xxx.txt',
                        //    data:basicDegree,
                        //    success:function(data){
                        //        alert(data);
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
                    btn.trigger('blur');
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

                    // 输入专业名称时校验字符长度, 判断是否激活按钮
                    var $professionName = $('.pro-name input');
                    var pronameCheck = /^[A-Za-z0-9\'_-\s\u4E00-\u9FA5\uF900-\uFA2D]+$/;
                    var temp = '';
                    $professionName.bind("keyup", function() {
                        var thisval = $(this).val();
                        if (pronameCheck.test(thisval)) {
                            temp = thisval;
                        } else if (thisval.length) {
                            $(this).val(temp);
                        }
                        if($(this).val()) {
                            $('#addSkill').attr("disabled", false);
                            var skill = $('.definenewadd');
                            if (skill.length > 0) {
                                $('#myprofessional-submit').attr("disabled", false);
                            }

                        } else {
                            $('#addSkill').attr("disabled", true);
                            $('#myprofessional-submit').attr("disabled", true);
                        }
                    });

//                  $professionName.bind("blur", function() {
//                      var val = $(this).val();
//                      console.log(pronameCheck.test(val));
//                  });

                    // 添加自定义知识点
                    This.userDefined($('#addSkill'), function() {
                        // 删除知识点的回调函数
                        var skill = $('.definenewadd');
                        if (skill.length <= 0) {
                            $('#myprofessional-submit').attr("disabled", true);
                        }
                        if (!$professionName.val()) {
                            $('#addSkill').attr("disabled", true);
                        }
                    }, function() {
                        // 取消添加知识点的回调函数
                        var skill = $('.definenewadd');
                        if (skill.length <= 0) {
                            $('#myprofessional-submit').attr("disabled", true);
                        }
                        if (!$professionName.val()) {
                            $('#addSkill').attr("disabled", true);
                        }
                    });

                    // 保存并添加按钮事件=============================

                    $('#myprofessional-submit').on('click',function() {
                        //遍历结果数组
                        var professionName='';
                        var definedDegree=[];
                        var definedName=[];
                        //遍历========
                        professionName = $('.pro-name input').val();

                        if(professionName==''){
                            alert('请输入专业名称 ^_^ ')
                        }else{
                            search($('.myskills .tickUnit'),definedDegree,definedName);
                            //组织数据========================
                            //test==========
                            //alert(professionName);
                            //alert(definedDegree);
                            //alert(definedName);
                            $.post({
                                url:'',
                                data:{},
                                success:function(data){

                                },
                                error:function(){

                                }
                            });
                        }
                        //遍历方法
                        function search(obj,result,name){
                            obj.each(function(i,elem){
                                var allLi=$(elem).find('li');
                                var head=$(elem).find('.name');
                                for(var i=0;i<allLi.length;i++){
                                    if(allLi.eq(i).hasClass('active')){
                                        result.push(i);
                                        name.push(head.html());
                                        break;
                                    }
                                }
                            });
                        }

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
                    btn.trigger('blur');
                    $('#pop-extrademand .textArea').trigger('focus');
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

                    $('#pop-extrademand').bind('keyup', function() {
                        var name = $('.extrademand .textArea').val();
                        var lock = 0;
                        if (name) {
                            // 保存并添加按钮事件
                            $('#extrademand-submit').on('click',function(){
                                if (lock == 1) return false;
                                //传输数据
                                var name=$('.extrademand .textArea').val();
                                var grade=$('.extrademand .selectArea strong').html();
                                //验证用户输入是否为空
                                $.post({
                                    url:'',
                                    data:{},
                                    success:function(data){

                                    },
                                    error:function(){

                                    }
                                });
                            }).removeClass("disabled");
                        } else {
                            $('#extrademand-submit').unbind('click').addClass("disabled");
                        }
                    });
                }
            })
        })
    },
    userDefined:function(obj, /* optional */ delcallback, /* optional */ cancelcallback){
        obj.on('click',function(){
            var strHtml='<div class="newAdd "><div class="tickUnit proneed " > <div class="name">' +
                '<input type="text" value="" placeholder="输入新的自定义知识点" class="text"/></div> ' +
                '<ul class="selectArea">  <li class="color2 active"></li>'+
                '<li class=" color3"></li> <li class="color4"></li> </ul> </div> <div class="operation">'+
                '<a href="javascript:;">取消</a> <a href="javascript:;">确认</a> </div> </div>';

            var This=$(this);
            //添加新节点========
            $('.myskills').append(strHtml);
            This.attr('disabled',true);
            // 输入框定位
            var $content = $(this).parents('.content');
            var contentScrollT = $content.scrollTop();
            $content.scrollTop(contentScrollT + 70);

            //禁用保存并添加按钮
            var submit=$(this).parents('body').find('footer .btn-reverse');
                submit.attr('disabled',true);
            //新节点添加js效果================
            var newNode=$('.newAdd .tickUnit');
            newNode.tickSelect();

            //取消确认按钮=================
            var opA = $('.newAdd .operation a');
            //取消按钮
            opA.eq(0).on('click',function(){
                $(this).parentsUntil('.tickSelect').find('.newAdd').remove();

                This.attr('disabled',false);
                submit.attr('disabled',false);
                if (cancelcallback !== undefined) {
                    cancelcallback();
                }

            });
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
                    var tickUnit= $('<div class="tickUnit proneed definenewadd" data-newNodeIndex="1">');
                    var tickUnit_name = $('<div class="name">');
                    var tickUnit_select = $('<ul class="selectArea"><li class="del"></li><li class=" color2"></li> <li class="color3"></li><li class=" color4"></li></ul>');
                    var tickUnit_name_temp = tickUnit_name.text(newNodeHtml);
                    tickUnit.append(tickUnit_name_temp).append(tickUnit_select);

                    // 删除newAdd
                    $(this).parentsUntil('.tickSelect').find('.newAdd').remove();
                    // 插入知识点
                    $('.myskills .tickSelect').append(tickUnit);
                    ////新节点设置数据
                    $('.definenewadd').each(function(i,elem){
                        //新节点点击效果
                        $(elem).tickSelect();
                        COMMON.addTitle($('.tickUnit .name'));
                        //删除效果
                        (function(node){
                            node.find('.del').on('click',function(){
                                node.remove();
                                // 删除时执行回调
                                if (delcallback !== undefined) {
                                    delcallback();
                                }
                            });
                        })($(elem));
                    })
                    //传输用户选择的数据
                    $('.definenewadd:last').find('li').eq(index+1).addClass('active');

                    This.attr('disabled',false);
                    submit.attr('disabled',false);
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
            });
            // 自动获取焦点，以及敲击回车键添加
            $('.newAdd .text').focus(function() {
                $('body').keyup(function(e) {
                    if (e.keyCode == '13') {
                        opA.eq(1).click();
                    }
                });
            }).trigger('focus');

        });
    },
    movefn:function(obj,direct){
        var Thit = this;
        //注意curindex从1开始编号的
        if(direct=='top'){
            obj.on('click',function(){
                var curNode=$(this).parents('.pr-list');
                var curindex=curNode.index();
                if(curindex>=1) {
                    curNode.insertBefore($('.pr-list').eq(curindex-1));
                    // 上下移动禁用
                    Thit.moveDisabled($('.pr-list'));
                }
            });
        }else if(direct=='bottom'){
            obj.on('click',function(){
                var curNode=$(this).parents('.pr-list');
                var curindex=curNode.index();
                var length=$('.pr-list').size();

                if(curindex + 1 < length)
                    curNode.insertAfter($('.pr-list').eq(curindex + 1));
                    // 上下移动禁用
                    Thit.moveDisabled($('.pr-list'));
            });
        }

    },
    moveNode:function(objArr,direct){
        var length=objArr.size();
        for(var i=0;i<length;i++){
            this.movefn(objArr.eq(i),direct);
        }
    },
    delBlock:function(){
        var Thit = this;
        $('.mod-power').delegate('.power-ctrl-btns span:nth-of-type(3)', 'click',function(){
            if(window.confirm('确定删除！')){
                $(this).parents('.pr-list').remove();
                // 上下移动禁用
                Thit.moveDisabled($('.pr-list'));
            }
        });
    },
    moveDisabled: function(obj) {
        if (obj.length <= 1) {
            obj.find('.btn-movetop').addClass("disabled");
            obj.find('.btn-movebottom').addClass("disabled");
        }
        obj.find('.btn-movetop').removeClass("disabled");
        obj.find('.btn-movebottom').removeClass("disabled");
        obj.first().find('.btn-movetop').addClass("disabled");
        obj.last().find('.btn-movebottom').addClass("disabled");
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
    //删除节点==
    createJob.delBlock();

});