/*
 *   clientWidth clientHeight clientLeft clientTop
 *   offsetWidth offsetHeight offsetLeft offsetTop offsetParent
 *   scrollWidth scrollHeight scrollLeft scrollTop
 * */



/////////////////////////////////////////////////////////////////
var utils = (function () {

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

    function offset(ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            l += par.clientLeft + par.offsetLeft;
            t += par.clientTop + par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}; // top不能作为全局变量
    }

    function win(attr, val) {
        if (typeof val != 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    function getCss(ele, attr) {
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele)[attr];
        } else { // ie
            if (attr == 'opacity') {
                val = ele.currentStyle.filter; // alpha(opacity=55.5)  \d+
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        // 100px -100px 100.5px  "1"
        var reg = /^-?\d+(\.\d+)?(px)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(ele, attr, val) {
        if (attr == 'opacity') {
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr == 'float') {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val; // ieLow
            return;
        }
        var reg = /width|height|top|left|right|bottom|(margin|padding)(Left|Right|Top|Bottom)?/;
        if (reg.test(attr)) { // 如果验证属性名字通过，就是来设置width等属性
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        ele.style[attr] = val;
    }

    function getElesByClass(className, context) {//context范围、上下文  就的document
        context = context || document  //如果有传值就用传的值，如果没有传值就用document，给context一个默认值
        if (context.getElementsByClassName) {//高版本用的，如果没问题就直接拿取
            return context.getElementsByClassName(className)
        }
        ;//这个是高版本的，低版本不兼容此方法运行以下代码
        //for is low
        //去掉收尾空格，并且把类字符串拆分成一个数组
        var classNameAry = className.replace((/(^ +| +$)/g), '').split(/ +/);//[a,b]
        var tags = context.getElementsByTagName('*');//获取context范围内所有的标签
        //过滤每一个tags，然后比较每一个tag的classname是否可以和classNameAry中对比上
        var ary = [];
        for (var i = 0; i < tags.length; i++) {//过滤每一个标签
            var curTag = tags[i];//每一个元素标签
            var isGoodTag = true;
            for (var j = 0; j < classNameAry.length; j++) {//循环类名字
                var curClass = classNameAry[i];//每一个必须包含的类   a,b
                //  就看curTag(当前正在过滤的元素)的classname上是否包含curclass
                var reg = new RegExp('(^| +)' + curClass + '( +|$)')//如果正则里面的有变量就需要用实例的方式创建并赛选
                if (reg.test(curTag.className)) {
                    //在所有传进来的类名中，只要有一个类名字在元素中没有，那么这个元素假设的条件就不成立，也没有必要继续去验证后面的类名字了
                    isGoodTag = false;
                    break
                }
            }
            if (isGoodTag) {
                ary.push(curTag)
            }
        }
        return ary
    }

    function getElesByClass1(className, context) {  //class=" ab win "
        context = context || document;//你要传了就用context，没有我就用document
        if (context.getElementsByClassName) {//如果你这个方法存在
            return listToArray(context.getElementsByClassName(className))//那就把值传进去，高版本结束
        }
        // low ie
        var classNameAry = className.replace(/(^ +| +&)/g, "").split(/ +/);//不管你首尾是否有空格，我用空字符串给替换掉，然后字符串中有一个空格也替换成','  ，先replace去掉前后的空格，然后再将字符串中的空格变成','变成{ab,win}
        var tags = context.getElementsByTagName('*');//在这个范围下的拿到每一个标签元素，一个类数组所有的标签元素
        var ary = [];//添加一个数组容器
        // var isGoodTag = true;//假设一个标签为真。后期可以写
        for (var i = 0; i < tags.length; i++) {
            var curTag = tags[i];//将每一对的标签元素都赋值给这个变量
            var isGoodTag = true;//这是一个假设，以后用假设的还比较多
            for (var j = 0; j < classNameAry.length; j++) {//循环字符串中每一个类名
                var curClass = classNameAry[j];//每一个类名都赋值给一个变量
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');//这个其实就是创建一个正则，但是因为正则里面是一个变量，所以需要用实例的方式创建他；没有办法验证，就需要用正则去验证
                if (!reg.test(curTag.className)) {// 用标签的每一个类名去验证正则的规则，
                    isGoodTag = false;//如果匹配成功，就让这个属性为假，
                    break
                }
            }//循环拆分后数组的每一项

            isGoodTag && ary.push(curTag)//如果他为真，这个其实就是if条件，前面的为真，后面的执行。
        }
        return ary;
    }

    return {
        listToArray: listToArray,
        offset: offset,
        win: win,
        jsonParse: jsonParse,
        getCss: getCss,
        setCss: setCss,
        getElesByClass: getElesByClass

    };
})();

