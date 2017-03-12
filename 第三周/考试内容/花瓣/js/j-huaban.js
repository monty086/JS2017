/**
 * Created by Administrator on 2017/3/11.
 */
var main = utils.getElesByClass('main')[0];
var uls = main.getElementsByTagName('ul');
var imgs = main.getElementsByTagName('img');
var ulsAry = utils.listToArray(uls);

var data = null
    ;
(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            window.data = utils.jsonParse(xhr.responseText)
        }
    }
    xhr.send();
})()
console.log(data);

bingData();
function bingData() {
    if (data && data.length) {
        for (var i = 0; i < 50; i++) {
            var cur = Math.round(Math.random() * 14);
            var curData = data[cur];
            var li = document.createElement('li');
            var img = document.createElement('img');
            img.setAttribute('real', curData.src);
            img.style.height = utils.getRandom(100,350)+'px';
            li.appendChild(img);
            var span = document.createElement('span');
            span.innerHTML = curData.title;
            li.appendChild(span);
            var a = document.createElement('a');
            a.innerHTML = "采集";
            li.appendChild(a);
            ulsAry.sort(function (ul1, ul2) {
                return ul1.offsetHeight - ul2.offsetHeight
            });
            ulsAry[0].appendChild(li);
        }
    }
}