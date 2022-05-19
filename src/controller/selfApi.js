/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: node 端自定义API。
 * @Date: 2022-05-17 15:52:03
 * @LastEditTime: 2022-05-19 15:31:57
 */
const Router = require("koa-router");
const router = new Router();
const appKey = require("config/app.key.config")
const { registerService, resetService, loginService } = require("service/user")


//针对登录/注册/ 重置密码相关java 接口做转发
router.post("/login", async (ctx) => {
  const params = ctx.request.body
  let res = null
  if (!params.type) {
    return ctx.fail('请传入页面类型[login|reset|register]')
  }

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
  }

  //注册/登录/重置 成功后业务
  if (+res.code === 200) {
    let token = res.data.token
    delete res.data.token
    //设置cookie 值
    ctx.cookies.set(appKey.token, token)
    ctx.cookies.set(appKey.userInfo, JSON.stringify(res.data))
  }
  //return ctx.redirect('/manager');
  ctx.response.body = res
});

//登出功能
router.post("/layout", async (ctx) => {
  ctx.cookies.set(appKey.token, '')
  ctx.cookies.set(appKey.userInfo, '')
  return ctx.success(null, '已退出登录');
});

module.exports = router;