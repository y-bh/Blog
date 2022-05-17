/*
 * @Author: 朱占伟
 * @LastEditors: 陈昊天
 * @description: 路由控制层
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-05-17 11:22:18
 */



const router = require("koa-router")();
const { renderHome } = require("service/home")
const { getHelpListS,getBlogDetailS,getKeyWordPageS } = require('service/helpCenter')
const { data } = require('service/getIp')
const { getBusinessData } = require('service/business')
 
const fs = require("fs")
const config = require("../config/app.config")

//套餐购买
//const packageObj = require("./package.js")
const { renderPackage } = require("service/package");
const { log } = require("console");







function Router(App) {
  //用户管理
  // router.use("/user", user.routes(), user.allowedMethods());

  var ejs = require('ejs')


  //首页
  router.get("/", async (ctx) => {
    console.log("获取顶部的数据:", ctx.state)
    const homeData = {
      name: '用户',
      url: '/',
      link: [],
    }
    let homeObj = await renderHome();
    console.log("==========返回home数据=====",homeObj);
    return ctx.render("home/home", homeData)
  })

  //落地推广页面
  router.get("/promotion", async (ctx) => {
    //const res = await renderHome()
    //console.log("控制层:", res)
    return ctx.render("promotion/index", {
      name: '落地推广页面',
      url: 2222
    })
  })


  //购买页-package
  router.get("/package", async (ctx) => {
    /**数据请求 */
    // console.log("套餐购买接口返回数据, await renderPackage())
    let packageObj = await renderPackage();
    // console.log("ssssss",packageObj);
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
    let getIpData = await data()
    return ctx.render("getIp/getIp", getIpData)
  })



  //业务场景-businessScene
  router.get("/businessScene", async (ctx) => {
    /**数据请求 */
    let res = getBusinessData()

    return ctx.render("businessScene/businessScene", res)
  })


  //帮助中心-helpCenter
  router.get("/helpCenter", async (ctx) => {

    let helpData = await getHelpListS()

    console.log('helpData:',helpData);

    return ctx.render("help/helpCenter", helpData)
  })


  //帮助中心-关键词聚合页
  router.get("/keyWord", async (ctx) => {
    /**数据请求 */
    let keyWordPageData = await getKeyWordPageS()

    return ctx.render("help/keyWord/keyWord", keyWordPageData)
  })


  //帮助中心详情-helpCenter-details
  router.get("/helpDetails", async (ctx) => {
    /**数据请求 */
    // const { id } = ctx.request.params

    let helpDetail = await getBlogDetailS()

    return ctx.render("help/detail/helpDetails", helpDetail)
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
  router.get("/login", async (ctx) => {
    /**数据请求 */
    return ctx.render("login/index", {
      name: 'This is main login',
      data: 2222,
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
  const headerHtml = fs.readFileSync(`${config.templates}/components/header/header.html`, 'utf-8')
  const re = /(?<=\<body\>)/
  router.get(["/manager", "/manager/:path"], async (ctx) => {
    var headers = ejs.render(headerHtml, { name: 'zhuzhanwei' })
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