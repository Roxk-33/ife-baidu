/**
 * Created by hao on 2017/7/23.
 */

let exec = require("child_process").exec,
    downImg = require("../models/download"),
    fs = require('fs'),
    Result = require('../db/mongoose');

module.exports = function (req, resp, next) {

    let key = req.query.key,
        device = req.query.device;

    console.log(key, device)
    let cmdStr = "phantomjs ./models/crawl.js " + key;
    exec(cmdStr, function (err, stdout, stderr) {

        if (err) {
            console.log(`exec error:${err}`)
            resp.send({isOK: false});
        } else {
            let data = JSON.parse(stdout);

            downImg(data, function (post) {
                console.log("send");
                let result = new Result(JSON.parse(stdout));

                result.save(function (err, result) {
                    if (err) console.log(err);
                    else {
                        next();
                    }
                })

            });

        }

    })

}