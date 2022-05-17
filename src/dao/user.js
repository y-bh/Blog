/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 用户相关接口操作
 * @Date: 2022-05-17 17:04:35
 * @LastEditTime: 2022-05-17 17:15:40
 */


const { post } = require("utils/request")
const api = require("src/config/api.config.js")

//获取顶部导航 活动
const postRegister = async () => {
  try {
    const res = await post(api.QUERY_ACTIVITY, null)
    return res
  } catch (error) {
    return error
  }
}