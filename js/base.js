//前台调用
function $(_this)
{
	return new Base(_this);
}
//基础库
function Base(_this)
{
	this.elements = [];
	if(_this!= undefined)
		{
			this.elements[0] = _this;
		}
}
//获取ID结点
Base.prototype.getId = function(id)
{
	var element = document.getElementById(id);
	this.elements.push(element);
	return this;

}
//获取元素结点数组
Base.prototype.getTagName = function(tag)
{
   var element = document.getElementsByTagName(tag);
   for(var i =0;i<element.length;i++)
   {
      this.elements.push(element[i]);
   }   
   return this;
}  
//获取class结点数组
Base.prototype.getClass = function(className,idName)
{
   if(idName =='undefined')
   {
   	idName = document.getElementById(idName);
   }else{
   	idName = document;
   }
   var element = idName.getElementsByTagName('*');
   for(var i =0;i<element.length;i++)
   {
   	if(element[i].className==className)
   	{
      this.elements.push(element[i]);
   	}
   }
   return this;
}
//获取class结点中的某一个结点
Base.prototype.getElement = function(num)
{
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
   return this;
}
//设置或获取css样式
Base.prototype.css = function(attr,value)
{
   for(var i=0;i<this.elements.length;i++)
   {
	   	if(arguments.length==1)
	   	 {
		     return getStyle(this.elements[i],attr);
	   	 }else{
	          this.elements[i].style[attr] = value;
	      }
   }
   return this;
}  
//添加css
Base.prototype.addClass = function(className)
{
	for(var i=0;i<this.elements.length;i++)
	{
       if(!hasClass(this.elements[i],className))
       {
       	this.elements[i].className+=" "+className;
       }
	}
	return this;

}
//移除class
Base.prototype.removeClass= function(className)
{
   for(var i=0;i<this.elements.length;i++)
   {
     if(hasClass(this.elements[i],className))
     {
     	this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
     }
   }
   return this;
}

//设置innerHTML
Base.prototype.html = function(str)
{
	for(var i=0;i<this.elements.length;i++)
	{
		if(arguments.length==0)
		{
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
   }
   return this;
}
//设置鼠标移入移出方法
Base.prototype.hover = function(over,out)
{
  for(var i=0;i<this.elements.length;i++)
  {
    this.elements[i].onmouseover = over;
    this.elements[i].onmouseout = out;
  }
  return this;
}
//设置元素显示
Base.prototype.hide = function()
{
   for(var i=0;i<this.elements.length;i++)
   {
     this.elements[i].style.display = 'none';
   }
   return this;
}
//设置元素隐藏
Base.prototype.show = function()
{ 
	for(var i=0;i<this.elements.length;i++)
	{
       this.elements[i].style.display = 'block';
	}
	return this;
}
//触发点击事件
Base.prototype.click = function(fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
      this.elements[i].onclick = fn;
	}
 return this;
}
//设置物体居中
Base.prototype.center = function(){
	var top = 0,left = 0;
	for(var i=0;i<this.elements.length;i++)
	{
		var obj = this.elements[i];
		top = (getInner().height-parseInt(getStyle(obj,'height')))/2;
		left =(getInner().width-parseInt(getStyle(obj,'width')))/2;
		obj.style.top = top+'px';
		obj.style.left = left+'px'; 
	}
	return this;
}
//锁屏功能
Base.prototype.lock = function(){
  for(var i=0;i<this.elements.length;i++)
  {
  	var obj = this.elements[i];
  	 document.documentElement.style.overflow = 'hidden';//取消滚动条
  	 obj.style.width = getInner().width+'px';
  	 obj.style.height = getInner().height+'px';
  	 obj.style.display = 'block';
  	// document.body.style.overflow = 'hidden';
  }
  //这时需要禁止拖动页面其余地方导致整个页面都会拉长从而导致空白产生
  addEvent(window,'scroll',scrollTop);
  return this;
}
Base.prototype.unlock = function(){
  for(var i=0;i<this.elements.length;i++)
  {
  	var obj = this.elements[i];
  	obj.style.display = 'none';
  	document.documentElement.style.overflow = 'auto';
  }
  removeEvent(window,'scroll',scrollTop);

  return this;
}
//浏览器窗口的大小被重置时，对话框此时判断位置后需要产生相应的变化，即重置位置
Base.prototype.resize = function(fn){
	for(var i=0;i<this.elements.length;i++)
	{
		var obj = this.elements[i];
		var l = getInner().width - obj.offsetWidth,
		    t = getInner().height - obj.offsetHeight,
		    left = obj.offsetLeft,
		    top = obj.offsetHeight;
		if(left>l){
			left = l;}
		else if(left<0){
			 	left=0;
			 }
		if(top>t){
			top = t;}else if(top<0){
			 	top=0;
			 }
       obj.style.left = left+'px';
       obj.style.top = top+'px'; 
	}
   return this;
}
//拖拽功能
Base.prototype.drag = function(){
   for(var i=0;i<this.elements.length;i++){
   	addEvent(this.elements[i],'mousedown',function(e){
   		var e =e||window.event;
   		//当弹框空白时拖动会出现bug,这个时候阻止默认行为，如果全部禁止会导致输入框无法输入
   		if(trim(this.innerHTML).length==0)
   		 e.preventDefault();
   		var _this = this,
   		 disX = e.clientX-this.offsetLeft,
   		 disY = e.clientY - this.offsetTop;
   		//只有在目标结点是标题时才拖动，否则会导致选中里面的内容时无法选中而被拖动
   		var tag = null;
         if(typeof e.target!='undefined'){
              tag = e.target;
         }else if(typeof e.srcElement!='undefined'){
         	tag = e.srcElement;
         }
   		 if(tag.tagName.toLowerCase()=='h2'){
   		addEvent(document,'mousemove',fnMove);
   		addEvent(document,'mouseup',fnUp);
   	    }else{
   	    	removeEvent(document,'mousemove',fnMove);
   		   removeEvent(document,'mouseup',fnUp);
   	    }
   		return false;
   		function fnMove(e){
   			var e = e||window.event;
   			var clientX = getInner().width - _this.offsetWidth,
   		        clientY = getInner().height - _this.offsetHeight,
   			    coordX = e.clientX - disX,
   			    coordY = e.clientY - disY;
   			if(coordX<0){
   				coordX = 0;
   			}else if(coordX>clientX){
   				coordX = clientX;
   			}
   			if(coordY<0){
   				coordY = 0;
   			}else if(coordY>clientY){
                coordY = clientY;
   			}
         _this.style.left = coordX+'px';
         _this.style.top = coordY +'px';
         if(typeof _this.setCapture!='undefined'){
         	_this.setCapture();
         }
   		}//fnMove结束
   		function fnUp(){
         removeEvent(document,'mousemove',fnMove);
         removeEvent(document,'mouseup',fnUp);
         if(typeof _this.releaseCapture!='undefined')
         {
         	_this.releaseCapture();
         }
   		}//fnUp结束
   	});
   }//for结束
}