/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 处理服务报错中间件
 * @Date: 2022-04-29 15:26:26
 * @LastEditTime: 2022-04-29 15:33:09
 */


module.exports = function () {
  return async function (ctx, next) {
    await next();
    if (parseInt(ctx.status) === 404) {
      ctx.response.redirect("/404")
    }
  }
}