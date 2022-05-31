/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 注册后端路由
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-05-30 11:07:47
 */



const router = require("koa-router")();
const fs = require("fs")
var ejs = require('ejs')

// 应用配置文件
const config = require("../config/app.config")
// 全局数据key 配置对象
const appKey = require("config/app.key.config")

//node 端自定义接口
const SelfApi = require("./selfApi")

const { getHelpService, postKeywordsService, getArticleDetailService, getInfoListService } = require('service/helpCenterService')
const { getProxyCityService, getProxyMenuService, getWhiteListApiService, getIconService, data } = require('service/getIpService')
const { renderPackage } = require("service/packageService");
//注册后端路由功能
function Router(App) {

  // node 端接口文件
  router.use("/api", SelfApi.routes(), SelfApi.allowedMethods())


  router.get("/payCenter", async (ctx) => {
    const homeData = {
      name: '用户',
      url: '/',
      link: [],
    }
    return ctx.render("payCenter/index", homeData)
  })


  //首页
  router.get("/", async (ctx) => {
    const homeData = {}
    //资讯中心数据
    let list = await getInfoListService();
    homeData.articleList = list.typeList ? list.typeList : [];
    return ctx.render("home/index", homeData)
  })


  //落地推广页面
  router.get("/promotion", async (ctx) => {
    return ctx.render("promotion/index")
  })


  //购买页-package
  router.get("/package", async (ctx) => {
    // 套餐数据
    let packageObj = await renderPackage();

    return ctx.render("package/index", packageObj)
  })


  //购买页wx支付-package-Wxpay
  router.get("/package/wxPay", async (ctx) => {

    /**数据请求 */
    return ctx.render("package/wxPay", {
      name: 'This is Wxpay',
      data: 'Please pay 300 yuan',
    })
  })


  //提取ip-getIp
  router.get("/getIp", async (ctx) => {
    const token = ctx.cookies.get(appKey.token)
    /**数据请求 */
    let staticData = await data()
    let province = await getProxyCityService()
    let menu = await getProxyMenuService(token)

    let icon = await getIconService(token)
    let apiL = await getWhiteListApiService(token, { data: { pageNum: 1, pageSize: 9999 } })
    let getIpData = {
      staticData,
      province,
      menu,
      apiL,
      icon
    }

    return ctx.render("getIp/index", getIpData)
  })


  //业务场景-businessScene
  const getBusinessSceneRender = require("service/businessSceneService")
  router.get(["/businessScene", "/businessScene/:currentId"], async (ctx) => {
    const { currentId, title } = getBusinessSceneRender(ctx.request.params)
    return ctx.render("businessScene/index", { currentId, title })
  })


  //帮助中心-文章列表页
  router.get(["/help-center", "/help-center/:typeAlias/:pageNum"], async (ctx) => {
    const { body, params } = ctx.request
    if (params && params.pageNum) {
      body.pageNum = +params.pageNum.split('.')[0] || 1
    }
    if (params && params.typeAlias) {
      body.typeAlias = params.typeAlias
    }
    const { articleTypes, lists, title } = await getHelpService(body, ctx.state[appKey.cateTypes])
    return ctx.render("help/helpCenter", { articleTypes, lists, title })
  })


  //帮助中心-关键词聚合页
  router.get(["/tags/:keyAlias/:pageNum"], async (ctx) => {
    const { params, body } = ctx.request
    //关键词别名
    if (!params.keyAlias) {
      return ctx.fail('请传入关键词别名!')
    }
    body.keyAlias = params.keyAlias

    //获取当前分页
    if (params.pageNum.includes(".html")) {
      params.pageNum = params.pageNum.replace(".html", '')
    }

    body.pageNum = params.pageNum

    //获取文章列表
    const lists = await postKeywordsService(body)

    //各栏目推荐文章 以及当前栏目id下的信息
    let { typeList: tabList } = await getInfoListService() || [];
    return ctx.render("help/keyWord", { lists, tabList })
  })

  //帮助中心详情-helpCenter-details
  router.get(["/help-details", "/help-details/:id"], async (ctx) => {
    let { id } = ctx.request.params
    if (!id) {
      return ctx.fail('请传入文章id')
    }
    if (id) {
      id = id.replace(".html", '')
    }
    let { articleKeyWords, prefix, suffix, related, articleDetailVO, keywords } = await getArticleDetailService(id)


    //各栏目推荐文章 以及当前栏目id下的信息
    let { typeList: tabList, typeObj } = await getInfoListService(articleDetailVO.type) || [];
    return ctx.render("help/helpDetails", { typeObj, articleKeyWords, prefix, suffix, related, keywords, articleDetailVO, tabList })
  })


  //企业服务-firmsServer
  router.get("/firmsServer", async (ctx) => {
    return ctx.render("firmsServer/index")
  })

  //用户总页面-login-index
  router.get(["/login", "/reset", "/register"], async (ctx) => {
    let { url, query } = ctx.request

    //处理掉查询串情况
    if (query && url.includes('?')) {
      url = (url.split("?"))[0]
    }

    //处理掉hash 情况
    if (url.includes('#')) {
      url = (url.split("#"))[0]
    }

    let pageType = url.slice(1)
    let title = "登录页-天启HTTP官网"
    if (pageType === 'reset') {
      title = "重置密码-天启HTTP官网"
    }
    if (pageType === 'register') {
      title = "注册用户-天启HTTP官网"
    }
    return ctx.render("login/index", {
      title,
      pageType //页面类型
    })
  })

  //用户协议-user-protocol
  router.get("/user/protocol", async (ctx) => {
    /**数据请求 */
    return ctx.render("user/protocol")
  })


  //个人中心
  let htmls = fs.readFileSync(`${config.templates}/manager.html`, 'utf-8')
  const headerHtml = fs.readFileSync(`${config.templates}/components/header.html`, 'utf-8')
  const footerHtml = fs.readFileSync(`${config.templates}/components/footer.html`, 'utf-8')

  //放置公共头部正则
  const re = /(?<=\<body\>)/

  //放置公共底部正则
  const footRe = /(?=\<\/body\>)/

  router.get(["/manager", "/manager/:path"], async (ctx) => {

    //用户信息
    let token = ctx.cookies.get(appKey.token)

    //友情链接
    let links = ctx.state.links


    //公共头部
    var headers = ejs.render(headerHtml, { [appKey.active_tab]: ctx.state[appKey.active_tab], token, [appKey.cateTypes]: ctx.state[appKey.cateTypes], actt: ctx.state['actt'] })


    //公共底部

    var footer = ejs.render(footerHtml, { links })

    // 

    //放置公共头部
    let res = htmls.replace(re, headers)
    //放置公共底部
    // res = htmls.replace(footRe, footer)
    let mm = res.replace(footRe, footer)

    ctx.response.body = mm
  })


  /** 404 */
  router.get("/404", async (ctx) => {
    return ctx.render("error/404")
  })


  App.use(router.routes()); //作用：启动路由
  App.use(router.allowedMethods());
}

module.exports = Router;