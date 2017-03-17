/**
 * Created by Administrator on 2017/3/14.
 */

;(function (){
    function animate(opt){
        //ele:要运动的元素
        //target:到哪？可以设置一个数组
        //duration: 多长时间
        //callback:  回调函数  执行完还想干什么

        // time    begin  change  duration
        var ele = opt.ele;//必选
        var target = opt.target;
        var duration =opt.duration || 1000;  //默认值,穿了就用传了，没传用默认值
        var callback = opt.callback;

        var time = 0 ; //花费的 时间
        var begin = {};
        var change = {};

        for(var key in target){//根据目标值找起点
            begin[key] = utils.css(ele,key); //获取一个变量的值
            change[key] = target[key] - begin[key];//运动的距离，运动的那一段
        }
        var effect ={  //匀速运动只作为所有运动效果中的一款
            linear: function (t,b,c,d){
                return t/d*c+b
            }
        }
        window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function(){
            time +=10;
            if(time >=duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback =='function'){
                    callback.call(ele);
                }
                return
            }
            for(var key in change){
                if(change[key]){
                    var val = effect.linear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },10)
    }
    window.animate = animate;
})()


