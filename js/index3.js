
$(function(){

	$('.member').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat 55px 15px');
		$('.member_ul').show();
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat 55px 15px');
		$('.member_ul').hide();
	});
	//进行初始化
	var login = $('#login'),
	    lock = $('#screen-lock');
	    addEvent(window,'resize',function(){
	    	if(login.css('display')=='block'){
	    		lock.lock();
	    		login.resize();
	    	}
	    });
	    //点击登录按钮
	    $('.login').click(function(){
	    	login.center().show();
	    	lock.lock();
	    });
	    //关闭登录窗
	    $('.login-close').click(function(){
	    	login.hide();
	    	lock.unlock();
	    });
	    //拖动登陆框
	    login.drag($('#login h2').ge(0));


	    //滑动导航条
	    $("#nav .about li").hover(function(){
	    	var target = $(this).first().offsetLeft;
	    	$(".nav_bg").animate({
	    		step:20,
	    		t:30,
	    		attr:'x',
	    		target:target + 20,
	    		fn:function(){
	    			$("#nav .white").animate({
	    				attr:'x',
	    				target:-target
	    			});
	    		}
	    	});
	    },function(){
           $("#nav .nav_bg").animate({
           	attr:'x',
           	target:20,
           	fn:function(){
           		$("#nav .white").animate({
           			attr:'x',
           			target:0
           		});
           	}
           });
	    });
});
