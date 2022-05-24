/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 用户相关服务
 * @Date: 2022-05-17 17:02:00
 * @LastEditTime: 2022-05-18 16:14:18
 */


const { postRegisterDao, postResetDao, postLoginDao } = require('dao/user')


// 注册服务
const registerService = async (data = null) => {
  //注册校验

  const tem = {
    username: data.userName, //用户名
    pwd: data.pwd, //密码
    phone: data.phone, //手机号
    code: data.code, //验证码
    readProtocol: data.agreeMent ? 1 : 0, // 是否阅读协议 0 否 1 是
  }
  //注册短链
  if (data.did) {
    tem.did = data.did
  }
  //来源
  if (data.from) {
    tem.from = data.from
  }
  //关键词
  if (data.keyword) {
    tem.keyword = data.keyword
  }


  const params = {
    "data": JSON.stringify(tem)
  }


  // 获取注册数据
  const res = await postRegisterDao(params)

  //处理注册数据


  return res

}

// 重置密码服务
const resetService = async (data = null) => {

  //1. 入参
  const params = {
    "data": JSON.stringify({
      phone: data.phone.trim(),
      code: data.code.trim(),
      newPassword: data.pwd.trim(),
      checkPassword: data.cpwd.trim()
    })
  }


  //2.获取数据
  const res = await postResetDao(params)
  return res

}


// 登录服务
const loginService = async (data = null) => {

  //1. 入参
  const params = {
    "data": JSON.stringify({
      username: data.phone.trim(),
      pwd: data.pwd.trim()
    })
  }

  //2.获取数据
  const res = await postLoginDao(params)
  //处理注册数据

  return res

}


module.exports = { registerService, resetService, loginService }