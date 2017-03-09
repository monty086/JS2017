/**
 * Created by Administrator on 2017/3/8.
 */
/*
*
*
*
*
*
* */

//两种方式使用作用域的方式，

~(function utils (){
    function win (attr,val){//传2个值，一个是属性名，一个是传的值
        if(typeof val=='undefined'){//检测有没有传值
            return document.documentElement[attr] || document.body[attr];//如果有传值，就获取到窗口滚动出去的高度
        }
        document.documentElement[attr]=val;
        document.body[attr]=val;
    }






    return {
        setCss : setCss,
        getCss : getCss,
        win: win,

    }
})()