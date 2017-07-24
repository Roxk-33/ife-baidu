/**
 * Created by hao on 2017/7/21.
 */
let   express = require('express'),
      router = express.Router(),
      search = require('../middlewaves/search'),
      getResult = require('../models/getDate');

router.get('/',search,(req,resp)=>{
    let key = req.query.key,
        device = req.query.device;
    console.log(key)
    getResult(key,function (result) {
        resp.send(result.dataList)
    });
})

module.exports = router