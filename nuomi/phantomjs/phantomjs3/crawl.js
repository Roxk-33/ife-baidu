
// phantom.outputEncoding="gbk"
var page =require('webpage').create();
var system=require('system');
var fs=require('fs');
var key=system.args[1];
var url="https://www.baidu.com/s?wd="+encodeURI(key);
var time=Date.now();
var data={};
// 获取网页控制台的 console.log() 内容

page.open(url,function (status) {
    if (status!=="success"){
        time = Date.now() - time;
        data={
            code:0,
            msg:'抓取失败',
            word:key,
            time:time
        };
        data=JSON.stringify(data,null,4);
        fs.write("task.json",data,'w');
        phantom.exit();
    }else {
        page.includeJs("https://code.jquery.com/jquery-3.1.1.min.js",function () {
            data=page.evaluate(function (time,key){
                var tmp=[];
                var total=$('.c-container');
                for(var i=0;i<total.length;i++){
                    var list={};
                    list.title=$(total[i]).find('.t').text().trim();
                    list.info=$(total[i]).find('.c-abstract').text();
                    list.link=$(total[i]).find('.t a').attr('href');
                    var pic=$(total[i]).find('c-img');
                    list.pic=pic.length?pic.attr('scr'):'';
                    tmp.push(list);
                }

                return JSON.stringify({
                    code:1,
                    msg:'抓取成功',
                    word:key,
                    time:time,
                    dataList:tmp
                },null,4);

            },time,key);
            fs.write("task.json",data,'w');
            console.log(data);
            phantom.exit();
        });
    }

});
