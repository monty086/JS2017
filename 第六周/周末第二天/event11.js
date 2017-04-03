function on(ele, type, fn) {//订阅
    if(/^self/.test(type)){
        if(!ele['aSelf'+type]){
            ele['aSelf'+type]=[]
        }
        var a = ele['aSelf'+type]
        for(var i=0;i<a.length;i++){
            if(a[i]==fn){
                return
            }
        }
        a.push(fn)
    }

    if(ele.addEventListener){
        ele.addEventListener(type,fn)
    }else{
        if(!ele["handler"+type]){//自定义属性上存一个数组
            ele['handler'+type]=[];//前面是自定义了一个名，为了区分和系统的事件
            ele.attachEvent('on'+type,bind(run,ele))
        }
        var a = ele['handler'+type];

            // alert()
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    return
                }

        }

        a.push(fn)
    }

}
function run() {//通知发布
    var e = window.event;
    var type = e.type;
    e.target =e.srcElement;
    e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY = (document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.preventDefault= function (){e.returnValue=false};
    e.stopPropagation =function (){e.cancelBubble=true};
    var a = this['handler'+type];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            if(typeof a[i]=='function'){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--
            }
        }
    }
}
function off(ele, type, fn) {
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn)
    }else{
        var a = ele['handler'+type];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
}

function bind(fn,context) {
    return function (e) {
        fn.call(context,e)
    }
}

//先确定自定义事件的一些基本原则，确定每个funciton的事件类型，（其实事件类型就是一个行为的记号，标签、标识
// 符）
// 用'self drag start' 来标识拖开始
// 用'self drag ging' 来表示拖拽进行中
// 用