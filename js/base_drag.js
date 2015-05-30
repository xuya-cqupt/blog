$().extend('drag',function(){
    var args = arguments;
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
         var flag = false;
         for(var j=0;j<args.length;j++){
            if(tag==args[j]){
             flag = true;
             break;
          }//for结束

         }//for结束
          if(flag){
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
);

