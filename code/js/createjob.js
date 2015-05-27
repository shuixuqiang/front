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
    //弹出层效果，用到common.js当中popupshow================
    //点击添加新技能需求；addprofessional.html页面
    btnEdit:function(btn){
        var This=this;
        btn.on('click',function(){
            var feedbackNode = $("<div class='addprofessional' id='pop-addprofessional'>");

            $(this).popupshow({
                popupId: "pop-addprofessional",
                node: feedbackNode,
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
    //编辑弹出层edimajor.html页面
    btnEdit2:function(btn){
        btn.on('click',function(){
            var feedbackNode = $("<div class='editmajor' id='pop-editmajor'>");
            $(this).popupshow({
                popupId: "pop-editmajor",
                node: feedbackNode,
                htmlUrl: "editmajor.html",
                maskId: "mask",
                callback: function(){
                    <!--每个单独点击-->
                    $('.tickUnit').each(function(i,elem){

                        $(elem).tickSelect();
                    })
                    //全选======
                    $('.list ').each(function(s,elem){
                        selectAll($(elem));
                    })
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

                    }
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
                    $('#addSkill').on('click',function(){
                        var strHtml='<div class="newAdd "><div class="tickUnit proneed " > <div class="name">' +
                            '<input type="text" value=""  placeholder="输入新的自定义知识点" class="text"/></div> ' +
                            '<ul class="selectArea"> <li class="style2"></li> <li class="style2"></li>'+
                            '<li class=" style2"></li> <li class="style2"></li> </ul> </div> <div class="operation">'+
                            '<a href="javascript:;">取消</a> <a href="javascript:;">确认</a> </div> </div>';
                        //添加新节点========
                        $('.myskills').append(strHtml);
                        $(this).attr('disabled',true);
                        //新节点添加js效果================
                        var newNode=$('.newAdd .tickUnit');
                        newNode.each(function(i,elem){
                            $(elem).tickSelect();
                        })
                        newNode.find('li').eq(0).on('click',function(){
                            $(this).removeClass('active');
                            newNode.find('.name').html('');
                        });
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
                                var node=$('.myskills .newAdd .tickUnit').clone(true);
                                $(this).parentsUntil('.tickSelect').find('.newAdd').remove();
                                $('.myskills .tickSelect').append(node);
                                //新节点删除功能
                                node.find('li').eq(0).on('click',function(){
                                    node.remove();
                                });

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

                    })

                }
            })



        })
    },
    //myprofessional.html页面
    btnEdit3:function(btn){
        btn.on('click',function(){
            var feedbackNode = $("<div class='myprofessional' id='pop-myprofessional'>");
            $(this).popupshow({
                popupId: "pop-myprofessional",
                node: feedbackNode,
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
                    $('#addSkill').on('click',function(){
                        var strHtml='<div class="newAdd "><div class="tickUnit proneed " > <div class="name">' +
                            '<input type="text" value=""  placeholder="输入新的自定义知识点" class="text"/></div> ' +
                            '<ul class="selectArea"> <li class="style2"></li> <li class="style2"></li>'+
                            '<li class=" style2"></li> <li class="style2"></li> </ul> </div> <div class="operation">'+
                            '<a href="javascript:;">取消</a> <a href="javascript:;">确认</a> </div> </div>';
                        //添加新节点========
                        $('.myskills').append(strHtml);
                        $(this).attr('disabled',true);
                        //新节点添加js效果================
                        var newNode=$('.newAdd .tickUnit');
                        newNode.each(function(i,elem){
                            $(elem).tickSelect();
                        })
                        newNode.find('li').eq(0).on('click',function(){
                            $(this).removeClass('active');
                            newNode.find('.name').html('');
                        });
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
                                var node=$('.myskills .newAdd .tickUnit').clone(true);
                                $(this).parentsUntil('.tickSelect').find('.newAdd').remove();
                                $('.myskills .tickSelect').append(node);
                                //新节点删除功能
                                node.find('li').eq(0).on('click',function(){
                                    node.remove();
                                });

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

                    })

                }
            })

        })
    }

}

$(function() {
	createJob.init();
	createJob.btnEdit($('.power-require .addnew'));
	createJob.btnEdit2($('.power-require .btn-edit'));
});