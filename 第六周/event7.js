;(function (){
    function on(ele,type,fn){
        //如果是自己定义的事件就这样执行，并且不区分ie和chrome
        if(/^self/.test(type)){
            if(!ele['aSelf'+type]){
                ele['aSelf'+type]=[]
            }
            var a = ele['aSelf'+type];
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    return
                }
            }
            a.push(fn);
            return
        }
        //如果是系统的事件就这样执行
        if(ele.addEventListener){
            ele.addEventListener(type,fn)
        }else{
            if(!ele['AAA'+type]){
                ele['AAA'+type]=[]
                ele.attachEvent('on'+type,function (){
                    run.call(ele)
                })
            }
            var a = ele['AAA'+type]
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    return
                }
            }
            a.push(fn)
        }
    }
    function run(e){

        e = window.event;//run方法中需要处理鼠标事件的兼容性问题。
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function (){ e.returnValue = false; }
        e.stopPropagation = function (){ e.cancelBubble = true; }

        var a = this['AAA'+e.type]
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof a[i] =='function'){
                    a[i].call(this)
                }else{
                    a.splice(i,1)
                    i--
                }
            }
        }
    }

    function selfRun(selfType,event){//需要两个参数，selfType是自定义的时间类型，event是系统的事件对象

        //selfType 的值是 ：selfdragstart  selfdragging selfdragend

        var a = this['aSelf'+selfType];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof a[i] =='function'){
                    a[i].call(this,event)
                }else{
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }

    function off(ele,type,fn){
        if(/^self/.test(type)){
            if(!ele['aSelf'+type]){
                ele['aSelf'+type]=[]
            }
            var a = ele['aSelf'+type];
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    a[i]=null
                    return
                }
            }
        }

        if(ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else{
            var a = ele['AAA'+type];
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    a[i]=null;
                    break;
                }
            }


        }
    }

    window.on =on;
    window.off=off
    window.selfRun=selfRun;

})()
