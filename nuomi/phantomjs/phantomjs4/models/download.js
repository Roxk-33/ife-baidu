/**
 * Created by hao on 2017/7/23.
 */
let request = require('request'),
    fs = require('fs'),
    async = require('async'),
    image = require('images'),
    path = require("path");


function downloadPic(url,dest,id,callback) {
    request(url).pipe(fs.createWriteStream(dest)).on('close', function () {
        console.log('pic saved!');
        callback(id);
    })
}

module.exports = function (data,callback) {

    let dataList = data.dataList,
        id = 0;

        async.each(dataList, function (item, callback) {
            // setTimeout(function () {

                if(item.img !== "" && item.img !== undefined) {
                    id = Math.floor(Math.random() * 90000 + 10000);
                    downloadPic(item.img, "./public/img/" + id + '.jpg',id, function (id) {
                        item.img = "/img/" + id + ".jpg";
                        console.log(item.img);
                        callback(null, item);
                    });
                }else {
                    callback(null, item);
                }

            // }, 400);
        },function () {
            callback(data)
        });

}
