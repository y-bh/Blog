/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 统一接口响应
 * @Date: 2022-04-22 15:03:50
 * @LastEditTime: 2022-04-22 15:03:51
 */

export default function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, msg) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: option.successCode || 0,
        msg: msg,
        data: data,
      };
    };

    ctx.fail = function (msg, code) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: code || option.failCode || 99,
        msg: msg || option.successMsg || "fail",
      };
    };

    await next();
  };
}
