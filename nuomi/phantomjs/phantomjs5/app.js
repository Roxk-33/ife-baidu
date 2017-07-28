const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const views = require('koa-views');
const path = require('path');
const router = require('koa-router');
let routers = new router();
const socket = require('./socket');

app.use(async(ctx, next)=>{
	let start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

//静态目录
const staticPath = './public';
//使用静态资源中间件
app.use(static(path.join(__dirname, staticPath)));

//加载模板引擎
app.use(views(path.join(__dirname,'./views'), {
		extension : 'ejs'
	}));


//建立服务器和客户端直接的通信
socket(app);

routers.get('/',async ctx=> {
	await ctx.render("index");
})

//加载任务路由
app.use(routers.routes(),routers.allowedMethods());
