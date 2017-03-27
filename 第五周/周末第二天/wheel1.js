/**
 * Created by shangqingwu on 2017/3/26.
 */
;(function () {
    function addWheelEventListener(ele, fn) {
        var handler = function (e) {
            e = e || window.event;
            var isDown = null;
            if (e.wheelDelta) { // chrome  IE
                isDown = e.wheelDelta < 0;
            } else {  //firefox
                isDown = e.detail > 0;
            }
            fn.call(ele, isDown, e);
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        };
        if (window.navigator.userAgent.toLowerCase().indexOf("firefox") == -1) { // chrome  IE
            ele.onmousewheel = handler;
        } else { //firefox
            ele.addEventListener("DOMMouseScroll", handler);
        }
    }

    window.addWheelEventListener = addWheelEventListener;
})();