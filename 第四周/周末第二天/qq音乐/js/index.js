/**
 * Created by Administrator on 2017/3/19.
 */

(function (){

    var $music = $('.music');
    var $play = $music.find('.play');
    var $pause = $music.find('.pause');

    var $main = $music.find('.main');
    var $lyric = $main.find('.lyric');
    var $ps = null

    var $totalTime = $music.find('.totalTime');
    var $curTime = $music.find('.curTime');

    var $progressBar = $music.find('.bar span')

    var winHeight = document.documentElement.clientHeight||document.body.clientHeight;
    var headHeight = $music.find('.header')[0].offsetHeight;
    var footHeight = $music.find('.footer')[0].offsetHeight;
    $main.css({
        height: winHeight - headHeight - footHeight - 0.8*htmlfontSize
    })

    var audio =$music.find('audio')[0];//音频对象必须获取原生方法



var data = null
    function getData (){
        $.ajax({
            type:'get',
            url:'lyric1.json',
            cache:false,
            async:false,
            dataType:'json',
            success:function(res){
                //如果成功获取，那么就把直接把数据赋值给全局变量
                res.code==0?data=res.lyric:void 0;
            }
        })
    }
    function bindData(){
        if(data&&data.length){
            console.log(data);
            var str =''
            $.each(data,function(index,item){
                str+='<p id="'+item.id+'"  sec="'+item.second+'"  min="'+item.minute+'">'+item.content+'</p>'
            })
            $lyric.html(str);
        }

    }
    function autoPlay(){
        audio.play();
        $(audio).on('canplay',function(){//canplay事件一定是播放之后触发
            console.log(audio.duration);//保存音频文件有多长时间  s
            $totalTime.html(formatTime(audio.duration))//格式化字符串赋值给总时间
            $play.css('display','none');
            $pause.css('display','block')
        })
    }
    function formatTime(s){
        var min = Math.floor(s/60);
        var sec = Math.floor(s- min*60);
        min = min<10 ? '0'+min:min;
        sec = sec<10? '0'+sec :sec;
        return  min+':'+sec
    }

    function bindEvent(){
        $play.on('click',clickHandler);
        $pause.on('click',clickHandler);
    }

    function clickHandler(){
        if(audio.paused){//条件为真，歌曲为暂停着的
            audio.play();
            $pause.css('display','block');
            $play.css('display','none')
        }else{//播放着的时候
            audio.pause();
            $play.css('display','block');
            $pause.css('display','none')
        }
    }
    function progress (){//进度
        $ps = $lyric.find('p');//重新获取所有的歌词行

        var timer = window.setInterval(function (){
            if(audio.currentTime>audio.duration){
                window.clearInterval(timer);
                return;
            }
           $curTime.html(formatTime(audio.currentTime)) ;
           var widthVal = audio.currentTime/audio.duration*100+'%';
           $progressBar.css({
               width:widthVal //只要修改宽度值，transition就会动画
           })

            //从所有歌词行p中，挑选出分钟和秒都能和当前播放时间对应上的那个p，添加cur样式。
            var min = $curTime.html().split(':')[0];//获取当前播放的分
            var sec = $curTime.html().split(':')[1];//获取当前播放的秒
            var $curP = $ps.filter('[min="'+min+'"][sec="'+sec+'"]');

            $curP.addClass('cur').siblings().removeClass('cur');
            var $cupId = $curP.index()+1

            if($cupId>=4){
                $lyric.css({
                    top: - ($cupId -3)*0.84+'rem'
                })
            }
        },1000)
    }

    window.init = function (){
        getData();//获取数据
        bindData();//绑定数据
        autoPlay();//播放，刚开始播放那一刻完成总时间和默认按钮显示
        bindEvent();//给按钮绑定点击事件
        progress()//每1s更新当前的播放时间，进度条，歌词
    }








})()

init();

