/**
 * Created by Administrator on 2017/3/9.
 */
var main = utils.getElesByClass('main')[0];
var uls = main.getElementsByTagName('ul');
var imgs = main.getElementsByTagName('img');
var ulsAry = utils.listToArray(uls);//将uls这个类数组转换成数组，调用数组的方法

//ajax监听数据
var data = null;
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);//?是条件，前面地址是接口和参数，用？隔开，参数和参数用&隔开， 拼接字符串  在接口后面添加一个随机数是为了避免缓存问题，data里面不会按照顺序来抽取，其实就是一个缓存，后面定一个随机数的意义在于每次拿取的都是数据库里面最新的数据。不至于拿到数据库之前的一些缓存。
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send()
})();
console.log(data);


//绑定数据，并输出到页面
bindData();//将设置好的li里面所包含的内容，都输出到高度最小的ul当中，循环50次，就是50张图片
function bindData(){
    if (data && data.length) {//如果data存在和data.length存在的话
        // alert()
        for (var i = 0; i < 50/*data.length*//*50*/; i++) {//一开始是循环data数据，data.length为条件，现在变成50个，
            // alert();
            var ran = Math.round(Math.random() * 14);//在我上传的14张图片中，随机取一个数

            var curData = data[/*i*/ran];//{src :url,title :标题}将data的随机索引进行排列，将data的随机数的数据复制给一个新的变量 curData

            var li = document.createElement('li');//创建一个li标签
            var img = document.createElement('img');//创建一个img的标签
            img.setAttribute('real',curData.src);//给img设置一组属性，属性名为real，属性值为curData.src的这个地址；给图片行内样式添加添加real自定义属性，用来图片延迟加载
            img.style.height = Math.round(Math.random() * (350 - 160) + 160) + 'px';
            //给img的高度设置一个随机值，这个随机值的范围在160-350之间，这个高度会根据图片的高度进行设置
            //img.src = curData.src;//看样式用的==删除==图片延迟加载

            // img.style.backgroundColor = 'url/(../images/qq.gif) no-repeat center';

            li.appendChild(img);//将img标签的内容（一个随机的高度+real的属性名，属性值为data里面的scr地址）添加到li里面
            var p = document.createElement('p');
            p.innerHTML = curData.title;//p标签内容显示每一组数据的title
            li.appendChild(p);//将p标签的内容添加到li标签里面
            var a = document.createElement('a');
            a.innerHTML = '采集';//a标签的内容显示采集
            a.href = 'javascript:void 0';//a标签的href为空
            li.appendChild(a);//再把a标签放到li里面
            //要吧这个li连带的子元素添加给高度最小的li
            //先找到那个高度最小的ul==排序===按照高度排序

            //此时的li已经包含img标签（img的随机高度+real的属性）+p标签（将curDate的title拿过来）+a标签（a里面有采集二字）
            ulsAry.sort(function (ul1, ul2) {
                return ul1.offsetHeight - ul2.offsetHeight;//这个是盒子模型的高度可以直接用，这种方式没有单位，按照ul1、2的高度进行排序，最小的索引为ulsAry[0]
            })
            ulsAry[0].appendChild(li)//将li标签及所有内容给排列后高度最小的那个ul

        }
    }
}


//图片延迟加载==》淡入==》多个单张图片延迟加载
//当窗口滚动条滚动的时候，执行图片过半加载==》验证有效==》淡入（透明度）
window.onscroll = function () {
    //滚动轮滚动的时候重新循环每一种图片，重新判断是否进入到窗口内
    imgload()//执行这个函数
    //在距离底部还有1000px的时候，然后在
    var winScrollTop = utils.win('scrollTop');//窗口的滚动高度
    var pageHeight = document.body.scrollHeight;//body的整个高度（上padding+内容高度+溢出的高度）
    if (winScrollTop > pageHeight - 1000) {//当窗口的滚动高度大于页面-1000的高度，此时的可视窗口停留在尾部1000像素顶部，只要再往下一拉就执行下面个函数，
        bindData();//当滚动条开始滚动并且窗口在底部1000的框里之后，将图片从高度最小的ul开始排列，循环50次，再累加50张图片，上面循环50张图片
    }
}
//判断图片加载的时间，如果图片露头一半身的话，就开始执行下面checkImg（）这个函数。
imgload()//(循环每张图片，只要看到图片的一半，就开始验证这个图片有没有效（利用多一个太监的原理来试验）如果有效呢，就淡入他。最后一个函数执行。)
function imgload() { //（上面的是只要看见图片的一半就执行这个函数）
    for (var i = 0; i < imgs.length; i++) {//循环每一张图片
        var curImg = imgs[i];//加一个变量给他
        // if(curImg.isLoaded){
        //     continue
        // }
        //立刻判断这个curImg是否完全进入到窗口内
        var _a = utils.win('clientHeight') + utils.win('scrollTop');//设置一个变量_a为可视窗口的高度和窗口滚动过后的距离
        var _b = curImg.offsetHeight / 2 + utils.offset(curImg).top;//设置一个变量_b为循环的每一张图片的整体高度和每一张图片相对于body的上偏移量；其实就是body最顶部到图片最下面的距离。
        if (_a > _b) {//这个其实很好理解，a的距离就是可视窗口的高度+滚动后的高度，b的距离就是图片的高度，加上图片到body顶部的高度，如果图片高度/2的话，就意味着，只要图片刚超过一半的时候，就执行if条件的判断语句。（条件成立，说明这个图片已经进去到窗口呢）
            //我需要把real这个值赋值给src，但是在赋值之前检查资源的有效性
            checkImg(curImg);//执行这个函数，传的值是图片；符合进入窗口条件的图片做有效性验证
        }
    }
}


//验证图片有效性(把图片给其他的元素先加载，加载成功在给真实元素，加载过程需遵循淡入淡出)
function checkImg(img) {//（传一个图片进去）
    if (img.isLoaded) {//这个是假设条件。判断img的这个属性是否为真，如为真，就return出这个函数。
        return;//跟监听事件比较相识
    }
    //形参就是 等待验证的图片==》页面内所有图片中imgs中的imgs[i]
    var tempImp = document.createElement('img');//创建一个临时的图片
    tempImp.src = img.getAttribute('real')//加载真实图片资源  获取行内样式real给临时图片（把原有图片的real的属性值给tempImp.src这个属性）
    tempImp.onload = function () {//出现onload说明加载成功，执行函数，临时图片加载真实图片成功，
        // alert()
        img.src = this.src;//把临时图片的图片地址给真实的图片地址==》把real的值赋值给src属性
        fadeIn(img)//淡入真实的图片
    }
    img.isLoaded = true;//只要加载过，那么这个图片无论成功还是失败都会增加一个属性值为真的isloaded属性，最上面的时候如果遇到加载成功，则不再继续加载
}

//图片淡入淡出（一开始图片透明度为0，持续累加到1）
function fadeIn(ele) {//opacity
    ele.timer && window.clearInterval(ele.timer);//清除上一轮的定时器，如果这个属性的定时器存在的话，就清除，如果第一个条件不满足，不存在的话，就不要清除。
    ele.timer = window.setInterval(function () {//执行定时器
        var opacity = utils.getCss(ele, 'opacity');//将元素的透明度赋值给变量
        if (opacity >= 1) {//如果不再透明，则清除当前定时器
            window.clearInterval(ele.timer);
            return;//并且执行结束
        }
        opacity += 0.01;//如果没有到透明度的最大值，则继续透明度累加0.01
        utils.setCss(ele, 'opacity', opacity)//并且将累加后的透明度的值，设置给当前元素的透明度属性。
    }, 10)
}
