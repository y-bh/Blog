/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 服务端应用入口
 * @Date: 2022-04-22 15:00:25
 * @LastEditTime: 2022-04-26 15:56:03
 */

const Koa = require("koa");
const koa_static = require("koa-static");
const koa_body = require("koa-body")
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");


//应用配置文件
const config = require("./config/app.config")

//统一接口响应中间件
const {routerResponse} = require("utils/parseJson")

//路由配置文件
const Router = require("controller/index")


const app = new Koa();

//全局配置
app.silent = true;

//解析图片
// app.use(koa_body({
// 	multipart: true,
//     formidable: {
//         uploadDir: path.join(__dirname,"src/static"),
//         keepExtensions: true
//     }
// }))


//处理模板
app.use(views(config.templates, {
  /* 视图文件后缀名 */
  map: { html: 'ejs' }
}))

//静态文件位置
app.use(koa_static(config.static))

//解析入参
app.use(bodyParser());

//统一响应接口
app.use(routerResponse());

//路由器
Router(app);

app.on("error", (err) => {
  console.error("server error", err);
});


app.listen(config.appPort, async () => {
  console.log("天启http 应用启动成功", config.appPort);
});
