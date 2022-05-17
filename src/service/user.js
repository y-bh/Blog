/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 用户相关服务
 * @Date: 2022-05-17 17:02:00
 * @LastEditTime: 2022-05-17 20:37:51
 */


const { postRegisterDao, postResetDao } = require('dao/user')


const registerService = async (data = null) => {
  //注册校验

  const params = {
    username: data.userName, //用户名
    pwd: data.pwd, //密码
    phone: data.phone, //手机号
    from: '', //来源
    did: '', //短链
    code: data.code, //验证码
    readProtocol: 1, // 是否阅读协议 0 否 1 是
  }
  console.log("注册校验", params)
  // 获取注册数据
  const res = await postRegisterDao(params)

  //处理注册数据
  console.log("获取注册数据", res)

  return res

}

const resetService = async (data = null) => {

  //1. 入参
  const params = {
    phone: data.phone.trim(),
    code: data.code.trim(),
    newPassword: data.pwd.trim(),
    checkPassword: data.cpwd.trim()
  }


  //2.校验


  //3.获取数据
  const res = await postResetDao(params)

  //处理注册数据
  console.log("获取注册数据", res)

  return res

}

module.exports = { registerService, resetService }