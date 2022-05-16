/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 处理node 上下文全局数据
 * @Date: 2022-05-16 18:06:42
 * @LastEditTime: 2022-05-16 19:01:01
 */

const appKey = require("config/app.key.config")

//顶部导航活动
const { renderTab } = require("service/header")


module.exports = function (app) {
  app.use(async ({ req, res, state }, next) => {

    //顶部导航 活动相关数据
    const tabActivity = await renderTab();
    state[appKey.active_tab] = tabActivity
    state.name = "朱占伟"
    await next()
  });
}