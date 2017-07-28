/**
 * Created by hao on 2017/7/23.
 */

let exec = require("child_process").exec,
	downImg = require("./download"),
	Result = require("../db/mongoose");


function startCrawl(cmdStr) {

	return new Promise(function (resolve, reject) {
		exec(cmdStr, function (err, stdout, stderr) {

			if (err) {
				console.log(`exec error:${err}`);
				resp.send({isOK: false});
			} else {
				let data = JSON.parse(stdout);

				downImg(data, function (post) {

					let result = new Result(post);

					result.save((err, result) => {
						if (err) {
							console.log(err);
							reject();
						}
						else {
							console.log("ok!");
							resolve(result);
						}
					});

				});
			}
		});
	});
}

module.exports = async (msg) => {

	const key = msg.key,
		device = msg.device,
		page = msg.page;
	console.log(key, device, page);
	let data = new Object();
	const cmdStr = "phantomjs ./models/crawl.js " + key + " " + page + " " + device;
	await startCrawl(cmdStr).then((result)=>{
		data = result;
	});

	data.dataList.key = data.key;
	return data.dataList;
};