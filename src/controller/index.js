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

  //登录页
  router.get(["/login", "/reset", "/register"], async (ctx) => {
    let { url, query } = ctx.request

    //处理掉查询串情况
    if (query && url.includes('?')) {
      url = (url.split("?"))[0]
    }

    //处理掉hash 情况
    if (url.includes('#')) {
      url = (url.split("#"))[0]
    }

    const data = {
      type: url.slice(1)
    }
    return ctx.render("login/index", data)
  })

  App.use(router.routes()); //作用：启动路由
  App.use(router.allowedMethods());
}

module.exports = Router;