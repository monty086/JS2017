/**
 * Created by Administrator on 2017/3/1.
 */
//alert()
//先获取要操作到的元素
var product = document.getElementById('product');//最外层
var nav = product.getElementsByClassName('nav')[0];
var btns = nav.getElementsByTagName('span');//评论和价格按钮

var productList = product.getElementsByTagName('ul')[0];//获取商品列表
var lis = productList.getElementsByTagName('li');//要排序的这些li

console.log(lis)//需要去后台获取数据，然后把获取回来的数据添加上去
//ajax
var date =null
;(function (){

    var xhr = new XMLHttpRequest();//创建一个异步对象（可以到这个类的原型中看能用多少方法，创建一个小兵到后台去拿数据。）
    xhr.open('get','data.txt',false);//描述的是方法：get方式，除了get还有post（让干什么，get是获取的意思）；接口：是地址，到哪里获取？？？；false：同步、异步。同步是你操作的时候我什么都不干就等你
// （fasle代表同步，（后台数据拿不来我就死等，不拿来不行）
// 异步就是，你干你的，我干我的，同步就是 ：你干你的，我得等着你和你同步一起，）
// 方法，地址（接口就是后台给的地址）data：数据，也就是一个数据文件

    xhr.onreadystatechange = function (){//只要有什么情况，即使发信息  状态改变怎么样 触发函数
        if(xhr.readyState == 4 && xhr.status == 200){ //当如果变成怎么样然后怎么样  相当于暗号
            //404 一般指的是页面不存在
            //500  服务端错误  数据库的错误
            //304  本地缓存
            //200  成功 以2开头的都是成功
            /* window.*/date = JSON.parse(xhr.responseText);//英文意思：响应文本。这个属性保存着从接口获取回来的数据 ，
        }
    };
    xhr.send(null);
    console.log(date);//我们已经成功获取到我们自己mock到假数据data了

})()

/*
* ajax:我们需要去拿一个东西，我们需要派一个人
*       1. new XMLHttpRequest()       超文本传输协议，，https加密
*       2. xhx.opent(get/post,url,ture/false)
*           get/post:请求方式  get在url上
*           url：接口（后台提供）
*           true/false：同步/异步
*
*       3.xhr.on readystate change  = function   当readystate改变触发
*            xhr.readyState ==4 代表xhr回来了&&
 *           xhr.status ==200  代表成功获取到数据
 *           xhr.responseText    属性存放着获取回来的数据
 *      4. xhr.send(null) 开始行动
*
*
* */
/*把获取到的数据添加到页面中            数据绑定
appendChild  动态添加的方式
innerHTML

 <div><img src="images/phone1.jpg" alt=""></div>
 <p class="price">￥9888</p>
 <p class="commit"><i>300</i>人评论</p>


*/
if(data&&data.length) {//如果date存在并且date.lenght也存在 if里面强制判断真假
    var str = ''
    for(var i=0;i<data.length;i++){
       var curData =data[i]
        str+='<li>'
        str+='<div><img src="'+curDate.src+'"></div>'
        str+='<p class="price"><i>￥</i>curDate.price</p>'
        str+='<p class="commit"><i>curDate.comment</i>人评论</p>'
        str+='</li>'
    }

}