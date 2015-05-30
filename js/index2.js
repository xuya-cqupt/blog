/*addDomLoaded(function(){
	console.log('加载完成');
});
*/
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
	    //$("#login p").css('background','red');
	    //$("#login .login-p").css('background','green');
});
