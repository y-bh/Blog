/*
 * @Author: 朱占伟
 * @LastEditors: 李云涛
 * @description: 路由控制层
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-05-11 18:20:58
 */

const router = require("koa-router")();
const { renderHome } = require("service/home")

const { getQueryLink } = require("service/footer")

const fs = require("fs")
const config = require("../config/app.config")

//套餐购买
const packageObj = require("./package.js")
const { renderPackage } = require("service/package");

function Router(App) {
  //用户管理
  // router.use("/user", user.routes(), user.allowedMethods());

  var ejs = require('ejs')

  //首页
  router.get("/", async (ctx) => {


    //const res = await renderHome()
    //友情链接
    // const query_link = await getQueryLink()

    return ctx.render("home/home", {
      name: '住在我',
      url: 2222,
      link: [{
        id:1,
        title:'测试1',
        link: 'https://www.baidu.com'
      },{
        id:2,
        title:'测试2',
        link: 'https://www.youtube.com'
      },{
        id:2,
        title:'海外代理IP',
        link: 'https://www.youtube.com'
      }],
    })
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


  //套餐购买
  //购买页-package
  router.get("/package", async (ctx) => {
    /**数据请求 */
    console.log("999999999999999999999",await renderPackage())
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



    return ctx.render("getIp/getIp", {
      name: 'This is getIp',
      data: 2222,
    })
  })


  //业务场景-businessScene

  router.get("/businessScene", async (ctx) => {

    /**数据请求 */



    return ctx.render("help/helpCenter", {
      name: 'This is businessScene',
      data: 'businessScene',
    })
  })


  //帮助中心
  //帮助中心-helpCenter
  router.get("/helpCenter", async (ctx) => {

    /**数据请求 */



    return ctx.render("help/helpCenter", {
      name: 'This is helpCenter',
      data: 2222,
    })
  })

  //帮助中心-helpCenter-tab-page
  router.get("/helpCenter/:alias/:page", async (ctx) => {

    /**数据请求 */
    const { alias, page } = ctx.request.params


    return ctx.render("help/helpCenter", {
      name: `This is helpCenter + ${alias} + ${page}`,
      data: `333`,
    })
  })

  //帮助中心-helpCenter-details
  router.get("/helpDetails/:id", async (ctx) => {

    /**数据请求 */
    const { id } = ctx.request.params


    return ctx.render("help/helpDetails", {
      name: `This is ${id} article`,
      data: 2222,
    })
  })


  //企业服务-firmsServer
  router.get("/firmsServer", async (ctx) => {

    /**数据请求 */



    return ctx.render("firmsServer/firmsServer", {
      name: 'This is firmsServer',
      data: 2222,
    })
  })


  //用户操作中心
  //用户总页面-login-index
  router.get("/login/index", async (ctx) => {

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