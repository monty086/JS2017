var utils={
    listToArray:function(list){
        try{
            //把slice方法中的this修改成了list数组，因为slice中的this就都是克隆的那个数组，把this改成list后，就变成了克隆list并且返回，ie8以下都不兼容
           return Array.prototype.slice.call(list,0)//先尝试执行这里的代码，如果执行报错，执行catch里面的代码
        }catch(e){//catch里面的e是上面报错的话，下面的e可以打印出上面报什么错
            // console.log(e.massage)//e.massage保存着报错的信息 js中容错机制，（对错误的处理）其实就是把报错的信息，打印出来，没有红色的×了。
            var ary =[];
            for(var i=0;i<list.length;i++){
                ary.push(list[i])
            }
            return ary
var utils = {
    listToArray : function (list){
        try{
            return Array.prototype.slice.call(list,0);
        }catch(e){
            var ary = [];
            for(var i = 0; i < list.length; i++){
                ary.push(list[i]);
            }
            return ary;
        }
    }
};