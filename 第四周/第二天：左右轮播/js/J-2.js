

var main = utils.getElementsByClass('main')[0];
var inner = utils.getElementsByClass('inner',main)[0];
var imgs = inner.getElementsByTagName('img');

var focus = utils.getElementsByClass('focus',main)[0];
var lis = focus.getElementsByTagName('li');
var left = utils.children(main,'a')[0];
var right = utils.children(main,'a')[1];



var data= null;
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState==4&&xhr.status==200){
            window.data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send()
})()
console.log(data)

if(data&&data.length){
    var str ='';
    var str1 = '';
    for(var i=0;i<data.length;i++){
        str+='<div><img src = ""  real="'+data[i].src+'"></div>';
        str1+=i==0? '<li class="cur"></li>':'<li></li>';
    }

    var winWidth = utils.win('clientWidth');
    str+='<div><img src ="" real="'+data[0].src+'"></div>';
    utils.css(inner,'width',winWidth*(data.length+1));
    inner.innerHTML = str;
    focus.innerHTML = str1;
    for(var i=0;i<imgs.length;i++){
        utils.css(imgs[i].parentNode,'width',winWidth);
    }
}

;(function (){
    for(var i=0;i<imgs.length;i++){
        (function (index){
            var cur = imgs[index];
            var tempImg = document.createElement('img');
            tempImg.src = cur.getAttribute('real');
            tempImg.onload = function (){
                imgs[index].src = this.src;
                animate({
                    ele:cur,
                    target:{
                        opacity:1
                    },
                    duration:300
                })
            }
        })(i)
    }
})()



//开始轮播

var index = 0;
// var timer = window.setInterval(autoMove,2000);
function autoMove (){
    var winWidth = utils.win('clientWidth');
    index++;
    if(index==data.length+1){
        utils.css(inner,'left',0);
        index =1;
    }
    animate({
        ele:inner,
        target:{
            left:-index * winWidth
        },
        duration:500
    });
    focusAlign()
}

function focusAlign(){
    var tempIndex = index ==data.length?0:index;
    for(var i=0;i<lis.length;i++){
        lis[i].className = i==tempIndex?'cur':"";
    }
}

main.onmouseover= function (){
    window.clearInterval(timer);
    left.style.display =right.style.display='block'
}
main.onmouseout =function (){
    // timer = window.setInterval(autoMove,2000)
    left.style.display =right.style.display ='none';
}


left.onclick =function (){
    var winWidth = utils.win('clientWidth');
    index--;
    if(index == -1){
        utils.css(inner,{left:-data.length*winWidth});
        index =data.length-1;
    }
    animate({
        ele:inner,
        target:{
            left:-index*winWidth
        },
        duration:300
    })
    focusAlign()
}

right.onclick = autoMove;
;(function (){
    for(var i=0;i<lis.length;i++){
        lis[i].index =i;
        lis[i].onclick = function(){
            var winWidth = utils.win('clientWidth');
            index = this.index;
            animate({
                ele:inner,
                target:{
                    left:-index*winWidth
                },
                duration:500,
            })
            focusAlign()
        }
    }
})()
