/**
 * Created by hao on 2017/3/30.
 */
function readFile() {
    var fso=new ActiveXObject(Scripting.FileSystemObject);

}
function play_pause() {
    var myAudio = document.getElementById('myAudio'),
        $playBtn = $('#stop')

    if($('#stop').is(':checked')){
        console.log('stop');
        $playBtn.attr("checked",false);
        myAudio.play(); // 播放

    }else {
        console.log('play')
        $playBtn.attr('checked',true);
        myAudio.pause(); // 暂停播放
    }
}
/**
 *
 * @param {String} path 音乐路径
 * @constructor
 */
function PlayMusic(path) {

    // if(!path) return;

    var $music = $("<audio autoplay='autoplay' id='myAudio'></audio>");
    $music.attr("src","./music/OneRepublic - Apologize.mp3");
    $('.container').append($music)
}

/**
 * 控制音量
 */
var controlVoice = function () {
    this.init();
}

controlVoice.prototype = {

    init : function () {
        var oThis = this;
        $('.voice-btn').mousedown(function () {
            oThis.moveVoice();
        })
        Event.add({
            "Muted" : oThis.muted
        })
    },

    moveVoice : function () {
        var $voice = $('.voice-btn'),
            $voicepart = $(".voiceProcessNow"),
            oThis = this;

        var outset = $voice.parent().offset().left;

        $(document.body).mousemove(function (e) {
            var left = e.clientX - outset;

            left = left > 90 ? 90 : left;
            left = left < -5 ? -5 : left;

            $voice.css("left",left + "px");
            $voicepart.css("width",left+5 + "px")

            //控制音量
            oThis.volume((left+5)/100);
        })
        $(document.body).mouseup(function () {
            $(document.body).unbind()
        })
    },

    //控制静音
    muted : function () {
        var  myAudio = document.getElementById('myAudio');
        myAudio.muted = !myAudio.muted;

        var $voice = $('.voice-btn'),
            $voicepart = $(".voiceProcessNow");

        $voice.css("left",-5 + "px");
        $voicepart.css("width",0 + "px")
    },

    volume : function (curr_volume) {
        var  myAudio = document.getElementById('myAudio');

        myAudio.volume = curr_volume;

    },

    currentTime : function (schedule) {
        var  myAudio = document.getElementById('myAudio');
        console.log(myAudio.duration)
        if('fastSeek' in myAudio){

            myAudio.fastSeek(schedule);//改变audio.currentTime的值

        }
        myAudio.volume = schedule;
    }
}

window.onload = function(){
    PlayMusic();
    new controlVoice();

    Event.add({
        "controlPlay" : play_pause
    })
};