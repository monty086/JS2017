
;(function () {
    function addWheelEventListener (ele,fn){
        var handler = function (e) {
            e= e ||window.event;
            var isDown=null;
            if(e.wheelDelta){//ie chrome
                isDown = e.wheelDelta< 0  //down
            }else{//fireFox
                isDown = e.detail > 0 //down
            }
            fn.call(ele,isDown,e);

            e.preventDefault? e.preventDefault():e.returnValue =false;
        }


        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')==-1){
            ele.onmousewheel =handler;
        }else{
            ele.addEventListener('DOMMouseScroll',handler)
        }
    }
    window.addWheelEventListener = addWheelEventListener
})();

