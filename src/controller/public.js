/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 注册后端路由
 * @Date: 2022-04-22 15:07:10
 * @LastEditTime: 2022-05-30 11:07:47
 */

const router = require("koa-router")();
const service = require("utils/request")
//注册后端路由功能
function Router(App) {

  router.post('/blog/register', async function (ctx, next) {
    // ctx.body = {

    // }
    const {phone, pass} = ctx.request.body
    const params = {
      name: `用户${phone}`,
      avator: null,
      accountId: phone,
      phone: phone,
      password: pass,
      gmtCreated: new Date(),
      creater: phone
    }
    const re = await service.postJson("/blog/register", params)
    if(re && +re.code === 10000){
      ctx.cookies.set('B_TOKEN', re.data, { httpOnly: false })
      ctx.body = {
        code: re.code,
        message: 'success'
      }
    }else{
      ctx.body = {
        code: re.code,
        message: re.message
      }
    }
  })

  router.post('/blog/login', async function (ctx, next) {
    const {phone, pass} = ctx.request.body
    const params = {
      accountId: phone, 
      password: pass
    }
    console.log(params)
    const re = await service.postJson("/blog/login", params)
    console.log(re)
    if(re && +re.code === 10000){
      ctx.body = {
        code: re.code,
        message: 'success'
      }
    }else{
      ctx.body = {
        code: re.code,
        message: re.message
      }
    }
  })

  App.use(router.routes()); //作用：启动路由
  App.use(router.allowedMethods());
}

module.exports = Router;