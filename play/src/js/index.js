/**
 * Created by cnns-xz on 2016/1/6.
 */
Vue.config.debug = true;
function parseLyric(text){
    "use strict";
    var lines = text.split('\n'),
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        result = [];
    while(!pattern.test(lines[0])){
        lines = lines.slice(1);
    }

    lines[lines.length-1].length === 0 && lines.pop();

    lines.forEach(function(v,i,a){
        var time = v.match(pattern),
            value = v.replace(pattern,'');
        time.forEach(function(v1,i1,a){
            var t = v1.slice(1,-1).split(':');
            result.push([parseInt(t[0],10) * 60 + parseFloat(t[1]),value]);
        })
    })

    result.sort(function(a,b){
        return a[0] - b[0]
    });
    return result;
}

Vue.directive('track',{
    bind:function(){
        "use strict";
    },
    update:function(src,oldSrc){
        "use strict";
        var $el = $(this.el);
        var promise = $.ajax({
            url:src+"?t="+(new Date())
        });
        promise.done(function(data){
            if(!data){return false;}
            data = parseLyric(data);
            var $audio = document.getElementById("audio");
            $audio.addEventListener("timeupdate",function(e){
                for (var i = 0, l = data.length; i < l; i++) {
                    if (this.currentTime /*当前播放的时间*/ > data[i][0]) {
                        //显示到页面
                        $el.html(data[i][1]) ;
                    };
                };
            });
        });
    }
});

var play = new Vue({
    el:"#play",
    data:{
        curIndex:0,
        sourceMusic:"E:\\KuGou",
        destMusic:"musics",
        musics:[]
    },
    computed:{
        music:function(){
            "use strict";
            return this.musics[this.curIndex]
        }
    },
    methods:{
        switchMusic:function(dir){
            "use strict";
            dir = dir || 'next';
            var $audio = document.getElementById("audio");
            switch(dir){
                case 'next':
                    this.curIndex = this.curIndex > this.musics.length - 2 ? 0 : this.curIndex + 1;
                    break;
                case 'prev':
                    this.curIndex = this.curIndex === 0 ? this.musics.length - 1 : this.curIndex - 1;
                    break;
            }
            $audio.load();
        },
        loadMusics:function() {
            var sourceMusic = this.sourceMusic,
                destMusic = this.destMusic;
            var self = this;
            var promise = $.ajax({
                url:"/musics",
                data:{
                    sourceMusic:sourceMusic,
                    destMusic:destMusic
                }
            });
            promise.done(function(data){
                self.musics = data.musics;
            });
        }
    }
});
window.onload = function(){
    "use strict";
    var $audio = document.getElementById("audio");
    $audio.volume = 0.2;
    $audio.addEventListener('canplay',function(){

    });
    $audio.addEventListener('readystatechange',function(e){
        console.log(e)
    });
    $audio.addEventListener('canplaythrough',function(){

    });
    $audio.addEventListener('loadedmetadata',function(e){
        //this.play();
    });
    $audio.addEventListener('loadstart',function(e){
        //console.log(e);
    });
    $audio.addEventListener('seeked',function(e){
        this.play();
    },true)
    $audio.addEventListener('seeking',function(e){
        console.log(e)
    },true)

    function handleDuration(duration){
        var minute = parseInt(duration/60),
            second = parseInt(duration%60);
        var time = minute+":"+second;
        return time;
    }
}