window.onload = function(){
 //设置导航条
 $().getClass('member').hover(function(){
 	$(this).css('background','url(images/arrow2.png) no-repeat 55px 15px');
 	$().getClass('member_ul').show();

 },function(){
 	$(this).css('background','url(images/arrow.png) no-repeat 55px 15px');
 	$().getClass('member_ul').hide();
 });
//进行初始化
var login = $().getId('login');
var lock = $().getId('screen-lock');
addEvent(window,'resize',function(){
	if(login.css('display')=='block')
	{
		lock.lock();
	    login.resize();
	}
});
 //点击登录按钮
 
  $().getClass('login').click(function(){
 	login.center().show();
 	lock.lock();
 });

 
 //关闭登录窗
 $().getClass('login-close').click(function(){
 	login.hide();
 	lock.unlock();
 });
 //拖动登录框
 login.drag();
}//load结束