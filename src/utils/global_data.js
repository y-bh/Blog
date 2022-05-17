/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 处理node 上下文全局数据
 * @Date: 2022-05-16 18:06:42
 * @LastEditTime: 2022-05-17 14:29:55
 */

const appKey = require("config/app.key.config")

//顶部导航活动
const { renderTab, getQueryLink } = require("service/common")


//需要获取全局数据的 url
const URLS = ['/', '/login', '/reset','/register','/getIp', '/package', '/businessScene', '/helpCenter', '/firmsServer','/helpDetails']
module.exports = function (app) {
  app.use(async ({ req, res, state }, next) => {
    const { method, url } = req
    if (method === 'GET' && URLS.includes(url)) {
      console.log("设置全局数据",url)
      //顶部导航 活动相关数据
      const tabActivity = await renderTab();
      state[appKey.active_tab] = tabActivity

      //登录用户名
      state.name = "朱占伟"

      //友情链接
      state.links = await getQueryLink()
    }
    await next()
  });
}