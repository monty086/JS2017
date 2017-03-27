
/**
 * Created by Administrator on 2017/3/26.
 */
;(function () {
    function on() {
        if(ele.addEventListener){
            ele.addEventListener()
        }else{

        }
    }
    function run(e) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.clientLeft|| document.body.clientLeft)
        e.pageY = e.clientY + (document.documentElement.clientTop|| document.body.clientTop);


        for(var i =0;i<a.length;i++){
            a[i]===fn
        }
    }
    function off(ele,type,fn) {
        if(ele.removeEventListener){
            ele.removeEventListener()
        }else{

        }
    }


})()