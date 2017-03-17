

var main = utils.getElementsByClass('class')[0];
var inner = utils.getElementsByClass('inner',main)[0];
var imgs = inner.getElementsByTagName('img');

var focus = utils.getElementsByClass('focus',main)[0];
var lis = focus.getElementsByTagName('li');

var left = utils.children(main,'a')[0];
var right = utils.getElementsByClass('right',main)[0];

var xhr = new XMLHttpRequest();
xhr.open('get','data.txt?_='+Math.random(),false);//不一定是下划线 因为每次都会有本地缓存，所以需要加一个循环小数，需要每次拿到的都是最新的
xhr.onreadystatechange = function (){
    if(xhr.readyState ==4&&xhr.status==200){
        data = uitls.jsonParse(xhr.responseText)
    }
}
xhr.send()
console.log(data)

var winWidth = utils.win('clientWidth');
if(data&&data.length){
    for(var i=0;i<data.length;i++){
        var str ='';
        var str1 ='';
        str+= '<div><img src="" real ="'+data[i].src+'"alt=""></div>';
        str1+= i==0?'<li class="cur"></li>':'<li></li>';
    }
    str+= '<div><img src="" real ="'+data[0].src+'"alt=""></div>'
    utils.css(inner,'width',(data.length+1)*winWidth);
    inner.innerHTML = str;
    focus.innerHTML = str1;//需要先让页面生效，再给imgs的宽度
    for(var i=0;i<imgs.length;i++){
        utils.css(imgs[i].parentNode,'width',winWidth)
    }
}

//图片有效性验证

    for(var i=0;i<imgs.length;i++) {
        (function (k) {
            var tempImg = document.createElement('img');
            tempImg.src = imgs[k].getAttribute('real');
            tempImg.onload = function () {//监听一个事件通过onload
                imgs[k].src = this.src;
                animate({
                    ele: inner,
                    target: {
                        opacity: 1
                    },
                    duration: 300
                })
            }
        })(i)
    }

var index = 0;
var timer =window.setInterval(autoMove,2000);
function autoMove (){
    index ++;
    if(index ==data.length +1){
        utils.css(inner,'left',0);
        index=1
    }
    animate({
        ele:inner,
        target:{
            left:-index*winWidth
        },
        duration:500//多长时间博一张，需要大于要多长时间
    })
    focusAlign()
}

function focusAlign(){
    var tempIndex = index==data.length ?0:index;
    for(var i=0;i<lis.length;i++){
        lis[i].className = tempIndex==i?'cur':'';
    }
}

main.onmouseover =function (){
    window.clearInterval(timer);
    left.style.display =right.style.display ='block';
}
main.onmouseout= function (){
    timer = window.setInterval(autoMove,2000);
    left.style.display = right.style.display ='none';
}

left.onclick = function (){
    var winWidth = utils.win('clientWidth');
    index--
    if(index ==-1){
        utils.css(inner,'left',-data.length*winWidth);
        index = data.length-1
    }
    animate({
        ele:inner,
        target:{
            left:-index*winWidth
        }
    })
    focusAlign()
}
right.onclick =  autoMove()

for(var i=0;i<lis.length;i++){
    var cur = lis[i];
    cur.index = i
    cur.onclick = function (){
        index = this.index;//前面是变量，后面是属性
        animate({
                ele:inner,
                target:{
                    left:-index*winWidth
                },
                duration:500
        })
        focusAlign()

    }
}


