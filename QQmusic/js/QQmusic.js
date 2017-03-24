/**
 * Created by monty on 2017/3/23.
 */

var banner = utils.getElementsByClass('banner')[0];
var main =  utils.getElementsByClass('context')[0];
var menu = main.getElementsByTagName('ul')[0];
var frame = utils.getElementsByClass('frame',main)[0];
var ol = main.getElementsByTagName('ol')[0];
console.dir(ol);
var lis = menu.getElementsByTagName('li');
console.log(lis);
var ols = banner.getElementsByTagName('ol');
console.log(ols)
var ul = utils.getElementsByClass('focus')[0];
var lisTow = ul.getElementsByTagName('li');
console.log(lisTow);
var chart = utils.getElementsByClass('chart',main)[0]
    console.dir(chart)

;(function(){
    for(var i=0;i<lis.length;i++){
        // lis[i].index = i
        ;(function (aa){
            lis[aa].onclick = function (){
                for(var j = 0;j<ols.length;j++){
                    lis[j].className = ols[j].className= '';
                }
                this.className = 'cur'
                ols[aa].className = 'chart'
            }
        })(i)
    }
})()


var index = 0;
function move (){
    var boxWidth = frame.clientWidth;
 index +=1
    if(index == lis[lis.length]){
     utils.css(ol,'left',0)
        index = 4
    }
    animate({
        ele:ol,
        target: {
            left:-1200+'px'
        },
        duration:300
    })
}
// for(var i=0;i<lisTow.length;i++){
//     lisTow[i].index =i
//     lisTow[i].onclick = function (){
//         var boxWidth = utils.css(lisTow[this.index],'width')*4;
//         // alert(this.index)
//         move()
//         animate({
//             ele:ol,
//             target:{
//                 left: -1200+'px'
//             }
//         })
//     }
// }




