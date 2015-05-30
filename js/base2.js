
//判断浏览器类型
(function(){
  window.sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s=null;
  (s=ua.match(/msie ([\d.]+)/))?sys.ie=s[1]:
  (s=ua.match(/firefox\/([\d.]+)/))?sys.firefox = s[1]:
  (s=ua.match(/chrome\/([\d.]+)/))?sys.chrome = s[1]:
  (s=ua.match(/opera.*version\/([\d.]+)/))?sys.opera = s[1]:
  (s=ua.match(/version\/([\d.]+).*safari/))?sys.safari = s[1]:0;
})();

//前台调用
function $(_this)
{
	return new Base(_this);
}
//基础库
function Base(args)
{
	this.elements = [];
  if(typeof args=='string'){//注意写选择器时不可以在一个选择器中有空格否则检测不到
    var str = trim(args);
        if(str.indexOf(' ')!=-1){
            var elements = str.split(' ');//用来存放临时节点对象的数组，解决被覆盖的问题
            var childElements =[],node = [];//用来存放父节点
              for(var i=0;i<elements.length;i++){
                if(node.length==0) node.push(document);
                      switch(elements[i].charAt(0)){
                        case '#':
                          childElements = [];
                          childElements.push(this.getId(elements[i].substring(1)));
                          node = childElements;
                          break;
                        case '.':
                           childElements = [];
                            for(var k=0;k<node.length;k++){
                              var temps = this.getClass(elements[i].substring(1),node[k]);
                                  for(var m=0;m<temps.length;m++){
                                    childElements.push(temps[m]);
                                  }
                            }
                            node = childElements;
                        break;
                        default:
                            childElements = [];
                            for(var j=0;j<node.length;j++){
                                var temps = this.getTagName(elements[i],node[j]);
                                for(var k=0;k<temps.length;k++){
                                  childElements.push(temps[k]);
                                }
                            }
                            node = childElements;
                      }//switch end
              }//for  end
              this.elements = childElements;
        }else{
                  switch(str.charAt(0)){
                    case '#':
                      this.elements.push(this.getId(args.substring(1)));
                      break;
                    case '.':
                      this.elements = this.getClass(args.substring(1));
                    break;
                    default:
                      this.elements = this.getTagName(args);
                  }//switch结束
              }
  }else if(typeof args=='object')
		{
			this.elements[0] = args;
		}else if(typeof args=='function'){
      this.ready(args);

    }
}
Base.prototype.ready = function(fn) {
  addDomLoaded(fn);
};

//获取ID结点
Base.prototype.getId = function(id)
{
     return document.getElementById(id);
}
//获取元素结点数组
Base.prototype.getTagName = function(tag,parentNode)
{
  var node = null;
  var temps = [];
  if(parentNode!=undefined){
    node = parentNode;
  }else{
    node = document;
  }
  var elements = node.getElementsByTagName(tag);
  for(var i=0;i<elements.length;i++){
   temps.push(elements[i]);
  }
 return temps;  
}  
//获取class结点数组
Base.prototype.getClass = function(className,idName)
{
  var temps = [];
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
      temps.push(element[i]);
   	}
   }
   return temps;
};
Base.prototype.find = function(args){
  var str = trim(args);
  var childElements = [];
  for(var k=0;k<this.elements.length;k++){
      switch(str.charAt(0)){
        case "#":
            childElements.push(this.getId(str.substring(1)));
        break;
        case '.':
            var elements = this.getClass(str.substring(1),this.elements[k]);
            for(var j=0;j<elements.length;j++){
               childElements.push(elements[j]);
            }//for
            break;
          default:
          var elements = this.getTagName(str,this.elements[k]);
          for(var j=0;j<elements.length;j++){
             childElements.push(elements[j]);
          }//for结束
        }//switch结束
     
  }//for结束
  this.elements = childElements;
  return this;
};//find结束
//获取class结点中的某一个结点，并返回结点对象
Base.prototype.ge = function(num)
{
	return  this.elements[num];
};
//获取首个结点，并返回这个结点对象
Base.prototype.first = function(){
  return this.elements[0];
};

//获取最后一个结点，并返回这个结点对象
Base.prototype.last = function(){
  return this.elements[this.elements.length-1];
}
//获取最后一个结点，并返回Base对象
Base.prototype.lastItem = function(){
  this.elements[0] = this.elements[this.elements.length-1];
  return this;
}
//获取class结点中的某一个结点，并返回Base对象
Base.prototype.eq = function(num){
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
Base.prototype.extend = function(name,fn){
  Base.prototype[name] = fn;
}