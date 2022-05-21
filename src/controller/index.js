/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 路由控制层
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-05-20 17:47:17
 */



const router = require("koa-router")();
const { renderHome } = require("service/home")
const { getHelpService, postKeywordsService, getArticleDetailService } = require('service/helpCenter')
const { data } = require('service/getIp')
const { getBusinessData } = require('service/business')
const { getProxyCityService, getProxyMenuService } = require('service/getIp')

const fs = require("fs")
const config = require("../config/app.config")

//套餐购买
//const packageObj = require("./package.js")
const { renderPackage } = require("service/package");
const { log } = require("console");
const appKey = require("config/app.key.config")

const SelfApi = require("./selfApi")

function Router(App) {

  var ejs = require('ejs')


  // 前端自定义api 处理部分
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

    const homeData = {
      name: '用户',
      url: '/',
      link: [],
    }
    let list = await renderHome();
    homeData.articleList = list.typeList ? list.typeList : [];

    return ctx.render("home/home", homeData)
  })

  //落地推广页面
  router.get("/promotion", async (ctx) => {
    //const res = await renderHome()
    //
    return ctx.render("promotion/index", {
      name: '落地推广页面',
      url: 2222
    })
  })


  //购买页-package
  router.get("/package", async (ctx) => {
    /**数据请求 */
    // 
    let packageObj = await renderPackage();
    // 
    return ctx.render("package/package", packageObj)
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

    /**数据请求 */
    let staticData = await data()
    let province = await getProxyCityService()
    let menu = await getProxyMenuService()
    console.log(province);
    
    let getIpData = {
      staticData,
      province,
      menu,
    }

    return ctx.render("getIp/getIp", getIpData)
  })



  //业务场景-businessScene
  router.get(["/businessScene", "/businessScene/:currentId"], async (ctx) => {
    /**数据请求 */
    let { currentId = '1' } = ctx.request.params
    let res = getBusinessData()
    let p = Object.assign(res, { currentId })

    return ctx.render("businessScene/businessScene", p)
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
    let { typeList: tabList } = await renderHome() || [];
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

    console.log("articleKeyWords", articleKeyWords)
    //各栏目推荐文章 以及当前栏目id下的信息
    let { typeList: tabList, typeObj } = await renderHome(articleDetailVO.type) || [];
    return ctx.render("help/helpDetails", { typeObj, articleKeyWords, prefix, suffix, related, keywords, articleDetailVO, tabList })
  })



  //企业服务-firmsServer
  router.get("/firmsServer", async (ctx) => {
    /**数据请求 */
    return ctx.render("firmsServer/firmsServer", {
      name: 'This is firmsServer',
      data: 2222,
    })
  })

  //用户总页面-login-index
  router.get(["/login", "/reset", "/register"], async (ctx) => {
    /**数据请求 */

    let pageType = ctx.req.url.slice(1)



    let title = "登录页-天启HTTP"
    if (pageType === 'reset') {
      title = "重置密码-天启HTTP"
    }
    if (pageType === 'register') {
      title = "注册用户-天启HTTP"
    }
    return ctx.render("login/index", {
      name: 'This is main login',
      title,
      pageType //页面类型
    })
  })

  //用户协议-user-protocol
  router.get("/user/protocol", async (ctx) => {
    /**数据请求 */
    return ctx.render("user/protocol", {
      name: 'This is protocol window',
      data: 2222,
    })
  })


  //个人中心
  let htmls = fs.readFileSync(`${config.templates}/manager.html`, 'utf-8')
  const headerHtml = fs.readFileSync(`${config.templates}/components/header.html`, 'utf-8')
  const re = /(?<=\<body\>)/
  router.get(["/manager", "/manager/:path"], async (ctx) => {
    let userInfo = ctx.cookies.get(appKey.userInfo)
    var headers = ejs.render(headerHtml, { [appKey.active_tab]: ctx.state[appKey.active_tab], userInfo: userInfo && JSON.parse(userInfo) })
    // const homeData = {
    //   name: '用户',
    //   url: '/',
    //   link: [],
    //   HEADER_ACTIVE_TAB:"2222"
    // }
    // var headers = ejs.render(headerHtml, homeData)
    let res = htmls.replace(re, headers)
    ctx.response.body = res
  })


  /** 404 */
  router.get("/404", async (ctx) => {
    return ctx.render("error/404", {
      name: 'This is 404',
    })
  })


  App.use(router.routes()); //作用：启动路由
  App.use(router.allowedMethods());
}

module.exports = Router;