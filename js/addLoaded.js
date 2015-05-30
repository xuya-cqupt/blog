function addDomLoaded (fn) {
	if(document.addEventListener){
		addEvent(document,"DOMContentLoaded",function(){
			fn();
			removeEvent(document,"DOMContentLoaded",arguments.callee);
		});
	}else{
        var timer = null;
        timer = setInterval(function(){
        	
        });
	}
}