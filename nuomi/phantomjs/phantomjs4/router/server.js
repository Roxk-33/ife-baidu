/**
 * Created by hao on 2017/7/20.
 */

module.exports = function (app) {


    app.get('/',(req,resp)=> resp.render('index'));

    app.use('/crawl',require('./post'));
}

