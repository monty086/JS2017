/**
 * Created by Administrator on 2017/3/25.
 */

function Drag(ele){
    this.ele = ele;
    this.ele.l = null;//鼠标mousedown才会赋值，现在没有
    this.ele.t = null;
    this.ele.onmousedown =this.down;
        e=e || window.event;


}
Drag.prototype.down =function () {}//鼠标按下事件绑定用
Drag.prototype.move =function () {}//鼠标移动事件绑定
Drag.prototype.up =function () {} // 鼠标松开事件绑定