/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: node 端自定义API。
 * @Date: 2022-05-17 15:52:03
 * @LastEditTime: 2022-05-17 17:15:35
 */
const Router = require("koa-router");
const router = new Router();



//针对登录/注册/ 重置密码相关java 接口做转发
router.post("/login", async (ctx) => {
  const params = ctx.request.body

  console.log("获取传参:",params)
  // ctx.cookies.set("userInfo","gouzi",{
  //   maxAge:1000*60*60
  // })
 return ctx.success(null, '请求成功');

});






module.exports = router;