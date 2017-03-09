/**
 * Created by Administrator on 2017/3/2.
 */
//获取要操作的元素先
var table = document.getElementById('table');
var tHead = table.tHead;//表格特殊的获取方式 表头
var tHeadRow = tHead.rows[0];//rows就是获取行的  tr
var tHeadThs = tHeadRow.cells;//cells就是单元格  列

var tBody = table.tBodies[0]; //所有tbody的第一个
var tBodyRows = tBody.rows; // 获取表格主题下所有的行，暂时没有


//ajax  分4步  async（异步） javascript and xml(数据格式)
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt', false);//中间的学名叫做接口，false代表同步，true代表异步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            window.data = JSON.parse(xhr.responseText)
        }
    };
    xhr.send()
})();
console.log(window.data);


//动态添加（数据库中的内容添加到页面中）
;(function () {
    if (window.data && window.data.length) {//如果data存在，并且data的长度也存在的话，
        var frg = document.createDocumentFragment()//创建一个文档碎片
        for (var i = 0; i < data.length; i++) {//将数据库中的每一项都添加到页面中
            //只要数组中有一项，那就创建一行
            //只要对象里有一组属性那么创建一个td
            var tr = document.createElement('tr');//创建一个动态元素
            for (var key in data[i]) {//循环数据中的每一项的属性
                var td = document.createElement('td')
                td.innerHTML = key == 'develop' ? data[i][key] ? '发达' : '发展中' : data[i][key];
                tr.appendChild(td);//这里面先把内容给td，然后因为tr包着td，所以再把td给tr，在把tr整个给frg
            }
            frg.appendChild(tr);
            // if(key=='develop'){
            //     if(data[i].develop==0){
            //         td.innerHTML='发展中'
            //     }else{
            //         td.innerHTML='发达'
            //     }
            // }else{
            //     td.innerHTML=data[i][key]
            // }
        }
        tBody.appendChild(frg);
        frg = null
    }
})();


//隔行变色
function changeBg() {
    for (var i = 0; i < tBodyRows.length; i++) {
        tBodyRows[i].className = i%2 ? 'c0' : 'c1';
        // tBodyRows[i].className = 'c' + i%2;
    }
}
changeBg();


//给表头列绑定点击事件
;(function bindEvent() {
    for (var i = 0; i < tHeadThs.length; i++) {
        tHeadThs[i].index = i//  给每一个表头都增加一个自定义属性，当点击事件发生的时刻，需要把这个自定义属性保存索引值，传给sort函数作为排序的依据
        tHeadThs[i].sortFlag = -1 //给每个表头增加自定义属性-1，用来作为排序切换
        if (tHeadThs[i].className == 'cursor') {
            tHeadThs[i].onclick = function () {
                sort.call(this, this.index);
                changeBg()
            }
        }
    } //排序：按照当前（this）点击的这一列去排序
    // sort()
})();


//sort就是负责排序
function sort(n) {
    //每次点击执行sort方法的时候，把除了正在点击的这一列的其他列全部恢复成-1
    for (var i = 0; i < tHeadThs.length; i++) {
        if (tHeadThs[i]!= this) {
            tHeadThs[i].sortFlag = -1
        }
    }
    var tBodyRowsAry = [].slice.call(tBodyRows);//只有转数组才有可能用到sort的方法，转出一个空的数组
    this.sortFlag *= -1;
    var that = this;
    tBodyRowsAry.sort(function (tr1, tr2) {
        var a = tr1.cells[/*n*/that.index].innerHTML;
        var b = tr2.cells[/*n*/that.index].innerHTML;
        if (isNaN(a) || isNaN(b)) {//不是一个有效数字返回true
            return (a.localeCompare(b)) * that.sortFlag;
        }
        return (a - b) * that.sortFlag;//是一个有效数字返回false
        // return tr1.cells[n].innerHTML-tr2.cells[n].innerHTML;//没两个相邻行的索引为2的列项
    });

    for (var i = 0; i < tBodyRowsAry.length; i++){
        tBody.appendChild(tBodyRowsAry[i]);
    }
}

/*innerHTML在JS是双向功能：获取对象的内容  或  向对象插入内容；
 如：<div id="aa">这是内容</div>   ，我们可以通过  document.getElementById('aa').innerHTML 来获取id为aa的对象的内嵌内容；
 也可以对某对象插入内容，如  document.getElementById('abc').innerHTML='这是被插入的内容';   这样就能向id为abc的对象插入内容。*/

