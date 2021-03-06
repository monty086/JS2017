;(function (){
    function on(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn)
        }else{
            if(!ele['AAA'+type]){
                ele['AAA'+type]=[];
                ele.attachEvent('on'+type,function (){
                    run(ele)
                })
            }
            var a = ele['AAA'+type];
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    return;
                }
            }
            a.push(fn)
        }
    }

    function run (e){
        var a = this['AAA'+e.type];
        if(a&&a.length){
            for(var i=0;i<a.length;a++){
                if(typeof a[i] =='function'){
                    a[i] .call(this,e)
                }else{
                    a.splice(i,1)
                    i--
                }
            }
        }
    }

    function off(ele,type,fn){
        if(ele.removeEventListener){
           ele.removeEventListener(type,fn)
        }else{
            var a = ele['AAA'+type];
            if(a&&a.length){
                for(var i=0;i<length;i++){
                    if(a[i]=fn){
                        a[i]=null
                        break
                    }
                }
            }
        }
    }
    window.on =on;
    window.off = off;
})()
