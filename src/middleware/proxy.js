

const proxyAjax = require("utils/proxyRequest")
const appKey = require("config/app.key.config");
const { on } = require("koa");
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
      console.log("转达到java端參數", body)
      let tem = url.replace(option.prex, '')
      let headers = Object.assign({}, ctx.request.headers)
      if (ctx.cookies.get(appKey.token)) {
        headers = Object.assign({}, headers, {
          [appKey.token]: ctx.cookies.get(appKey.token)
        })
      }

      const res = await proxyAjax.proxyAxios(tem, method, body, headers)
     // console.log("代理接口返回的数据---------------->", res)
      ctx.body = res
    }
  };
}