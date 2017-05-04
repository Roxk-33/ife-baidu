/**
 * Created by hao on 2017/5/4.
 */
(function ($) {

    $.fn.infiniteScroll = function (option) {
        var
            setting = $.extend({
                liClassName : "",
                divClassName : "",
                iniNum : 28 ,
                addNum : 10 ,
                waitLoadding : 2000,
            },option),
            $view = $(this).find("ul"),
            $theDocument = $(document),
            $theWindow = $(window),
            numList = 0,
            appendList = function (num) {
                for(var i = 0; i < num; i++){
                    numList++;
                    var
                        $moduleLi = $("<li></li>").addClass(setting.liClassName),
                        $moduleDiv = $("<div></div>").addClass(setting.divClassName);

                    $moduleDiv.text("Item " + numList);
                    $moduleLi.append($moduleDiv);
                    $view.append($moduleLi);
                }
            },
            iniList = function () {
                appendList(setting.iniNum);
                $theWindow.scroll(function () {
                    scrollAppend();
                });
            };

        function animationLoadding() {
            // var oDiv = $("<div></div>").css({
            //     "width": "40px",
            //     "height": "40px",
            //     "margin": "10px auto",
            //     "border-radius": "50%",
            //     "border": "5px solid #878787",
            //     "border-left-color": "transparent",
            //     "display" : "none"
            // })
            // oDiv.animate()

            $(".loadding").css("display", "block");
            setTimeout(function () {
                $(".loadding").css("display", "none");
            },setting.waitLoadding)
        }
        function scrollAppend() {

            var height = $theDocument.height();
            if($theWindow.height() + $theWindow.scrollTop() < height) return;
            setTimeout(function () {
                appendList(setting.addNum)
            },setting.waitLoadding)
            animationLoadding();

        }

        iniList();
        return this;
    }

}(jQuery))