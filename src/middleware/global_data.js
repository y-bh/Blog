/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 处理node 上下文全局数据
 * @Date: 2022-05-16 18:06:42
 * @LastEditTime: 2022-05-30 11:05:20
 */

const appKey = require("config/app.key.config")

//顶部导航活动
const { renderTab, getQueryLink } = require("service/commonService")
const { getCateTypes } = require("service/helpCenterService")

const { getTime } = require('utils/activityTime')


//需要获取全局数据【例如用户信息,公共底部的数据等必须配置路由权限】

//静态路由配置【koa-router 固定路由】
const URLS = ['/', '/login', '/reset', '/register', '/getIp', '/package', '/businessScene', '/firmsServer', '/getIp', '/404']

//动态路由配置【koa-router 动态路由】
const changeURL = ['tags', 'manager', 'help-details', 'help-center', 'businessScene']

module.exports = function (app) {
  app.use(async ({ req, res, state, cookies }, next) => {
    let { method, url } = req
    //处理掉带查询传情况
    if (url.includes('?')) {
      url = (url.split("?"))[0]
    }

    //处理掉hash 情况
    if (url.includes('#')) {
      url = (url.split("#"))[0]
    }

    const isPass = changeURL.some((item) => url.includes(item))

    console.log("获取全局数据:", url)

    if (method === 'GET' && (URLS.includes(url) || isPass)) {
      //顶部导航 活动相关数据
      const tabActivity = await renderTab() || null;

      const t = getTime()
      state['actt'] = t

      state[appKey.active_tab] = tabActivity || null

      //顶部导航-帮助中心栏目文档
      const articleTypes = await getCateTypes()

      state[appKey.cateTypes] = articleTypes

      //是否已登录
      let token = cookies.get(appKey.token)
      state.token =token || null



      //友情链接
      state.links = await getQueryLink()
    }
    await next()
  });
}