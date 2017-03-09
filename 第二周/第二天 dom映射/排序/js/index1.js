/**
 * Created by Administrator on 2017/3/2.
 */

var product = document.getElementById('product');
var nav = product.getElementsByClassName('nav')[0];
var span = nav.getElementsByTagName('span');

var ul = product.getElementsByTagName('ul')[0];
var lis = ul.getElementsByTagName('li');//DOM映射

//ajax
var data = null
    ;
(function () {
    var xhr = new XMLHttpRequest();//这个类的一个实例
    xhr.open('get', 'data.txt', false);//同步是你把数据拿过来我再做什么
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //代表成功获取到
            data = JSON.parse(xhr.responseText)//存到了这里
        }

    }
    xhr.send(null)
})()
console.log(data);
//绑定数据
// <!--<li>-->
// <!--<div><img src="images/phone1.jpg" alt=""></div>-->
//     <!--<p class="price">￥9888</p>-->
//     <!--<p class="commit"><i>300</i>人评论</p>-->
//     <!--</li>-->
;(function () {
    if (data && data.length) {//data存在并且length也存在
        //date:[{"src":"images/phone1.jpg","price":88,"comment":12}]
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<li price="' + data[i].price + '" comment="' + data[i].comment + '">';
            str += '<div><img src="' + data[i].src + '"></div>';
            str += '<p class="price"><i>￥</i>' + data[i].price + '</p>';
            str += '<p class="commit"><i>' + data[i].comment + '</i>人评论</p>';
            str += '</li>';
        }
        ul.innerHTML = str
    }
})()

//绑定事件
//var ent = "onclick"['onclick']
for (var i = 0; i < span.length; i++) {
    span[i].sortFlag = -1
    span[i].onclick = function () {
        // alert()
        // this.getAttribute('btn');
        //排序
        // this
        productSort.call(this)

    }
}
function productSort() {
    //把lis转化成数组
    // var value = this.getAttribute('btn')
    var lisAry = utils.listToArray(lis);
    // console.log(lisAry)
    var that = this;
    that.sortFlag *= -1;
    // console.log(that.sortFlag);
    lisAry.sort(function (li1, li2) {
        return (li1.getAttribute(that.getAttribute('btn')) - li2.getAttribute(that.getAttribute('btn'))) * that.sortFlag;
    });


    var frg = document.createDocumentFragment();
    for (var i = 0; i < lisAry.length; i++) {
        frg.appendChild(lisAry[i])
    }
    ul.appendChild(frg);
    frg = null
}