/**
 * Created by Administrator on 2017/4/1.
 */


;(function (){
    function on (ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn)
        }else{
            if(!ele['handler'+type]){
                ele['handler'+type]=[]
                ele.attachEvent('on'+type,function (){
                    run.call(ele)
                })
            }

            var a = ele['handler'+type]
            if(a&&a.length){
                for(var i=0;i<a.length;i++){
                    if(a[i]===fn) return
                }
                a.push(fn)
            }
        }
 }
 function run(){
        var e = window.event;
        e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
        e.pageY = (document.documentElement.scrollTop|| document.body.scrollTop)+e.clientX;
        e.target = e.srcElement;
        e.preventDefault = function (){returnValue =false};
        e.stoppropagetion= function (){cancelBubble=true};
        var a = this['handler'+e.type];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof a[i] ==='function'){
                    a[i].call(this,e)
                }else{
                    a.splice(i,1)
                    i--
                }
            }
        }
 }

 function off(ele,type,fn){
     if(ele.removeListener){
         ele.removeListener(type,fn)
     }else{
         var a = ele['handler'+type]
         if(a&&a.length){
             for(var i=0;i<length;i++){
                 if(a[i]===fn){
                     a[i]=null;
                     break
                 }
             }
         }
     }

 }

 function bind(fn,context){
     return function (e){
         fn.call(context,e)
     }
 }

window.on =on
window.off =off


})()