var result = require("../db/mongoose");

module.exports = function (key,callback) {
    result.findOne({key:key},function (err, doc) {

        callback(doc);
    })
}