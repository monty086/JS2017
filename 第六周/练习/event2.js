
;(function (){
    function on(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener()
        }else{
            if(!ele['AAA'+type]){
                ele['AAA'+type] = []
                ele.attacheEvent('on'+type,function (){
                    run(ele)
                })
                var a = ele['AAA'+type];
                for(var i=0;i<a.length;i++){
                    if(a[i]==fn){
                        return
                    }
                }
                a.push(fn)
            }
        }
    }

    function run (e){
        e = e ||window.event;
        e.target = e.target || e.srcElement;
        e.pageX = e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)
        e.pageY = e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        e.preventDefault?e.preventDefault():e.cancelBubble = true;
        e.stopPropagation?e.stopPropagation():e.returnValue = false;
        var a = this['AAA'+e.type];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof a[i] == 'function'){
                    a[i].call(this,e)
                }else{
                    a.splice(i,1)
                    i--
                }
            }
        }
    }

    function off(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else{
            var a = ele['AAA'+type];
            if(a&&a.length){
                for(var i=0;i<a.length;i++){
                    if(a[i]== fn){
                        a[i] =null;
                        break
                    }
                }
            }
        }
    }
    window.on = on;
    window.off = off

})()