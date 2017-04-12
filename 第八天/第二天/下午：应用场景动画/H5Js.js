/**
 * Created by Administrator on 2017/4/12.
 */
~(function (desW) {
    var winW = document.documentElement.clientWidth,
        ratio = winW/desW;
    document.documentElement.style.fontSize = ratio*100+'px'
})(640);

var mySwiper = new Swiper(".swiper-container",{
    // setting 配置的参数/*选择器+配置*/
    direction:'vertical',//规定滑动方向：垂直方向；默认水平方向；
    loop:true,//无缝循环滚动
    onSlideChangeEnd:function (swiper) {
        //回调函数 从一个slide结束到另一个slide执行
        // swiper.activeIndex 获取当前滑块的索引值
        var slideAry = swiper.slides;//获取滑块总长度
        var curIndex = swiper.activeIndex;//获取滑块当前的 索引值
        var total=slideAry.length;
        // alert(curIndex)
        var targetId = 'page0';
        //让轮播图无缝循环起来（最后一张（4-4）等于第一张（4-2），第一张（4-1）等于最后一张（4-3），）
        switch(curIndex){
            case 0://第一一张
                targetId+=total-2; //让targetId变成length的长度-2，就是原来真长度的最后
                /*
                * 1.当索引为0的时候，就是第一张的时候
                * 2.让page（字符串拼接）+数组的倒数第二张的索引
                * */
                break;
            case total-1://当到达最后一张
                targetId+=1;
            /*
            * 1. 当索引为最后一张的时候，
            * 2. 让所以的值变成数组的第二张（索引为1的数组）
            * */
                break;
            default:
                targetId+=curIndex;
                /*其余情况，让索引值该等于几等于几
                * */
        }
        //循环类数组的每一项，
        [].forEach.call(slideAry,function (item,index) {/*回调函数*/
            /*
            * 1. slideAry为类数组，本身没有数组上的方法
            * 2. 利用数组中的方法forEach，（类数组上没有）
            * 3. 将数组中的call方法，改掉数组forEach中的this方法
            * 4. forEach中的回调函数方法，改变类数组中的每个个数和索引值
            * */
            if(curIndex===index){//让当前屏加上id   如果当前滑块的索引值为类数组的索引的时候
                item.id=targetId//让每个div的id=设定好的那个id值为这个类名#page01
            }else{
                item.id=null//其他的div让他的id=null
            }
        })

    }
});

//music 让音乐播放器有一个延迟的时间
var musicBox = document.querySelector('#musicBox');
var musicAudio = document.querySelector('#musicAudio');

window.setTimeout(function () {
    /*延迟多少秒之后让音乐播放器播放*/
    musicAudio.play();
    //通过事件监听，当播放器有了声音之后，让动画效果开始生效
    // musicBox.className="music";
    musicAudio.addEventListener('canplay',function (){
        musicBox.className="music musicMove"
    });
    /*canplay 如果能播放就给他执行函数*/
},1000);

musicBox.addEventListener('click',function () {
    if(musicAudio.paused){
        musicAudio.play();
            musicBox.className="music musicMove"
    }else{
        musicAudio.pause();
            musicBox.className="music"
        musicBox.style.opacity=1;
    }
});
