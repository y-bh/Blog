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


//需要获取全局数据的 url
const URLS = ['/', '/login', '/reset', '/register', '/getIp', '/package', '/businessScene', '/firmsServer', '/helpDetails']
module.exports = function (app) {
  app.use(async ({ req, res, state, cookies }, next) => {
    const { method, url } = req
    
    if (method === 'GET' && (URLS.includes(url)|| url.includes('businessScene') || url.includes('getIp') || url.includes('manager') || url.includes('help-center'))) {
      
      //顶部导航 活动相关数据
      const tabActivity = await renderTab();
      state[appKey.active_tab] = tabActivity

      

      //登录用户名
      let userInfo = cookies.get(appKey.userInfo)
      state.userInfo = userInfo && JSON.parse(userInfo)
      //友情链接
      state.links = await getQueryLink()
    }
    await next()
  });
}