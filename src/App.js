/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 服务端应用入口
 * @Date: 2022-04-22 15:00:25
 * @LastEditTime: 2022-04-22 15:44:54
 */

const Koa = require("koa");
const koa_static = require("koa-static");
const koa_body = require("koa-body")
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");


const path = require("path")
import Router from "./router/index"; //路由控制器
import routerResponse from "./utils/parseJson"; //响应中间件


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
app.use(views(path.join(__dirname, "./views"), {
  /* 视图文件后缀名 */
  extension: "html"
}))

//静态文件位置
app.use(koa_static(__dirname, "./static"))

//解析入参
app.use(bodyParser());


//统一响应接口
app.use(routerResponse());

//路由器
Router(app);

app.on("error", (err) => {
  console.error("server error", err);
});


app.listen(8081, async () => {
  console.log("天启http 应用启动成功", 8081);
});
