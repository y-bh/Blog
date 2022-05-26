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
const { registerService, resetService, loginService, registerCodeService, resetCodeService } = require("service/userService")


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
    // 处理登录问题
    if (res.data.token && params.type === 'login') {
      const { token } = res.data
      //设置cookie 值
      ctx.cookies.set(appKey.token, token, { httpOnly: false })

      //用户信息
      let user = JSON.stringify(res.data, ['id', 'balance'])
      ctx.cookies.set(appKey.userInfo, user, { httpOnly: false })
    }
  }
  //return ctx.redirect('/manager');
  ctx.response.body = res
});


//注册验证码
router.post("/registerCode", async (ctx) => {

  const { phone } = ctx.request.body
  if (!phone) {
    return ctx.fail("请输入手机号码!")
  }
  const res = await registerCodeService(phone)
  ctx.response.body = res
});


//重置验证码
router.post("/resetCode", async (ctx) => {
  const { phone } = ctx.request.body
  if (!phone) {
    return ctx.fail("请输入手机号码!")
  }
  const res = await resetCodeService(phone)
  ctx.response.body = res
});

//登出功能
router.post("/layout", async (ctx) => {
  ctx.cookies.set(appKey.token, '')
  ctx.cookies.set(appKey.userInfo, '')
  return ctx.success(null, '已退出登录');
});
module.exports = router;