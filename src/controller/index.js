/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 路由控制层
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-04-25 17:57:07
 */

const router = require("koa-router")();
const { renderHome } = require("service/home")


function Router(App) {
  //用户管理
  // router.use("/user", user.routes(), user.allowedMethods());


  //首页
  router.get("/", async (ctx) => {


    //  const res = await renderHome()


    console.log("控制层:")

    return ctx.render("home", {
      name: '住在我',
      url: 2222
    })
  })


  //个人中心
  router.get("/manager", async (ctx) => {


    //  const res = await renderHome()


    console.log("控制层:")

    return ctx.render("manager.html", {
      name: '住在我',
      url: 2222
    })
  })



  App.use(router.routes()); //作用：启动路由
  App.use(router.allowedMethods());
}

module.exports = Router;