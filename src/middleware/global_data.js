/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 处理node 上下文全局数据
 * @Date: 2022-05-16 18:06:42
 * @LastEditTime: 2022-05-20 13:52:00
 */

const appKey = require("config/app.key.config")

//顶部导航活动
const { renderTab, getQueryLink } = require("service/common")
const { getCateTypes } = require("service/helpCenter")


//需要获取全局数据【例如用户信息,公共底部的数据等必须配置路由权限】

//静态路由配置【koa-router 固定路由】
const URLS = ['/', '/login', '/reset', '/register', '/getIp', '/package', '/businessScene', '/firmsServer', '/getIp']

//动态路由配置【koa-router 动态路由】
const changeURL = ['tags', 'manager', 'help-details', 'help-center', 'businessScene']

module.exports = function (app) {
  app.use(async ({ req, res, state, cookies }, next) => {
    const { method, url } = req

    const isPass = changeURL.some((item) => url.includes(item))

    console.log("vvvvvvvvvvvvvvvvvvvvvv",isPass)
    if (method === 'GET' && (URLS.includes(url) || isPass)) {
      //顶部导航 活动相关数据
      const tabActivity = await renderTab();
      console.log("2222222222222222",tabActivity)
      state[appKey.active_tab] = tabActivity

      //顶部导航-帮助中心栏目文档
      const articleTypes = await getCateTypes()
      console.log("33333333333",articleTypes)
      state[appKey.cateTypes] = articleTypes

      //登录用户名
      let userInfo = cookies.get(appKey.userInfo)
      state.userInfo = userInfo && JSON.parse(userInfo)
      
      //友情链接
      state.links = await getQueryLink()
    }
    await next()
  });
}