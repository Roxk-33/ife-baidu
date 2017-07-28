/**
 * Created by hao on 2017/7/23.
 */
let request = require('request'),
    fs = require('fs');


function downloadPic(url, path) {
    return new Promise((resolve, reject) => {

        request.head(url, function (err, res, body) {
            if (err) {
                reject(err)
                return
            }
            request(url)
                .pipe(fs.createWriteStream(path))
                .on('close', function () {
                    // 生成本地图片文件获取实际尺寸
                    resolve(path + ' 图片下载成功')
                })
        })
    })
}

module.exports = function (data, callback) {

    let dataList = data.dataList,
        fn = [];

    dataList.map((item, index) => {

        if (item.img !== "" && item.img !== undefined) {

            let id = Math.floor(Math.random() * 90000 + 10000);
            let url = item.img,
                path = "./public/img/" + id + '.jpg';
            item.img = "/img/" + id + ".jpg";
            fn.push(downloadPic(url, path));

        }
    })


    Promise.all(fn).then(function () {
        callback(data);
    }, function () {
        console.log("error")
    })
}
