const fs = require('fs');
const path = require('path');

function getControllers(dir) {
	let files = getControllers(path.join(__dirname,"../controller"));
	let controllers = files.filter(file =>{
		return file.endsWith(".js");
	});
	return controllers;
}
function addMapping(router,obj) {

	for(let url in obj){
		if(url.startsWith("GET ")) {
			let uri = url.substring(4);
			router.get(uri, obj[url]);
			console.log(`register URL mapping: GET ${path}`);
		}else if(url.startsWith("POST ")){
			let uri = url.substring(5);
			router.post(uri, obj[url]);
			console.log(`register URL mapping: POST ${path}`);
		}else {
			// 无效的URL:
			console.log(`invalid URL: ${url}`);
		}
	}
}
function addControllers(router, dir) {
	let controllers = getControllers(dir);
	let obj;
	controllers.forEach(controller =>{
		console.log(`process to ${controller}`);
		obj = require(path.join(__dirname,"../controller",controller));
		addMapping(router,obj);
	})
}

module.exports = (dir)=> {
	let controllers_dir = dir || 'controllers',
		router = require('koa-router')();
	addControllers(router, controllers_dir);
	return router.routes();
}