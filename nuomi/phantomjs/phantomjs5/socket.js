const async = require('async');
const crawl =require('./models/search');
const config =require('./config/default');

module.exports = function (app,port) {
	const server = require('http').createServer(app.callback())
	const io = require('socket.io')(server);

	//建立服务器和客户端直接的通信
	const queue = async.queue(async (task,callback)=>{

		const dataList =  await crawl(task);

		task.socket.emit('crawl', dataList);
		callback();
	},5);

	io.on('connection', function(socket){
		console.log("a user connect")
		socket.on('submit',function (msg) {
			console.log(`message : ${msg}`);
			const page = msg.page;
			for(let i = 0;i < page;i++) {
				queue.push({key: msg.key, page : i * 10, device : msg.device, socket: socket}, (err) => {
					if (err) {
						console.log(err);
					}
					console.log('items waiting to be processed:' + queue.length());
					console.log('items running:' + queue.running());
				});
			}
		})
	})
	server.listen(config.port,()=>console.log(`server is lisetening on ${config.port}`));
}