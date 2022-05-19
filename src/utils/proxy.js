/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 客户端接口跨域代理
 * @Date: 2022-05-18 17:24:02
 * @LastEditTime: 2022-05-19 10:44:30
 */

const { proxyAxios } = require("utils/request")

/****
 * 目前走代理接口大约比直接走java 端接口延迟10ms； 参考nginx 代理时间决定使用哪一种
 */
module.exports = (option = {}) => {
  return async function (ctx, next) {
    const { url, method, body } = ctx.request
    if (option && !option.prex) {
      option.prex = '/proxy'
    }
    if (!url.includes(option.prex)) {
      await next();
    } else {
      console.log("转达到java端", method, url)
      let tem = url.replace(option.prex, '')
      const res = await proxyAxios(tem, method, body)
      console.log("代理接口返回的数据", res)
      ctx.body = res
    }
  };
}