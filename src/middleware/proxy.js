/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 客户端接口跨域代理
 * @Date: 2022-05-18 17:24:02
 * @LastEditTime: 2022-05-19 15:26:32
 */

const service = require("utils/request")
const appKey = require("config/app.key.config")
/****
 * 目前走代理接口大约比直接走java 端接口延迟10ms； 参考nginx 代理时间决定使用哪一种
 */
module.exports = (option = {}) => {
  return async function (ctx, next) {
    
    const { url, method, body } = ctx.request
    if (option && !option.prex) {
      option.prex = '/javaProxy'
    }
    if (!url.includes(option.prex)) {
      await next();
    } else {
      console.log("转达到java端",body)
      let tem = url.replace(option.prex, '')
      const res = await service.proxyAxios(tem, method,body,Object.assign({}, ctx.request.headers, {
        [appKey.token]: ctx.cookies.get(appKey.token)
      }))
      console.log("代理接口返回的数据---------------->", res)
      ctx.body = res
    }
  };
}