/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 用户相关接口操作
 * @Date: 2022-05-17 17:04:35
 * @LastEditTime: 2022-05-17 18:56:04
 */


const { post } = require("utils/request")
const api = require("src/config/api.config.js")

//注册功能
const postRegisterDao = async (data) => {
  //1. 入参
  const params = {
    username: data.userName,
    pwd: data.pwd,
    phone: data.phone,
    from: '',
    did: '',
    code: data.code,
    readProtocol: 1
  }

  //2. 校验



  //3. 获取java端数据
  try {
    const res = await post(api.POST_USER_REGISTER, params)
    return res
  } catch (error) {
    return error
  }
}

//重置功能
const postResetDao = async (data) => {
  try {
    const res = await post(api.POST_USER_RESET, data)
    return res
  } catch (error) {
    return error
  }
}
module.exports = { postRegisterDao, postResetDao }