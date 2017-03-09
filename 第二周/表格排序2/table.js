/**
 * Created by Administrator on 2017/3/2.
 */
//获取要操作的元素
var table = document.getElementById('table');
var tHead = table.tHead;
var row = tHead.rows[0];
var ths = row.cells;

var tBody = table.tBodies[0];
var tBodyRows = tBody.rows;


//ajax引入数据
;(function () {//包一个自运行函数可以使函数里的变量安全，不被外界的全局属性所打扰
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            window.data = JSON.parse(xhr.responseText)
        }
    };
    xhr.send()
})();
console.log(window.data);


//把数据输出到页面中使用动态创建的方式，回头再用innerHTML的方式
;(function(){
if (window.data && window.data.length) {//定义在全局上
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        for (var key in data[i]) {
            var td = document.createElement('td');
            td.innerHTML = key == 'develop' ? data[i][key] ? '发达' : '发展中' : data[i][key];
            tr.appendChild(td);
        };
        frg.appendChild(tr);
        console.log(frg)
    }
    tBody.appendChild(frg);
    frg=null
}
})();

//隔行变色
function changebg (){
    for(var i=0;i<tBodyRows.length;i++){
    tBodyRows[i].className = i%2? 'c1':'c2';
    }
}
changebg();

//给表头添加点击事件

for(var i=0;i<ths.length;i++){
    ths[i].index=i;
    ths[i].flag=-1;
    if(ths[i].className=='cursor'){
        ths[i].onclick=function(){
            sort.call(this,this.index);//必须要传值
            changebg()

        }
    }
}


//排序
function sort (n){
    for(var i=0;i<ths.length;i++){
        if(ths[i]!=this){
            ths[i].flag=-1;
        }
    }


    this.flag*=-1
    var that =this;
    var tBodyAry = [].slice.call(tBodyRows);
    tBodyAry.sort(function(a,b){
        var x = a.cells[that.index].innerHTML;
        var y = b.cells[that.index].innerHTML;

        if(isNaN(x)||isNaN(y)){//如果不是一个数，返回true
            return x.localeCompare(y)*that.flag;
        }else{
            return(x-y)*that.flag;
        }
        });
    // 1是升序 -1是降序

        // return a.cells[n].innerHTML-b.cells[n].innerHTML;

    for(var i=0;i<tBodyAry.length;i++){
        tBody.appendChild(tBodyAry[i])
    }

}
//1. 第一步先让数字的一列执行从小到大排列
//2. 第二步再让数字的一列从小到大的排列
//3. 第三部我加入了一个判断，如果再页面中是汉字的话，就让他按字母排列，如果是数字的话就按从小到大排列
//4. 第四步我打算让点完升序，还想再点的时候实现降序的功能，我用的是在sort末尾乘以-1实现，每次点击都变换，默认-1为降序，1是降序
//5. 第五步我还想实现点这一项的时候，再点其他项的时候由升序来排列。（这样不管你那一项离开本项都是升序排列）

