/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: node 端自定义API。
 * @Date: 2022-05-17 15:52:03
 * @LastEditTime: 2022-05-18 11:47:13
 */
const Router = require("koa-router");
const router = new Router();
const appKey = require("config/app.key.config")
const { registerService, resetService, loginService } = require("service/user")


//针对登录/注册/ 重置密码相关java 接口做转发
router.post("/login", async (ctx) => {
  const params = ctx.request.body

  console.log("获取传参:", params)

  let res = null

  //登录功能
  if (params.type === 'login') {
    res = await loginService(params)
  }

  //重置功能
  if (params.type === 'reset') {
    res = await resetService(params)
  }
  //注册功能
  if (params.type === 'register') {
    res = await registerService(params)
    console.log("java端处理结果", res)
  }


  //注册/登录/重置 成功后业务
  if (+res.code === 0) {
    let token = res.data.token
    delete res.data.token
    //设置cookie 值
    ctx.cookies.set(appKey.token, token)
    ctx.cookies.set(appKey.userInfo, JSON.stringify(res.data))
  }

  console.log("bbbbbbbbbbbbbbbbbbb", res)
  //return ctx.redirect('/manager');
  ctx.response.body = res
});

//针对登录/注册/ 重置密码相关java 接口做转发
router.post("/layout", async (ctx) => {
  console.log("退出登录:")
  ctx.cookies.set(appKey.token, '')
  ctx.cookies.set(appKey.userInfo, '')
  return ctx.success(null, '已退出登录');
});

module.exports = router;