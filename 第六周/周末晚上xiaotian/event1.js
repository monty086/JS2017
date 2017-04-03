;(function (){
    function on(ele,type,fn){  //on把所有的兼容问题解决  用on方法取代addEventlister
        if(ele.addEventListener){//这个是标准浏览器的话，就用这个方法
            ele.addEventListener(type,fn);
        }else{//如果是ie版本的话，就用这个方法，但是ie有this ，顺序，好多问题，我不用ie的机制，用我们自己的机制
            if(!ele['AAA'+type]){//如果程序池不存在  就创建一个，如果存在就不用创建
                ele['AAA'+type] = [];//创建一个事件池，程序池  在数组里保存的时候，清单顺序重新梳理一下，
                ele.attachEvent('on'+type,bind(run,ele));
            }
            var a = ele['AAA'+type];//程序池名太长  赋值给a
            for(var i = 0; i < a.length; i++){
                if(a[i] === fn){//如果原来绑定过这个方法，则停止执行
                    return;//如果原来有这个函数，就停止添加到程序池里
                }
            }
            a.push(fn);// 将程序放到程序池里面
        }
    }
    function run(e){
        e = window.event;
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function (){ e.returnValue = false; }
        e.stopPropagation = function (){ e.cancelBubble = true; }

        var a = this['AAA'+e.type];
        if(a){
            for(var i = 0; i < a.length; i++){
                if( typeof a[i] == 'function'){
                    a[i].call(this,e);
                }else{ // null 如果不是函数就是null，那么在执行的时候就可以删除掉
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }
    function off(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else{
            var a = ele['AAA'+type];
            if(a && a.length){
                // 遍历数组中的没一个函数，只要和当前要移除的函数相同那么就从数组中删除
                for(var i = 0; i < a.length; i++){
                    if(a[i] === fn){
                        //a.splice(i,1);
                        a[i] = null;
                        break;
                    }
                }
            }
        }
    }

    //bind(run,ele);

    function bind(fn,context){ // 处理this  处理的bind的兼容问题
        return function(e){
            fn.call(context,e);
        }
    }

    // function (){ // bind
    //     run.call(ele); // run的this处理成ele => 把run方法包装一个匿名函数，真正绑定的是匿名函数。
    // }

    window.on = on;
    window.off = off;
    window.bind = bind
})();

Element.prototype.on = function (type,fn){
    // this => ele div1
    return this; // 链式写法  函数执行结束之后留下当前类实例
}

// HTMLDivElement => HTMLElement => Element => Node

//div1.on('click',fn1)/*这个on方法执行结束仍然留下div1*/.on('click',fn2)


