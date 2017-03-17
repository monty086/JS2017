/**
 *
 *
 *
 * Created by Administrator on 2017/3/15.
 */

;(function (){
    function animate (opt){
        var ele = opt.ele;
        var target = opt.target;
        var duration = opt.duration || 1000;
        var callback = opt.callback;

        var time = 0;
        var begin = {};
        var change = {};
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        var effect = {
            linear : function (t,b,c,d){
                return t/d*c+b
            }
        };
//以上准备工作完事

//开始定时器
        ele.timer && window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function (){
            time += 10;
            if(time>=duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback == 'function'){
                    callback.call(ele);
                }
                return
            }
            for(var key in change ){
                if(change[key]){
                    var val = effect.linear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },10);
        window.animate = animate;
    }
})()

