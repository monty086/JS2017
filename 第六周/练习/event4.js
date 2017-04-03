;(function (){
    function on(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn)
        }else{
            if(!ele['AAA'+type]){
                ele['AAA'+type]=[];
                ele.attachEvent(type,function(){
                    run.call(ele)
                })
            }
                var a = ele['AAA'+type];
                    for(var i=0;i<a.length;i++){
                        if(a[i]==fn)
                       return
                }

        }
    }

    function run(e){
        var a = ele['AAA'+e.type];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof a[i] =='function'){
                    a[i].call(this)
                }else{
                    a.splice(i,1);
                    i--
                }

            }
        }
    }
    function off(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn)
        }else{
            var a = ele['AAA'+type]
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
    window.on = on;
    window.off = off;
})()