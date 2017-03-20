/**
 * Created by Administrator on 2017/3/19.
 */

var $banner = $('.banner');
var $inner = $banner.find('.inner');
var $ul = $banner.find('ul');
var $left = $banner.children('.left');
var $right = $banner.children('.right');
//以上元素都存在
// var $imgs = $inner.find('img');
// var $lis = $ul.find('li');
//以上元素都不存在  jq对于不存在的元素不用提前获取

var data = null;
$.ajax({
    type:'get',
    url:'data.txt',
    async:false,
    cache:false,
    dataType:'json',//不写这个会返回字符串，写了返回数组
    success:function (res){
        data = res
    }
})
console.log(data);

;(function (){
    if(data&&data.length){
        var str = '';
        var str1 = '';
        $.each(data,function(index,item){
            str+='<img src="" real="'+item.src+'">';
            str1+= index==0? '<li class="cur"></li>':'<li></li>';//单独处理选中的li
        })
        $inner.html(str);
        $ul.html(str1);
    }
})()

//验证图片有效性 --假太监 ==>遍历每一张图片，只要资源real没有问题那么就把real的值赋值给图片src上
//jQuery对于不存在的dom元素的获取没有映射关系，对于不存在的元素不用提前获取
var $imgs = $inner.find('img');
var $lis = $ul.find('li');

//$.each($imgs,function)
$imgs.each(function(index,item){
    //循环要操作  item就是每一张图片，index是每张图片的索引
    var $tempImg = $('<img>');
    $tempImg.prop('src',$(item).attr('real'));
    $tempImg.on('load',function(){
        $(item).prop('src',$(this).prop('src'))
        if(index==0){
            $(item).css('zIndex',1).stop().animate({opacity:1},300);
        }
    })
});

//轮播开始
//默认第一张
//执行一次，下一张图片显示
var index = 0;
var timer = window.setInterval(autoMove,2000);
function autoMove () {
    index++;//累加之后的index的值就是下一次哪一张图片出现的索引
    if(index==data.length){
        index =0;
    }
    setImg();//根据index的值，显示对应的图片。
}

function setImg (){//负责让哪一张图片出现、imgs的索引和index相同的哪一张
    //循环所有的图片，索引值和全局index相等
    $imgs.each(function(imgindex,img){
        if(imgindex==index){
            $(this).css('zIndex',1).stop().animate({opacity:1},300,function(){
                //当前和index相等的这一张图片提高层级并且动画到1之后，还要除了当前这一张的其他所有图片的透明度都设置成0，保证下一次动画任然是有淡入效果。
                $(this).siblings().css('opacity',0);
            })
        }else{
            $(img).css('zIndex',0);
        }
    })
    $lis.each(function(liindex,li){
        liindex==index? $(li).addClass('cur'):$(this).removeClass('cur');
    })
}

$banner.on('mouseover',function(){
    window.clearInterval(timer);
    $left.css('display','block');
    $right.css('display','block');
}).mouseout(function(){
    timer =window.setInterval(autoMove,2000);
    $left.css('display','none');
    $right.css('display','none');
});

$left.on('click',function(){
    index--;
    if(index==-1){
        index =data.length-1
    }
    setImg();
});
$right.on('click',autoMove);

$lis.each(function (liindex,li){
    $(li).click(function (){
        index=$(this).index();//把当前点击的li的索引值赋值给index，setimg方法根据index的值显示对应的图片
        setImg();
    })
})