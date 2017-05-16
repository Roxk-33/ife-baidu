/**
 * Created by hao on 2017/5/14.
 */
(function ($) {

    var tagCloud = function (item) {
        return new tagCloud.prototype.init(item);
    }

    tagCloud.prototype = {

        init : function (item) {

            // var aLength = items.length;

            this.test(item);
        },
        test : function (item) {
            var timer = null,
                time = 100;

            timer = setInterval(function () {
                var dis = 0;
                dis < 100 ? dis++ : (clearInterval(timer));
                $(item).css("transform","translateZ("+dis+"px)")
            },time)
        }
    }

    tagCloud.prototype.init = tagCloud.prototype;
     window.tagCloud = tagCloud;
}(jQuery))