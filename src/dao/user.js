/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 用户相关接口操作
 * @Date: 2022-05-17 17:04:35
 * @LastEditTime: 2022-05-18 09:53:10
 */


const { post, put } = require("utils/request")
const api = require("src/config/api.config.js")

//注册功能
const postRegisterDao = async (data) => {
  try {
    const res = await put(api.POST_USER_REGISTER, data)
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

//登录
const postLoginDao = async (data) => {
  try {
    const res = await post(api.POST_USER_LOGIN, data)
    return res
  } catch (error) {
    return error
  }
}

module.exports = { postRegisterDao, postResetDao, postLoginDao }