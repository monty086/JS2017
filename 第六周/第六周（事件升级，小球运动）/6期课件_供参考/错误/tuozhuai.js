/**
 * Created by libin on 2016/7/21.
 */
function down(e){
    this.x=this.offsetLeft;
    this.y=this.offsetTop;
    this.mx= e.pageX;
    this.my= e.pageY;
    if(this.setCapture){
        this.setCapture();
        on(this,'mousemove',move);
        on(this,'mouseup',up);
    }else{
        this.MOVE=move.bind(this)
        this.UP=up.bind(this)
        on(document,'mousemove',this.MOVE)
        on(document,'mouseup',this.UP)
    }
    on(this,'selfabcd1',e)
}
function move(e){
    this.style.left=this.x+ (e.pageX-this.mx)+'px';
    this.style.top=this.y+(e.pageY-this.my)+'px';
    on(this,'selfabcd2',e)
}

function up(e){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,'mousemove',move);
        off(this,'mouseup',up)
    }else{
        off(document,'mouseover',this.MOVE);
        off(document,'mouseup',this.UP)
    }
    on(this,'selfabcd3',e)
}