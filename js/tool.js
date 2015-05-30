/*
以传统方式添加事件处理函数
 */
//1:在函数对象上添加事件对象
//2:为事件对象添加type属性
//3：为type属性添加事件处理函数数组


//为对象绑定事件
function addEvent(obj, type, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(type, fn);
		} else {
			if (!obj.events) {
				obj.events = {};
			} //event判断结束
			if (!obj.events[type]) {
				obj.events[type] = [];
				obj['on' + type] = fn;
			} else {
				if (addEvent.equal(obj.events[type], fn)) return false;

			}
			//从第二次开始用事件计数器来存储
			obj.events[type][addEvent.ID++] = fn;
			obj['on' + type] = addEvent.exec;
		} //最外面else结束
	} //fun结束
addEvent.ID = 1;
//判定事件是否绑定重复
addEvent.equal = function(ect, fn) {
		for (var i in ect) {
			if (ect[i] == fn) {
				console.log('不能重复绑定事件');
				return true;
			}
		}
		return false;
	}
	//循环绑定事件处理函数,函数分离出来需要考虑obj.event对象的获取以及type对象的获取
	//这里的this即代替了obj,type可以用事件对象的type获取
addEvent.exec = function(event) {
	var e = event || window.event;
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	} //for结束

};
//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
  event.preventDefault = addEvent.fixEvent.preventDefault;
  event.stopPropagation = addEvent.fixEvent.stopPropagation;
  event.target = event.srcElement;
  return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
}
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}
//为对象解除事件绑定
function removeEvent(obj, type, fn) {
	if (obj.removeEventListener) {
        obj.removeEventListener(type, fn);
	}else{
		for(var i in obj.events[type])
			if(obj.events[type][i]==fn)
			{
				delete obj.events[type][i];
			}
	}
}

//添加link或style的css规则
function addRule(num,selectorText,cssText,position)
{
	var sheet = document.styleSheets[num];
	if(typeof sheet.insertRule!='undefined')
	{
       sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule!='undefined')
	{
		sheet.addRule(selectorText,cssText,position);
	}
}
//移除link或style的规则
function removeRule(num,index)
{
	var sheet = document.styleSheets[num];
	if(typeof sheet.deleteRule!='undefined')
	{
      sheet.deleteRule(index);
	}else if(typeof sheet.removeRule!='undefined')
	{
      sheet.removeRule(index);
	}
}
//判断class是否存在
function hasClass(element,className){
	var pattern = new RegExp('(\\s|^)'+className+'(\\s|$)');
	var result = pattern.test(element.className);
	return result; 

}

//跨浏览器获取浏览器视口大小
function getInner()
{
	if(typeof window.innerWidth!='undefined'){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}

}

//跨浏览器获取style
function getStyle(element,attr){
	if(typeof window.getComputedStyle!='undefined'){
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle!='undefined')
	{
		return element.currentStyle[attr];
	}
   
}

//删除前后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
//滚动条清零
function scrollTop(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
