

var utils = (function (){

    function listToArray(likeAry) {
        try {
            return Array.prototype.slice.call(likeAry, 0);
        } catch (e) { // e.message
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
            return ary;
        }
    }

    var isStanderBrowser = !!window.getComputedStyle; //
    function win(attr,val){
        if(typeof val == 'undefined'){
            return document.documentElement[attr] || document.body[attr];
        }
        // scrollTop和scrollLeft生效
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    function getCss(ele,attr){
        var val = null;
        if(window.getComputedStyle){ // 标准
            val = window.getComputedStyle(ele,null)[attr];
        }else{ // ie8-
            // 处理透明度
            if(attr == 'opacity'){
                val = ele.currentStyle.filter; // alpha(opacity=50.5)
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
            }else{
                val = ele.currentStyle[attr];
            }
        }
        //  100px -1000px -100.50px '1' 'block'
        var reg = /^-?\d+(\.\d+)?(px)?$/; // 处理单位
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(/*ele,*/ele,attr,val){
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity='+ val*100 +')';
            return;
        }
        if(attr == 'float'){
            ele.style.cssFloat = val;
            ele.style.styleFloat = val; // ie
            return;
        }
        // width, height, left top right bottom margin padding marginLeft ...
        var reg = /width|height|left|top|right|bottom|(margin|padding)(Left|Right|Top|Bottom)?/;
        //reg.test(attr) ? !isNaN(val)? val += 'px' : void 0 : void 0;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val += 'px';
            }
        }
        ele.style[attr] = val;
    }

    function setGroupCss(ele,group){ // => {}
        if(Object.prototype.toString.call(group) == '[object Object]'){
            for(var key in group){
                // key : width, height, background ...
                // val : group[key]
                setCss(ele,key,group[key]);
            }
        }
    }

    function css(ele){
        var secondParam = arguments[1];
        var thirdParam = arguments[2];
        if(typeof secondParam == 'string'){ // setCss getCss
            if(typeof thirdParam == 'undefined'){ // getCss
                return getCss(ele,secondParam);
            }
            setCss/*.call*/(ele,secondParam,thirdParam);
        }
        // setGroupCss
        secondParam = secondParam || [];
        if(secondParam.toString() == '[object Object]'){
            setGroupCss(ele,secondParam);
        }
    }

    function getRandom(n,m){
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        return Math.round(Math.random()*(m-n)+n);
    }
    return {
        // 如果想用这个函数
        win : win,
        css : css,
        getRandom:getRandom,
        listToArray:listToArray,

    };
})();










