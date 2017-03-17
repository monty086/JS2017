/**
 *
 */
//获取元素
var main = utils.getElementsByClass('main')[0];
var inner = utils.getElementsByClass('inner',main)[0];
var imgs =  inner.getElementsByTagName('img');

var focus = utils.getElementsByClass('focus')[0];
var lis = focus.getElementsByTagName('li');
var left = utils.children(main,'a')[0];
var right = utils.children(main,'a')[1];

//获取数据

var data = null
;(function (){
    var xhr= new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState==4 && xhr.status==200){
            window.data = JSON.parse(xhr.responseText)
        }
    }
    xhr.send();
})()
console.log(data)

//将data绑定到页面上
if(data&&data.length){
    var str='';
    var str1='';
    for(var i=0;i<data.length;i++){
        str+='<div><img src="" real = "'+data[i].src+'"></div>';
        str1+= i==0? '<li class="cur"></li>':'<li></li>';
    }
        str+='<div><img src="" real = "'+data[0].src+'"></div>';//为了保证无缝轮播，在末尾增加第一张图片。
        var winWidth = utils.win('clientWidth');//窗口高度
        utils.css(inner,'width',winWidth*(data.length+1));//修改包含所有图片的inner 的总宽度，覆盖整个inner宽度的400%
        inner.innerHTML = str;
        focus.innerHTML = str1;
        //重新设置每一张图片的宽度
        for(var i=0;i<imgs.length;i++){
            utils.css(imgs[i].parentNode,'width',winWidth);//把css里面的div的宽度的25%给覆盖了,将div的宽度设置为屏幕的宽度

    }
}

//验证图片有效性
;(function (){
    for(var i=0;i<imgs.length;i++){
        // if(cur.isloaded){
        //     return;
        // }
        (function (i){//外面包的自执行函数，想让外面循环传进去来的i变成一个自执行函数的私有属性，因为自执行函数每次执行的时候都会形成一个私有作用域，每次循环i都会变化，每次都会形成一个私有作用域，每个作用域里面的i的值都不会受到影响。
            var cur = imgs[i];
            var tempImp = document.createElement('img');
            tempImp.src = cur.getAttribute('real');
            //tempImp[i].index = i 要这是自定义属性，必须要给谁绑定事件函数 ，就给谁加自定义属性
            tempImp.onload = function(){
                cur.src = this.src;//循环中的cur=imgs[i]中的i因为在在循环中的函数，i肯定会发生变化，cur中的i去外面寻找的时候，i已经循环成最大值，这里会有异步的情况发生。异步主要有：ajax，事件函数，定时器，回调函数
                animate({//让动画执行透明度淡入淡出的效果
                    ele:cur,//元素为每张图片
                    target:{
                        opacity:1//透明度的最大值为1
                    },
                    duration:300//时间为300ms
                });  };
            // cur.isloaded = true
        })(i);//自执行函数中必须穿循环中的变量
    }
})();


//开始轮播
var index = 0;//index设置index的索引为0
var timer = window.setInterval(autoMove,2000);//每2秒执行一次这个函数
function autoMove() {//轮播的函数
    var winWidth = utils.win('clientWidth');//获取窗口的高度
    index++;//因为每次都需要索引增加所以需要++
    if(index == data.length+1){//这个是动画已经执行了，然后加上判断条件。这时候我们只需要控制索引就可以改变图片的位置，就是当index为data的length+1是固定的时候，（data的长度是固定的，index为一个一直加1的数字），index等到超出data长度第一张图的时候，，我们需要把当前这张图直接替换成第一张图，速度很快
        utils.css(inner,'left',0);//我们让窗口的left值回到最初的开始
        index = 1;//让index的索引为1
    }
    animate({//执行动画，首先我需要每次换一张图片的方法是，让left的值每次都是-索引*窗口的高度，第二张图片的索引是-1*1000.left的值就是 -1000，就会让整个盒子inner向左移动-1000px
        ele:inner,
        target:{
            left:-index * winWidth//让这个元素动画执行的左边的宽度为这个-1000.-2000这样的一个数字
        },
        duration:500
    });
    focusAlign()//这个函数的目的是让图片和底部的焦点一一对应
}


//让底部焦点与轮播图对应上
function focusAlign(){
    var tempIndex = index==data.length? 0:index;//如果index(当前播放到第几张)的值是最后一张，
    for(var i=0;i<lis.length;i++){
        //每次轮播一张图之后，都要便利li，和index的值对应的li添加cur，否则移除
        lis[i].className = i==tempIndex? 'cur':'';//便利每一个小圆点，如果每一次的循环变量和索引一一对应，就把它的类名变成cur，否则就为空字符串。不操作。
    }
}


//鼠标滑过，停止轮播，显示左右按钮
main.onmouseover = function (){//
    window.clearInterval(timer);//鼠标滑过，轮播图暂停
    utils.css(left,'display','block');//设置left和right的css属性display为显示
    utils.css(right,'display','block')
};


//鼠标移开，轮播开始，消失左右按钮
main.onmouseout = function (){
    timer = window.setInterval(autoMove,2000);//为啥要赋值给timer？因为上面鼠标滑过的时候，还需要再次清除他，如果没有timer的话，下次就不能够清除这个定时器了
    left.style.display=right.style.display = 'none';//设置left和right的行内样式为隐藏
};


//给左右按钮绑定点击事件
left.onclick = function (){//给左按钮添加点击事件
    var winWidth = utils.win('clientWidth');
    index--;//因为要控制index，所以要设置index--，让图片从左边开始开始轮播
    if(index ==-1){//条件：当index为-1的时候，就是超出inner左侧第一张的时候，
        utils.css(inner,{left:-data.length*winWidth});//设置inner的css样式，data的长度现在为4*1000，位inner的最后一张图
        index = data.length-1;//当index为-1时赋值为3，所以index的值只有3,2,1,0,3这几个数，
    }
    animate({//这个是index--的时候，执行的动画效果，
        ele:inner,
        target:{
            left:-index*winWidth//此时的index为3000，index为2的时候，left为2000的距离
        },
        duration:300
    })
    focusAlign()//当图片轮播的时候，必须这个这个函数，让小圆点和图片轮播一一对应
};
//给右按钮绑定点击事件
right.onclick = autoMove;

//点击下面的小图标切换图片
;(function (){
    for(var i=0;i<lis.length;i++){//循环每一个小圆点
        lis[i].index = i;
        lis[i].onclick = function(){//当小圆点点击时
            var winWidth = utils.win('clientWidth');
            index = this.index;//当前点击的index值，就是图片滚动的值，赋值给index，例如当i值为0时，index为0
            animate({//执行动画
                ele:inner,//是这个大图片的元素
                target:{
                    left:-index*winWidth//index为i值，i始终为0,1,2,3 这几个数，所以大图片的left距离始终在0到-3000之间进行切换，每次变换i值的时候，对应的都是哪个索引的距离，索引为3的时候，为-3000的位置。0是第一张图的位置，-3000为第四张图的位置
                },
                duration:500
            })
            focusAlign()//让底部的焦点对应所在轮播图的下面
        }
    }
})()
