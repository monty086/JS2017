/**
 * Created by Administrator on 2017/3/12.
 * author:yuanmeng  qq:372909885
 */
var newsList = document.querySelector('.newsList');
var imgs = newsList.getElementsByTagName('img');

//ajax
var data = null
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = utils.jsonParse(xhr.responseText)
        }
    }
    xhr.send()
})()
console.log(data);



;(function () {
    if (data && data.length) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += '<li>';
            str += '<div><img src="" real="' + curData.src + '"></div>';
            str += '<div><h3>'+curData.title+'</h3><p>'+curData.desc+'</p></div>';
            str += '</li>'
        }
        newsList.innerHTML=str;
    }
})();

//  延迟加载
function imgsDelayLoad(){
    for(var i=0;i<imgs.length;i++){
        if(imgs[i].isloaded){
            continue;//当前图片不加载，下一次要继续
        }
        // var cur = img[i];
        var _a = utils.win('clientHeight')+utils.win('scrollTop');
        var _b = imgs[i].parentNode.offsetHeight+utils.offset(imgs[i].parentNode).top;
        if(_a>_b){//正在循环的这个图片已经进入到窗口内
            //自定义属性配合绑定事件的元素使用
            var tempImg = new Image ();//创建一个图片格式，只有图片可以这样创建
            tempImg.index = i;
            tempImg.src = imgs[i].getAttribute('real')//加载图片真实资源
            tempImg.onload =function (){//循环中包的事件函数，那个元素操作事件函数，函数中的索引值就加给那个绑定的元素
                imgs[this.index].src = this.src;
                //让图片的透明度从0到1
                fadeIn(imgs[this.index]);
            }
            imgs[i].isloaded=true
        }
    }
}
imgsDelayLoad();
window.onscroll = imgsDelayLoad;//滚动条滚动执行这个窗口
function fadeIn(ele){
    ele.timer && window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function (){
        var opa = utils.css(ele,'opacity');
        if(opa>=1){
            window.clearInterval(ele.timer);
            return
        }
        opa+=0.01;
        utils.css(ele,'opacity',opa);
    },10)

}