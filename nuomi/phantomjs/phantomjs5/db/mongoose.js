/**
 * Created by hao on 2017/7/21.
 */
let mongoose = require('mongoose'),
    config = require("../config/default");
let db = mongoose.createConnection(config.mongooseURL);

mongoose.Promise = global.Promise;

let Result = new mongoose.Schema({
    code: {type: String},
    msg: {type: String},
    key: {type: String},
    time: {type: String},
    dataList: [{
        info: String,
        link: String,
        title: String,
        img: String
    }]
})

module.exports = db.model("Result",Result);