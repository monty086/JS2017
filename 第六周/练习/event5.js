;(function () {
    function on(ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn);
        } else {
            if (!ele['BBB' + type]){
                ele['BBB' + type] = [];
                ele.attachEvent("on" + type, function (){
                    run.call(ele);
                });
            }
            var a = ele['BBB' + type];
            for (var i = 0; i < a.length; i++) {
                if (a[i] == fn) {
                    return
                }
            }
            a.push(fn)

        }
    }

    function run() {
        e = window.event;
        e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
        e.pageY= (document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
        e.target = e.srcElement;
        e.stoppropagetion= function (){cancelBubble = true};
        e.preventDefault = function (){returnValue = false};
        var a = this['BBB' + e.type];
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == 'function') {
                a[i].call(this,e)
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }

    function off(ele, type, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn)
        } else {
             var b = ele['BBB'+type];
            for (var i = 0; i < b.length; i++) {
                if (b[i] == fn) {
                    b[i] = null;
                    break
                }

            }
        }
    }

    window.on = on;
    window.off = off


})()
