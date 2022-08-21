/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 注册后端路由
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-05-30 11:07:47
 */



const router = require("koa-router")();
//注册后端路由功能
function Router(App) {

  //首页
  router.get("/", async (ctx) => {
    const homeData = {
      test: "test ejs"
    }
    return ctx.render("home/index", homeData)
  })

  App.use(router.routes()); //作用：启动路由
  App.use(router.allowedMethods());
}

module.exports = Router;