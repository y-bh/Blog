/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 统一接口响应
 * @Date: 2022-04-22 15:03:50
 * @LastEditTime: 2022-05-19 15:58:07
 */

exports.routerResponse = (option = {}) => {
  return async function (ctx, next) {
    ctx.success = function (data, msg) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: option.successCode || 200,
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

