/**
 * Created by hao on 2017/7/18.
 */
phantom.outputEncoding = "gb2312";


var page = require('webpage').create(),
    searchValue = "phantomjs1",
    url = "http://baidu.com/s?wd=" + searchValue,
    outPut = {};
outPut.word = searchValue;

page.onLoadStarted = function () {
    page.startTime = new Date();
};
page.open(url, function (status) {

    if (status === 'success') {
        page.includeJs("http://apps.bdimg.com/libs/jquery/1.8.3/jquery.min.js", function () {
            var data = [];
            data = page.evaluate(function () {
                var data = [],
                    aResult = $(".result");

                aResult.each(function () {
                    var result = {},
                        $oResult = $(this);

                    result.title = $oResult.find(".t a").text();
                    result.info = $oResult.find(".c-abstract").text();
                    result.link = $oResult.find(".t a").attr("href");
                    result.pic = $oResult.find(".c-img").attr("src");

                    data.push(result);
                })
                return data;
            })

            var time = Date.now();

            outPut.time = time - page.startTime;
            outPut.dataList = data;
            outPut.code = 1;
            outPut.msg = "抓取成功";

            console.log(JSON.stringify(outPut));

            setTimeout(function() {
                page.close();
                phantom.exit();
            }, 0);
        })
    }else {
        console.log("fail")
    }

});

