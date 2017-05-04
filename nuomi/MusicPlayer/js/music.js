/**
 * Created by hao on 2017/3/30.
 */
function readFile() {
    var fso = new ActiveXObject(Scripting.FileSystemObject);

}
function play_pause() {
    var myAudio = document.getElementById('myAudio'),
        $playBtn = $('#stop')

    if ($('#stop').is(':checked')) {
        console.log('stop');
        $playBtn.attr("checked", false);
        myAudio.play(); // 播放

    } else {
        console.log('play')
        $playBtn.attr('checked', true);
        myAudio.pause(); // 暂停播放
    }
}
/**
 *
 * @param {String} path 音乐路径
 * @constructor
 */
function PlayMusic() {

    // if(!path) return;


    var Audio = document.createElement("audio");
    Audio.id = "myAudio";
    Audio.src = "./music/OneRepublic - Apologize.mp3";
    Audio.autoplay = "autoplay";
    Audio.volume = 0.5;
    document.body.appendChild(Audio)
}

/**
 * 控制音量
 */
var controlVoice = function () {
    this.init();
}

controlVoice.prototype = {

    init: function () {
        var oThis = this;
        this.Audio = document.getElementById('myAudio');

        this.getTime();

        $('.voice-btn').mousedown(function () {
            oThis.setVolume.call(oThis);
        })
        Event.add({
            "Muted": oThis.setMuted
        })
    },

    setVolume: function () {
        var $voice = $('.voice-btn'),
            $voicepart = $(".voiceProcessNow"),
            oThis = this;

        var outset = $voice.parent().offset().left;

        $(document.body).mousemove(function (e) {
            var left = e.clientX - outset;

            left = left > 90 ? 90 : left;
            left = left < -5 ? -5 : left;

            $voice.css("left", left + "px");
            $voicepart.css("width", left + 5 + "px")

            //控制音量
            oThis.Audio.volume = (left + 5) / 100;

            return false;
        })
        $(document.body).mouseup(function () {
            $(document.body).unbind()
            return false;

        })
    },

    //控制静音
    setMuted: function () {
        var myAudio = document.getElementById('myAudio');
        myAudio.muted = !myAudio.muted;

        var $voice = $('.voice-btn'),
            $voicepart = $(".voiceProcessNow");

        $voice.css("left", -5 + "px");
        $voicepart.css("width", 0 + "px")
    },
    setTime: function () {
        var processAll = 500,
            $process_btn = $(".process-btn");

        $(".process-btn").mousedown(function (e) {
            var event = window.event || e;

        })

    },
    flashTime : function () {
        var $process_btn = $(".process-btn"),
            $processNow = $(".musicProcessNow"),
            processAll = 500,
            musicTime =  this.musciTime,
            timer = null,
            oThis = this;

        // 秒/px
        var rate = processAll/ musicTime;
        console.log(rate)
        timer = setInterval(function () {

            console.log($processNow.width())
            $process_btn.css("left", parseInt($process_btn.css("left")) + rate + "px");
            $processNow.css("width",$processNow.width() + rate + "px");
            oThis.Audio.ended && (clearInterval(timer));

        },1000)

    },
    //获取总播放时长
    getTime: function () {

        var  oThis = this;

        //获取总时长
        this.Audio.addEventListener("loadedmetadata", function () {
            oThis.musciTime = this.duration;
            oThis.initPlayer.call(oThis,oThis.musciTime);
        });

        //格式化时间

    },

    //初始化播放器界面
    initPlayer: function (data) {

        this.flashTime();

        function format(data) {

            data = Math.floor(data);

            var min = Math.floor(data / 100),
                sec = data - min * 100;

            sec = sec < 10 ? "0" + sec : sec;
            min = min < 10 ? "0" + min : min;

            return "-" + min + ":" + sec;
        }

        data = format(data);
        var $showTime = $('.music-time');
        console.log(data)
        $showTime.html(data);
    }
}

window.onload = function () {
    PlayMusic();
    new controlVoice();

    Event.add({
        "controlPlay": play_pause
    })

};