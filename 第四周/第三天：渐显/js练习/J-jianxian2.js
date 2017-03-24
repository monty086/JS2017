/**
 * Created by monty on 2017/3/17.
 */
var main = utils.getElementsByClass('main')[0];
var inner = utils.getElementsByClass('inner',main)[0];
var focus = utils.getElementsByClass('focus',main)[0];
var left = utils.getElementsByClass('left',main)[0];
var right = utils.getElementsByClass('right',main)[0];
var imgs = main.getElementsByTagName('img');
var lis = main.getElementsByTagName('li');


var xhr = new XMLHttpRequest();
xhr.open('get','data.txt',false);
xhr.onreadystatechange = function () {
    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
        (xhr.responseText)
    }
}
