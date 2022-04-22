/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 路由配置
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-04-22 15:15:53
 */

const router = require("koa-router")();



export default function Router(App) {
  //用户管理
  // router.use("/user", user.routes(), user.allowedMethods());

  router.get("/",async (ctx)=>{
    return ctx.render("index")
  })

  App.use(router.routes()); //作用：启动路由
  App.use(router.allowedMethods());
}